import { useState } from 'react';


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


export default function WbsHeader({ RealmApp, isProject, selectedWbs, refetch_projectWbs }) {

  const [hataMesaj, setHataMesaj] = useState()


  async function handleWbsCreate() {
    try {
      await RealmApp.currentUser.callFunction("createWbs", { projectId: isProject._id, upWbs: selectedWbs?.code ? selectedWbs?.code : 0 });
      refetch_projectWbs()
      // setShowDialogInfo(true)
    } catch (err) {
      let hataMesaj_ = "Beklenmedik hata, Rapor7/24 ile irtibata geçiniz.."
      setHataMesaj(hataMesaj_)
      // setShowDialogError(true)
    }
  }

  async function handleWbsDelete() {
    try {
      const result = await RealmApp.currentUser.callFunction("deleteWbs", { projectId: isProject._id, wbs: selectedWbs.code });
      console.log(result)
      refetch_projectWbs()
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
            İş Alanları WBS {selectedWbs.code}
          </Typography>
        </Grid>


        {/* başlık sağ */}
        <Grid item>
          <Grid container spacing={1}>
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
              <IconButton onClick={() => handleWbsCreate()} aria-label="addWbs">
                <AddCircleOutlineIcon variant="contained" color="success" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

      </Grid>

    </Paper>
  )
}
