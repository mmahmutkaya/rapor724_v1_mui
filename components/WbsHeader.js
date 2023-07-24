import { useState, useContext } from 'react';
import { StoreContext } from '../components/store'

// import useApp from "./../components/useApp"


import React from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearOutlined from '@mui/icons-material/ClearOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DialogWindow } from './general/DialogWindow';
import { AppBar, Toolbar } from '@mui/material';


export default function WbsHeader({ RealmApp, setShow }) {

  const [showDialog, setShowDialog] = useState(false)
  const [dialogCase, setDialogCase] = useState("")


  const { isProject, setIsProject } = useContext(StoreContext)
  const { selectedWbs, setSelectedWbs } = useContext(StoreContext)

  async function handleWbsOpenForPoz() {

    try {

      if (!selectedWbs) {
        console.log("alttaki satırda --return-- oldu")
        return
      }

      let text = selectedWbs.code + "."

      if (isProject.wbs.find(item => item.code.includes(text))) {
        throw new Error({ error: "Tam olmadı - Alt seviyesinde başka grup olan kırılıma direk poz ekleyemezsiniz, eklemek istediğiniz poza uygun bir yeni alt başlık tanımlayınız eklemek istediğiniz pozu bu başlık içine ekleyiniz, başlık olan --Poz Grubuna--  " })
      }

      const project = await RealmApp.currentUser.callFunction("deleteWbs", { projectId: isProject._id, wbs: selectedWbs.code });
      setIsProject(project)
      setSelectedWbs(null)

    } catch (err) {

      console.log(err)
      let hataMesaj_ = err.error ? err.error : "Beklenmedik hata, Rapor7/24 ile irtibata geçiniz.."

      if (hataMesaj_.includes("Silmek istediğiniz  WBS'in alt seviyeleri mevcut")) {
        hataMesaj_ = "Silmek istediğiniz  WBS'in alt seviyeleri mevcut, öncelikle onları silmelisiniz."
      }

      setDialogCase("error")
      setShowDialog(hataMesaj_)
    }

  }



  async function handleWbsUnclicked() {
    setSelectedWbs()
  }



  async function handleWbsDelete() {
    try {
      const resultProject = await RealmApp.currentUser.callFunction("deleteWbs", { projectId: isProject._id, wbsCode: selectedWbs.code });
      setIsProject(resultProject)
      setSelectedWbs(null)
    } catch (err) {

      console.log(err)
      let hataMesaj_ = err.error ? err.error : "Beklenmedik hata, Rapor7/24 ile irtibata geçiniz.."

      if (hataMesaj_.includes("Silmek istediğiniz  WBS'in alt seviyeleri mevcut")) {
        hataMesaj_ = "Silmek istediğiniz  WBS'in alt seviyeleri mevcut, öncelikle onları silmelisiniz."
      }

      setDialogCase("error")
      setShowDialog(hataMesaj_)
    }
  }



  return (
    <Paper >

      {showDialog &&
        <DialogWindow dialogCase={dialogCase} showDialog={showDialog} setShowDialog={setShowDialog} />
      }

      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        {/* <Toolbar variant='dense'> */}

        <Grid
          container
          justifyContent="space-between"
          sx={{ padding: "1rem" }}
        >

          {/* başlık sol */}
          <Grid item  >
            <Typography
              sx={{ display: { xs: 'none', sm:"block"} }}
              color={"black"}
              variant="h5"
              fontWeight="bold"
            >
              İş Alanları WBS
            </Typography>
          </Grid>


          {/* başlık sağ */}
          <Grid item>
            <Grid container spacing={0.5}>
              <Grid item sx={{ display: !selectedWbs ? "none" : null }}>
                <IconButton onClick={() => handleWbsUnclicked()} aria-label="delete">
                  <ClearOutlined variant="contained" color="error" />
                </IconButton>
              </Grid>
              <Grid item sx={{ display: !selectedWbs ? "none" : null }}>
                <IconButton onClick={() => handleWbsOpenForPoz()} aria-label="delete">
                  <Typography>wbs</Typography>
                </IconButton>
              </Grid>
              <Grid item sx={{ display: !selectedWbs ? "none" : null }}>
                <IconButton onClick={() => setShow("FormWbs")} aria-label="moveLeft">
                  <KeyboardArrowUpIcon />
                </IconButton>
              </Grid>
              <Grid item sx={{ display: !selectedWbs ? "none" : null }}>
                <IconButton onClick={() => setShow("FormWbs")} aria-label="moveLeft">
                  <KeyboardArrowDownIcon />
                </IconButton>
              </Grid>
              <Grid item sx={{ display: !selectedWbs ? "none" : null }}>
                <IconButton onClick={() => setShow("FormWbs")} aria-label="moveLeft">
                  <KeyboardArrowLeftIcon />
                </IconButton>
              </Grid>
              <Grid item sx={{ display: !selectedWbs ? "none" : null }}>
                <IconButton onClick={() => setShow("FormWbs")} aria-label="moveRight">
                  <KeyboardArrowRightIcon />
                </IconButton>
              </Grid>
              <Grid item sx={{ display: !selectedWbs ? "none" : null }}>
                <IconButton onClick={() => handleWbsDelete()} aria-label="delete">
                  <DeleteIcon variant="contained" color="error" />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={() => setShow("FormWbsCreate")} aria-label="addWbs">
                  <AddCircleOutlineIcon variant="contained" color="success" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

        </Grid>

        {/* </Toolbar> */}
      </AppBar>

    </Paper>
  )
}
