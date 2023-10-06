import React from 'react'

import { useState, useContext } from 'react';
import { StoreContext } from './store'
import { DialogWindow } from './general/DialogWindow';

import { useApp } from "./useApp";
import { useQueryClient } from '@tanstack/react-query'

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ClearOutlined from '@mui/icons-material/ClearOutlined';




export default function MahalListesiHeader({ setShow }) {

  const queryClient = useQueryClient()

  const { isProject, setIsProject } = useContext(StoreContext)
  const RealmApp = useApp();

  const { selectedMahal, setSelectedMahal } = useContext(StoreContext)

  const [showDialog, setShowDialog] = useState(false)
  const [dialogCase, setDialogCase] = useState("")



  async function handleMahalDelete(mahal) {

    // seçili lbs yoksa durdurma, inaktif iken tuşlara basılabiliyor mesela, bu fonksiyon çalıştırılıyor, orayı iptal etmekle uğraşmak istemedim
    if (!selectedMahal) {
      console.log("alttaki satırda --return-- oldu")
      return
    }

    // bu kontrol backend de ayrıca yapılıyor
    if (selectedMahal.includesMahal) {
      throw new Error("Bu mahal metraj içerdiği için silinemez, öncelikle metrajları silmelisiniz.")
    }

    try {
      const result = await RealmApp.currentUser.callFunction("deleteMahal", { mahalId: mahal._id });

      if (result.deletedCount) {

        const oldMahaller = queryClient.getQueryData(["mahaller"])
        const newMahaller = oldMahaller.filter(item => item._id.toString() !== mahal._id.toString())
        queryClient.setQueryData(["mahaller"], newMahaller)

      }

      if (result.isIncludesMahalFalse) {

        let oldProject = JSON.parse(JSON.stringify(isProject))

        oldProject.lbs.find(item => item._id.toString() === mahal._lbsId.toString()).includesMahal = false

        setIsProject(oldProject)

      }

      setSelectedMahal()

    } catch (err) {

      console.log(err)
      let hataMesaj_ = err.message ? err.message : "Beklenmedik hata, Rapor7/24 ile irtibata geçiniz.."

      if (hataMesaj_.includes("Silmek istediğiniz  Lbs'in alt seviyeleri mevcut")) {
        hataMesaj_ = "Silmek istediğiniz  Lbs'in alt seviyeleri mevcut, öncelikle onları silmelisiniz."
      }

      if (hataMesaj_.includes("Mahal eklemeye açık başlıklar silinemez")) {
        hataMesaj_ = "Mahal eklemeye açık başlıklar silinemez, öncelikle mahal eklemeye kapatınız."
      }

      setSelectedMahal()
      setDialogCase("error")
      setShowDialog(hataMesaj_)
    }
  }



  let header = "Mahal Listesi"


  return (
    <Paper sx={{}}>

      {showDialog &&
        <DialogWindow dialogCase={dialogCase} showDialog={showDialog} setShowDialog={setShowDialog} />
      }

      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ position: "fixed", top: "3rem", left: "30rem", padding: "0.5rem 1rem", height: "3.5rem" }}
      >

        {/* sol kısım (başlık) */}
        <Grid item xs>
          <Typography
            onClick={() => handleTry()}
            // nowrap={true}
            variant="h6"
            fontWeight="bold"
          >
            {header}
          </Typography>
        </Grid>


        {/* sağ kısım - (tuşlar)*/}
        <Grid item xs="auto">
          <Grid container spacing={1}>

            <Grid item >
              <IconButton onClick={() => setSelectedMahal()} aria-label="lbsUncliced">
                <ClearOutlined variant="contained" sx={{
                  color: selectedMahal ? "red" : "lightgray",
                }} />
              </IconButton>
            </Grid>


            <Grid item onClick={() => handleMahalDelete(selectedMahal)} sx={{ cursor: "pointer" }}>
              <IconButton aria-label="addMahal" disabled>
                <DeleteIcon
                  // sx={{display: isProject_display}}
                  variant="contained" sx={{
                    color: selectedMahal ? "darkred" : "lightgray",
                  }} />
              </IconButton>
            </Grid>



            <Grid item>
              <IconButton onClick={() => setShow("FormMahalCreate")} aria-label="addLbs" disabled={isProject?.lbs.filter(item => item.openForMahal).length == 0 ? true : false}>
                <AddCircleOutlineIcon variant="contained" color={isProject?.lbs.filter(item => item.openForMahal).length == 0 ? " lightgray" : "success"} />
              </IconButton>
            </Grid>

          </Grid>
        </Grid>

      </Grid>


      <Grid sx={{ height: "3.5rem" }}>

      </Grid>



    </Paper>
  )
}
