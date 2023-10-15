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
import ClearOutlined from '@mui/icons-material/ClearOutlined';



export default function MetrajHeader({ setShow }) {

  const { drawerWidth, topBarHeight } = useContext(StoreContext)

  const { isProject, setIsProject } = useContext(StoreContext)
  const RealmApp = useApp();

  const { selectedMahal, setSelectedMahal } = useContext(StoreContext)

  const [showDialog, setShowDialog] = useState(false)
  const [dialogCase, setDialogCase] = useState("")



  async function createMetraj(event) {

    event.preventDefault();

    try {
      isError = false

      //verileri tanımlama
      const data = new FormData(event.currentTarget);
      const newPozName = deleteLastSpace(data.get('newPozName'))
      const newPozUnit = deleteLastSpace(data.get('newPozUnit'))


      const newPoz = {
        projectId: isProject._id,
        wbsId: wbsId_for_Poz,
        newPozName,
        newPozUnit
      }

      const result = await RealmApp?.currentUser?.callFunction("createMetraj", newPoz);


      // eğer gönderilen form verilerinde hata varsa db den gelen form validation mesajları form içindeki ilgili alanlarda gösterilir ve fonksiyon durdurulur
      // yukarıda da frontend kontrolü yapılmıştı
      if (result.errorFormObj) {

        const errorFormObj = result.errorFormObj

        console.log("errorFormObj", errorFormObj)

        if (errorFormObj.wbsId) {
          setError_for_wbs(true);
          setErrorText_for_wbs(errorFormObj.wbsId)
          isError = true
        }

        if (errorFormObj.newPozName) {
          setError_for_name(true);
          setErrorText_for_name(errorFormObj.newPozName)
          isError = true
        }

        if (errorFormObj.newPozUnit) {
          setError_for_unit(true);
          setErrorText_for_unit(errorFormObj.newPozUnit)
          isError = true
        }

        return
      }

      if (!result.newPoz?._id) {
        throw new Error("db den -newPoz- ve onun da -_id-  property dönmedi, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz..")
      }

      if (!result.newProject?._id) {
        throw new Error("db den -newProject- ve onun da -_id-  property dönmedi, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz..")
      }

      setPozlar(oldPozlar => [...oldPozlar, result.newPoz])
      setIsProject(result.newProject)
      setShow("Main")

    } catch (err) {

      console.log(err)
      let hataMesaj_ = err?.message ? err.message : "Beklenmedik hata, Rapor7/24 ile irtibata geçiniz.."

      // eğer çifte kayıt oluyorsa form içindeki poz ismi girilen yere aşağıdaki mesaj gönderilir, fonksiyon durdurulur
      if (hataMesaj_.includes("duplicate key error")) {
        setError_for_name(true);
        setErrorText_for_name("Bu poz ismi bu projede mevcut")
        console.log("Bu poz ismi bu projede mevcut")
        return
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
