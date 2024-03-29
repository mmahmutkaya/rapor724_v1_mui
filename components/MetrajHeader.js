import React from 'react'

import { useState, useContext } from 'react';
import { StoreContext } from './store'
import { DialogWindow } from './general/DialogWindow';

import AppBar from '@mui/material/AppBar';

import { useApp } from "./useApp";

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import ClearOutlined from '@mui/icons-material/ClearOutlined';



export default function MetrajHeader({ setShow }) {

  const { drawerWidth, topBarHeight } = useContext(StoreContext)

  const { isProject, setIsProject } = useContext(StoreContext)
  const RealmApp = useApp();

  const { selectedMahal, setSelectedMahal } = useContext(StoreContext)

  const [showDialog, setShowDialog] = useState(false)
  const [dialogCase, setDialogCase] = useState("")



  return (
    <Paper >

      {showDialog &&
        <DialogWindow dialogCase={dialogCase} showDialog={showDialog} setShowDialog={setShowDialog} />
      }

      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white", color: "black",
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: topBarHeight,
          ml: { md: `${drawerWidth}px` }
        }}
      >

        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ padding: "0.5rem 1rem" }}
        >

          {/* sol kısım (başlık) */}
          <Grid item xs>
            <Typography
              onClick={() => handleTry()}
              // nowrap={true}
              variant="h6"
              fontWeight="bold"
            >
              Metrajlar
            </Typography>
          </Grid>


          {/* sağ kısım - (tuşlar)*/}
          <Grid item xs="auto">
            <Grid container spacing={1}>

              <Grid item>
                <IconButton onClick={() => setShow("FormMetrajCreate")} aria-label="addLbs" disabled={false}>
                  <EditIcon variant="contained" color={true ? "success" : " lightgray"} />
                </IconButton>
              </Grid>

              <Grid item>
                <IconButton onClick={() => setShow("FormMetrajCreate")} aria-label="addLbs" disabled={false}>
                  <AddCircleOutlineIcon variant="contained" color={true ? "success" : " lightgray"} />
                </IconButton>
              </Grid>

            </Grid>
          </Grid>

        </Grid>
      </AppBar>

    </Paper>
  )
}
