import { useState } from 'react';
// import useApp from "./../components/useApp"


import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

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


export default function WbsHeader({ RealmApp, setShow, selectedWbs, setSelectedWbs, isProject, setIsProject }) {

  const [showDialogError, setShowDialogError] = useState(false)


  async function handleWbsDelete() {
    try {
      const project = await RealmApp.currentUser.callFunction("deleteWbs", { projectId: isProject._id, wbs: selectedWbs.code });
      setIsProject(project)
      setSelectedWbs(null)
      // setShowDialogInfo(true)
    } catch (err) {

      console.log(err)
      let hataMesaj_ = err.error ? err.error : "Beklenmedik hata, Rapor7/24 ile irtibata geçiniz.."

      if (hataMesaj_.includes("Silmek istediğiniz  WBS'in alt seviyeleri mevcut")) {
        hataMesaj_ = "Silmek istediğiniz  WBS'in alt seviyeleri mevcut, öncelikle onları silmelisiniz."
      }

      setShowDialogError(hataMesaj_)
    }
  }





  function DialogError() {
    if (showDialogError) {

      let hataMesaj

      if (typeof showDialogError !== "string") {
        hataMesaj = "Beklenmedik hata, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz.."
      } else {
        hataMesaj = showDialogError
      }


      return (
        <div>

          <Dialog
            PaperProps={{ sx: { position: "fixed", top: "10rem", margin: { xs: '2rem' } } }}
            open={true}
            onClose={() => setShowDialogError(false)} >
            {/* <DialogTitle>Subscribe</DialogTitle> */}

            <DialogContent>

              <Grid container spacing={1}>

                <Grid item>
                  <ErrorIcon variant="contained" color="error" pr={3} />
                </Grid>

                <Grid item>
                  <DialogContentText>
                    {hataMesaj}
                  </DialogContentText>
                </Grid>

              </Grid>

            </DialogContent>

          </Dialog>

        </div >
      );
    }
  }



  return (
    <Paper>

      {showDialogError &&
        <DialogError />
      }

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
            {/* İş Alanları WBS {selectedWbs?.code} */}
            İş Alanları WBS
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
