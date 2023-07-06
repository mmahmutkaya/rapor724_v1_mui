import { useState } from 'react';
// import useApp from "./../components/useApp"

import React from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


export default function LbsHeader({ RealmApp, setShow, selectedLbs, setSelectedLbs, isProject, setIsProject }) {

  // const RealmApp = useApp();

  const [hataMesaj, setHataMesaj] = useState()


  async function handleLbsCreate() {

    try {
      // const project = await RealmApp.currentUser.callFunction("createLbs", {
      //   projectId: isProject._id,
      //   upLbs: selectedLbs?.code ? selectedLbs?.code : 0,
      // });
      // setIsProject(project)
      // setShowDialogInfo(true)
    } catch (err) {
      console.log(err)
      let hataMesaj_ = "Beklenmedik hata, Rapor7/24 ile irtibata geçiniz.."
      setHataMesaj(hataMesaj_)
      // setShowDialogError(true)
    }
  }

  async function handleLbsDelete() {
    try {
      const project = await RealmApp.currentUser.callFunction("deleteLbs", { projectId: isProject._id, lbs: selectedLbs.code });
      setIsProject(project)
      setSelectedLbs(null)
      // setShowDialogInfo(true)
    } catch (err) {

      console.log(err)
      // err?.error ? setHataMesaj(err.error) : setHataMesaj("Beklenmedik bir hata oluştu, lütfen Rapor7/24 ile irtibata geçiniz..")
      let hataMesaj_ = err.error ? err.error : "Beklenmedik hata, Rapor7/24 ile irtibata geçiniz.."

      if (hataMesaj_.includes("duplicate key error")) {
        hataMesaj_ = "Sistemde kayıtlı"
      }

      if (hataMesaj_.includes("çok kısa")) {
        hataMesaj_ = "Çok kısa"
      }

      // setHataMesaj(hataMesaj_)
      // setShowDialogError(true)
    }
  }

  return (
    <Paper>

      <Grid
        container
        justifyContent="space-between"
        sx={{ padding: "1rem" }}>

        {/* başlık sol */}
        <Grid item>
          <Typography
            // parent içinde position: "relative" gerekli
            // sx={{
            //   position: "absolute",
            //   top: "50%",
            //   transform: "translate(0, -50%)",
            // }}
            variant="h5"
            fontWeight="bold"
          >
            {/* İş Alanları LBS {selectedLbs?.code} */}
            İş Alanları LBS
          </Typography>
        </Grid>


        {/* başlık sağ */}
        <Grid item>
          <Grid container spacing={1}>
            <Grid item sx={{ display: !selectedLbs ? "none" : null }}>
              <IconButton onClick={() => setShow("FormLbs")} aria-label="moveLeft">
                <KeyboardArrowUpIcon />
              </IconButton>
            </Grid>
            <Grid item sx={{ display: !selectedLbs ? "none" : null }}>
              <IconButton onClick={() => setShow("FormLbs")} aria-label="moveLeft">
                <KeyboardArrowDownIcon />
              </IconButton>
            </Grid>
            <Grid item sx={{ display: !selectedLbs ? "none" : null }}>
              <IconButton onClick={() => setShow("FormLbs")} aria-label="moveLeft">
                <KeyboardArrowLeftIcon />
              </IconButton>
            </Grid>
            <Grid item sx={{ display: !selectedLbs ? "none" : null }}>
              <IconButton onClick={() => setShow("FormLbs")} aria-label="moveRight">
                <KeyboardArrowRightIcon />
              </IconButton>
            </Grid>
            <Grid item sx={{ display: !selectedLbs ? "none" : null }}>
              <IconButton onClick={() => handleLbsDelete()} aria-label="delete">
                <DeleteIcon variant="contained" color="error" />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => setShow("FormLbsCreate")} aria-label="addLbs">
                <AddCircleOutlineIcon variant="contained" color="success" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

      </Grid>

    </Paper>
  )
}
