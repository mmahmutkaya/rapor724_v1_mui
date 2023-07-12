import { useState } from 'react';
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


export default function WbsHeader({ RealmApp, setShow, selectedWbs, setSelectedWbs, isProject, setIsProject }) {

  const [showDialog, setShowDialog] = useState(false)
  const [dialogCase, setDialogCase] = useState("")


  async function handleWbsUnclicked() {
    setSelectedWbs()
  }


  async function handleWbsDelete() {
    try {
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



  return (
    <Paper>

      {showDialog &&
        <DialogWindow dialogCase={dialogCase} showDialog={showDialog} setShowDialog={setShowDialog} />
      }

      <Grid
        container
        justifyContent="space-between"
        sx={{ padding: "1rem" }}>

        {/* başlık sol */}
        <Grid item>
          <Typography
            variant="h5"
            fontWeight="bold"
          >
            {/* İş Alanları WBS {selectedWbs?.code} */}
            İş Alanları WBS
          </Typography>
        </Grid>


        {/* başlık sağ */}
        <Grid item>
          <Grid container spacing={1}>
            <Grid item sx={{ display: !selectedWbs ? "none" : null }}>
              <IconButton onClick={() => handleWbsUnclicked()} aria-label="delete">
                <ClearOutlined variant="contained" color="error" />
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

    </Paper>
  )
}
