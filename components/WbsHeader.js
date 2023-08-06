import { useState, useContext } from 'react';
import { StoreContext } from '../components/store'
import { DialogWindow } from './general/DialogWindow';



import React from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearOutlined from '@mui/icons-material/ClearOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AppBar } from '@mui/material';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';


export default function WbsHeader({ RealmApp, setShow }) {

  const { drawerWidth, topBarHeight, subHeaderHeight } = useContext(StoreContext)

  const [showDialog, setShowDialog] = useState(false)
  const [dialogCase, setDialogCase] = useState("")

  const { isProject, setIsProject } = useContext(StoreContext)
  const { selectedWbs, setSelectedWbs } = useContext(StoreContext)


  async function handleWbsUnclicked() {

    // aslında gerek yok zaten wbs yok ama olsun
    if (!selectedWbs) {
      console.log("alttaki satırda --return-- oldu")
      return
    }

    setSelectedWbs()
  }


  async function handleWbsOpenForPoz(event) {

    // wbs poza açık hale getirilecekse
    if (event.target.checked === true) {

      try {

        if (!selectedWbs) {
          console.log("alttaki satırda --return-- oldu")
          return
        }

        // bu kontrol backend de ayrıca yapılıyor
        let text = selectedWbs.code + "."
        if (isProject.wbs.find(item => item.code.indexOf(text) === 0)) {
          throw new Error("\"" + selectedWbs.name + "\" isimli başlığın bir veya daha fazla alt başlığı mevcut, bu sebeple direk poz eklemeye açık hale getirilemez, mevcut alt başlıklar uygun değilse, yeni bir alt başlık oluşturup, o başlığı poz eklemeye açabilirsiniz.")
        }

        const resultProject = await RealmApp.currentUser.callFunction("openWbsForPoz", { projectId: isProject._id, wbsId: selectedWbs._id });
        setIsProject(resultProject)

        // switch on-off gösterim durumunu güncellemesi için 
        setSelectedWbs(resultProject.wbs.find(item => item._id.toString() === selectedWbs._id.toString()))

        return

      } catch (err) {

        console.log("err", err.message)
        let hataMesaj_ = err?.message ? err.message : "Beklenmedik hata, Rapor7/24 ile irtibata geçiniz.."

        if (hataMesaj_.includes("bir veya daha fazla alt başlığı mevcut")) {
          hataMesaj_ = "\"" + selectedWbs.name + "\" isimli başlığın bir veya daha fazla alt başlığı mevcut, bu sebeple direk poz eklemeye açık hale getirilemez, mevcut alt başlıklar uygun değilse, yeni bir alt başlık oluşturup, o başlığı poz eklemeye açabilirsiniz."
        }

        setDialogCase("error")
        setShowDialog(hataMesaj_)
      }
    }


    // wbs poza kapalı hale getirilecekse
    if (event.target.checked === false) {

      try {

        if (!selectedWbs) {
          console.log("alttaki satırda --return-- oldu")
          return
        }

        const resultProject = await RealmApp.currentUser.callFunction("closeWbsForPoz", { projectId: isProject._id, wbsId: selectedWbs._id });
        setIsProject(resultProject)

        // switch on-off gösterim durumunu güncellemesi için 
        setSelectedWbs(resultProject.wbs.find(item => item._id.toString() === selectedWbs._id.toString()))

        return

      } catch (err) {

        console.log("err", err.message)
        let hataMesaj_ = err?.message ? err.message : "Beklenmedik hata, Rapor7/24 ile irtibata geçiniz.."

        if (hataMesaj_.includes("kayıtlı pozlar mevcut")) {
          hataMesaj_ = "\"" + selectedWbs.name + "\" isimli başlık altında kayıtlı pozlar mevcut olduğu için silinemez, öncelikle pozları silmeli ya da başka başlık altına taşımalısınız."
        }

        setDialogCase("error")
        setShowDialog(hataMesaj_)
      }
    }

  }




  async function handleWbsDelete() {

    // seçili wbs yoksa durdurma, inaktif iken tuşlara basılabiliyor mesela, bu fonksiyon çalıştırılıyor, orayı iptal etmekle uğraşmak istemedim
    if (!selectedWbs) {
      console.log("alttaki satırda --return-- oldu")
      return
    }

    // bu kontrol backend de ayrıca yapılıyor
    // if (selectedWbs.openForPoz) {
    //   throw new Error("Poz eklemeye açık başlıklar silinemez, öncelikle poz eklemeye kapatınız")
    // }

    try {
      const resultProject = await RealmApp.currentUser.callFunction("deleteWbs", { projectId: isProject._id, wbsId: selectedWbs._id });
      setIsProject(resultProject)
      setSelectedWbs(null)
    } catch (err) {

      console.log(err)
      let hataMesaj_ = err.message ? err.message : "Beklenmedik hata, Rapor7/24 ile irtibata geçiniz.."

      if (hataMesaj_.includes("Silmek istediğiniz  WBS'in alt seviyeleri mevcut")) {
        hataMesaj_ = "Silmek istediğiniz  WBS'in alt seviyeleri mevcut, öncelikle onları silmelisiniz."
      }

      if (hataMesaj_.includes("Poz eklemeye açık başlıklar silinemez")) {
        hataMesaj_ = "Poz eklemeye açık başlıklar silinemez, öncelikle poz eklemeye kapatınız."
      }

      setDialogCase("error")
      setShowDialog(hataMesaj_)
    }
  }

  // const [checked, setChecked] = useState(false);
  // const wbsSwitch = (event) => {
  //   setChecked(event.target.checked);
  //   console.log(event.target.checked)
  // };


  return (
    <Paper>

      {showDialog &&
        <DialogWindow dialogCase={dialogCase} showDialog={showDialog} setShowDialog={setShowDialog} />
      }


      <AppBar position="fixed" sx={{ width: { md: `calc(100% - ${drawerWidth}px)` }, mt: topBarHeight, ml: { md: `${drawerWidth}px` }, backgroundColor: "white" }}>

        <Grid
          container
          justifyContent="space-between"
          sx={{ alignItems: "center", padding: "0rem 0.5rem", height: subHeaderHeight, overflow: "auto" }}
        >

          {/* başlık sol */}
          <Grid item  >
            <Typography
              sx={{ display: { xs: 'none', sm: "block" } }}
              color={"black"}
              variant="h5"
              fontWeight="bold"
            >
              Poz Başlıkları
            </Typography>
          </Grid>


          {/* başlık sağ */}
          <Grid item>
            <Grid container spacing={0.5}>

              <Grid item >
                <IconButton onClick={() => handleWbsUnclicked()} aria-label="wbsUncliced">
                  <ClearOutlined variant="contained" sx={{
                    color: !selectedWbs ? "lightgray" : "red",
                  }} />
                </IconButton>
              </Grid>

              <Grid item >
                <Grid container direction={"column"} alignItems={"center"}>
                  <Grid item>
                    <Typography sx={{ color: !selectedWbs ? "lightgray" : "rgb(24,24,24)" }} >poz</Typography>
                  </Grid>
                  <Grid item >
                    <AntSwitch disabled={!selectedWbs} checked={selectedWbs?.openForPoz ? true : false} onChange={handleWbsOpenForPoz} />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item ml={"1rem"}>
                <Grid container direction={"column"} alignItems={"center"}>
                  <Grid item>
                    <Typography sx={{ color: !selectedWbs ? "lightgray" : "rgb(24,24,24)" }} >kısa</Typography>
                  </Grid>
                  <Grid item >
                    <AntSwitch disabled={!selectedWbs} checked={selectedWbs?.openForPoz ? true : false} onChange={handleWbsOpenForPoz} />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item >
                <IconButton onClick={() => setShow("FormWbs")} aria-label="moveLeft">
                  <KeyboardArrowUpIcon sx={{ color: !selectedWbs ? "lightgray" : "rgb(100,100,100)" }} />
                </IconButton>
              </Grid>
              <Grid item >
                <IconButton onClick={() => setShow("FormWbs")} aria-label="moveLeft">
                  <KeyboardArrowDownIcon sx={{ color: !selectedWbs ? "lightgray" : "rgb(100,100,100)" }} />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={() => setShow("FormWbs")} aria-label="moveLeft">
                  <KeyboardArrowLeftIcon sx={{ color: !selectedWbs ? "lightgray" : "rgb(100,100,100)" }} />
                </IconButton>
              </Grid>
              <Grid item >
                <IconButton onClick={() => setShow("FormWbs")} aria-label="moveRight">
                  <KeyboardArrowRightIcon sx={{ color: !selectedWbs ? "lightgray" : "rgb(100,100,100)" }} />
                </IconButton>
              </Grid>
              <Grid item >
                <IconButton onClick={() => handleWbsDelete()} aria-label="delete">
                  <DeleteIcon variant="contained" color="error" sx={{ color: !selectedWbs ? "lightgray" : "rgb(139,0,0)" }} />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={() => setShow("FormWbsCreate")} disabled={selectedWbs?.code.split(".").length == 8 ? true : false} aria-label="addWbs">
                  <AddCircleOutlineIcon variant="contained" color={selectedWbs?.code.split(".").length == 8 ? " lightgray" : "success"} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

        </Grid>

      </AppBar>

    </Paper>
  )
}



const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));