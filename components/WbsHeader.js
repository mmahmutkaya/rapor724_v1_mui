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

export default function WbsHeader({ RealmApp, isProject, selectedWbs }) {

  const [hataMesaj, setHataMesaj] = useState()


  async function handleWbsCreate(event) {

    // event.preventDefault();

    try {

      // const data = new FormData(event.currentTarget);
      // const projectName = data.get('projectName')


      const result = await RealmApp.currentUser.callFunction("createWbs", { projectId: isProject._id, upWbs: "3.1.2.3", name:"Taksim 360" });

      console.log("result")
      console.log(result)

      // refetch_projects()
      // setShowDialogInfo(true)
      // console.log("merhaba22")

    } catch (err) {
      console.log(err)

      // let hataMesaj_ = err?.error ? err.error : "Beklenmedik hata, Rapor7/24 ile irtibata geçiniz.."

      // if (hataMesaj_.includes("must be a single string of 12 bytes or a string of 24 hex characters")) {
      //   hataMesaj_ = ""
      // }

      let hataMesaj_ = "Beklenmedik hata, Rapor7/24 ile irtibata geçiniz.."
      setHataMesaj(hataMesaj_)
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
        <Grid>
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
            İş Alanları WBS - {selectedWbs}
          </Typography>
        </Grid>


        {/* başlık sağ */}
        <Grid>
          <Grid container spacing={1}>
            <Grid item>
              <IconButton onClick={() => setShow("FormWbs")} aria-label="moveLeft">
                <KeyboardArrowUpIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => setShow("FormWbs")} aria-label="moveLeft">
                <KeyboardArrowDownIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => setShow("FormWbs")} aria-label="moveLeft">
                <KeyboardArrowLeftIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => setShow("FormWbs")} aria-label="moveRight">
                <KeyboardArrowRightIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => setShow("FormWbs")} aria-label="addWbs">
                <DeleteIcon variant="contained" color="error" />
              </IconButton>
            </Grid>
            <Grid item>
              {/* <IconButton onClick={() => setShow("FormWbs")} aria-label="addWbs"> */}
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
