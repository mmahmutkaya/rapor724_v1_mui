import React from 'react'

import { useState, useContext } from 'react';
import { StoreContext } from './store'
import { DialogWindow } from './general/DialogWindow';

import { useApp } from "../components/useApp";
import { useQueryClient } from '@tanstack/react-query'

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ClearOutlined from '@mui/icons-material/ClearOutlined';




export default function PozHeader({ setShow }) {

  const queryClient = useQueryClient()

  const { isProject, setIsProject } = useContext(StoreContext)
  const RealmApp = useApp();

  const { selectedPoz, setSelectedPoz } = useContext(StoreContext)

  const [showDialog, setShowDialog] = useState(false)
  const [dialogCase, setDialogCase] = useState("")

  async function handlePozDelete(poz) {

    // seçili wbs yoksa durdurma, inaktif iken tuşlara basılabiliyor mesela, bu fonksiyon çalıştırılıyor, orayı iptal etmekle uğraşmak istemedim
    if (!selectedPoz) {
      console.log("alttaki satırda --return-- oldu")
      return
    }

    // bu kontrol backend de ayrıca yapılıyor
    if (selectedPoz.includesPoz) {
      throw new Error("Bu poz metraj içerdiği için silinemez, öncelikle metrajları silmelisiniz.")
    }

    try {
      const result = await RealmApp.currentUser.callFunction("deletePoz", { pozId: poz._id });

      if (result.deletedCount) {

        const oldPozlar = queryClient.getQueryData(["pozlar"])
        const newPozlar = oldPozlar.filter(item => item._id.toString() !== poz._id.toString())
        queryClient.setQueryData(["pozlar"], newPozlar)

      }

      if (result.isIncludesPozFalse) {

        let oldProject = JSON.parse(JSON.stringify(isProject))

        oldProject.wbs.find(item => item._id.toString() === poz._wbsId.toString()).includesPoz = false

        setIsProject(oldProject)

      }

      setSelectedPoz()

    } catch (err) {

      console.log(err)
      let hataMesaj_ = err.message ? err.message : "Beklenmedik hata, Rapor7/24 ile irtibata geçiniz.."

      if (hataMesaj_.includes("Silmek istediğiniz  WBS'in alt seviyeleri mevcut")) {
        hataMesaj_ = "Silmek istediğiniz  WBS'in alt seviyeleri mevcut, öncelikle onları silmelisiniz."
      }

      if (hataMesaj_.includes("Poz eklemeye açık başlıklar silinemez")) {
        hataMesaj_ = "Poz eklemeye açık başlıklar silinemez, öncelikle poz eklemeye kapatınız."
      }

      setSelectedPoz()
      setDialogCase("error")
      setShowDialog(hataMesaj_)
    }
  }



  let header = "Pozlar"
  // isProject?.name ? header = isProject?.name : null



  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // }));



  return (
    <Paper >

      {showDialog &&
        <DialogWindow dialogCase={dialogCase} showDialog={showDialog} setShowDialog={setShowDialog} />
      }



      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: "0.5rem 1rem", maxHeight: "5rem" }}
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
              <IconButton onClick={() => setSelectedPoz()} aria-label="wbsUncliced">
                <ClearOutlined variant="contained" sx={{
                  color: selectedPoz ? "red" : "lightgray",
                }} />
              </IconButton>
            </Grid>


            <Grid item onClick={() => handlePozDelete(selectedPoz)} sx={{ cursor: "pointer" }}>
              <IconButton aria-label="addPoz" disabled>
                <DeleteIcon
                  // sx={{display: isProject_display}}
                  variant="contained" sx={{
                    color: selectedPoz ? "darkred" : "lightgray",
                  }} />
              </IconButton>
            </Grid>



            <Grid item>
              <IconButton onClick={() => setShow("FormPozCreate")} aria-label="addWbs" disabled={isProject?.wbs.filter(item => item.openForPoz).length == 0 ? true : false}>
                <AddCircleOutlineIcon variant="contained" color={isProject?.wbs.filter(item => item.openForPoz).length == 0 ? " lightgray" : "success"} />
              </IconButton>
            </Grid>

          </Grid>
        </Grid>

      </Grid>


    </Paper>
  )
}
