import { useState } from 'react';
import { useApp } from "./useApp.js";
import deleteLastSpace from '../functions/deleteLastSpace.js';


//mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Typography } from '@mui/material';


export default function FormPozCreate({ setShow, isProject }) {

  // console.log("FormPozCreate-->isProject",isProject)

  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showErrorDialog, setShowErrorDialog] = useState(null)

  const [error_for_project, setError_for_project] = useState(false)
  const [error_for_wbs, setError_for_wbs] = useState(false)
  const [error_for_name, setError_for_name] = useState(false)
  const [error_for_unit, setError_for_unit] = useState(false)

  const [wbsId_for_Poz, setWbsId_for_Poz] = useState("");

  const RealmApp = useApp();


  // poz oluşturma fonksiyonu
  async function handleSubmit(event) {

    event.preventDefault();

    try {

      //verileri tanımlama
      const data = new FormData(event.currentTarget);
      // const newPozName = deleteLastSpace(data.get('newPozName'))
      // const newPozUnit = deleteLastSpace(data.get('newPozUnit'))

      const newPozName = data.get('newPozName')
      const newPozUnit = data.get('newPozUnit')

      console.log(newPozName)
      console.log(newPozUnit)


      //verilerin kontrolü

      if (!isProject?._id) {
        setError_for_project(true);
      }
      console.log("isProject?._id", isProject?._id)

      if (!wbsId_for_Poz) {
        setError_for_wbs(true);
      }
      console.log("wbsId_for_Poz", wbsId_for_Poz)

      if (!newPozName) {
        setError_for_name(true);
      }
      console.log("newPozName--", newPozName)

      if (!newPozUnit) {
        setError_for_unit(true);
      }
      console.log("newPozUnit--", newPozUnit)

      //verilerin kontrolü
      if (error_for_project || error_for_wbs || error_for_name || error_for_unit) {
        throw new Error({ error: "db ye gönderilmek istenen verilerde hata var" })
      }

      

      const result = await RealmApp?.currentUser?.callFunction("createPoz", {
        projectId: isProject._id,
        wbsId: wbsId_for_Poz,
        newPozName,
        newPozUnit
      });

      if (!result.insertedId) {
        throw new Error({ error: "Poz kaydedilemedi" })
      }
      console.log("result", result)
      setShowSuccessDialog(true)

      // await RealmApp.currentUser.callFunction("createProject", { name: newPozName });

      // refetch_projects()
      // setShowSuccessDialog(true)

    } catch (err) {

      console.log(err)
      // err?.error ? setHataMesaj(err.error) : setHataMesaj("Beklenmedik bir hata oluştu, lütfen Rapor7/24 ile irtibata geçiniz..")
      let hataMesaj_ = err?.error ? err.error : "Beklenmedik hata, Rapor7/24 ile irtibata geçiniz.."

      if (hataMesaj_.includes("duplicate key error")) {
        hataMesaj_ = "Sistemde kayıtlı"
      }

      if (hataMesaj_.includes("çok kısa")) {
        hataMesaj_ = "Çok kısa"
      }

      // setHataMesaj(hataMesaj_)
      setShowErrorDialog(hataMesaj_)
      // setError_for_name(true)
      // setError_for_name(true)

    }

  }





  //gösterim kodları başlangıcı --> koşulllu sayfa gösterimleri

  if (showErrorDialog) {

    let hataMesaj

    if (typeof showErrorDialog !== "string") {
      hataMesaj = "Tespit edilemeyen hata, sorun devam ederse lütfen Rapor7/24 ile irtibata geçiniz."
    } else {
      hataMesaj = showErrorDialog
    }


    return (
      <div>

        <Dialog
          PaperProps={{ sx: { position: "fixed", top: "10rem", margin: { xs: '2rem' } } }}
          open={true}
          onClose={() => setShow("PozMain")} >
          {/* <DialogTitle>Subscribe</DialogTitle> */}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

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

          </Box>
        </Dialog>

      </div >
    );
  }


  if (showSuccessDialog) {
    return (
      <div>

        <Dialog
          PaperProps={{ sx: { position: "fixed", top: "10rem", margin: { xs: '2rem' } } }}
          open={true}
          onClose={() => setShow("PozMain")} >
          {/* <DialogTitle>Subscribe</DialogTitle> */}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            <DialogContent>
              <Grid container spacing={1}>

                <Grid item>
                  <CheckCircleIcon variant="contained" color="success" pr={3} />
                </Grid>

                <Grid item>
                  <DialogContentText>
                    Poz kaydı başarı ile gerçekleşti
                  </DialogContentText>
                </Grid>
              </Grid>
            </DialogContent>

          </Box>
        </Dialog>

      </div >
    );
  }



  const handleChange_newWbsName = (event) => {
    setWbsId_for_Poz(event.target.value);
    console.log(event.target.value)
  };




  return (
    <div>

      <Dialog
        PaperProps={{ sx: { width: "80%", position: "fixed", top: "10rem" } }}
        open={true}
        onClose={() => setShow("PozMain")} >
        {/* <DialogTitle>Subscribe</DialogTitle> */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

          <DialogContent>

            <DialogContentText sx={{ fontWeight: "bold", marginBottom: "2.5rem" }}>
              {/* <Typography sx> */}
              Poz Oluştur
              {/* </Typography> */}
            </DialogContentText>


            {/* wbs adı seçme - çoktan seçmeli - poz başlığı için*/}
            <Box onClick={() => setError_for_wbs(false)} sx={{ minWidth: 120, marginBottom: "1.5rem" }}>

              <InputLabel
                error={error_for_wbs}
                id="select-wbs-label"
              >
                <Grid container justifyContent="space-between">

                  <Grid item>Başlık seçiniz</Grid>

                  <Grid item onClick={() => console.log("poz create component wbs tıklandı")} >
                    wbs
                    <ArrowForwardIcon sx={{ fontSize: 15, verticalAlign: "middle" }} />
                  </Grid>

                </Grid>

              </InputLabel>

              <Select
                error={error_for_wbs}
                variant="standard"
                fullWidth
                labelId="select-wbs-label"
                id="select-wbs"
                value={wbsId_for_Poz}
                // label="Poz için başlık seçiniz"
                // label="Poz"
                onChange={handleChange_newWbsName}
                required
              >
                {
                  isProject?.wbs.map(wbs => (
                    // console.log(wbs)
                    <MenuItem key={wbs._id} value={wbs._id}>
                      {wbs.name}
                    </MenuItem>
                  ))
                }

              </Select>

            </Box>

            {/* poz isminin yazıldığı alan */}
            {/* tıklayınca setShowDialogError(false) çalışmasının sebebi -->  error vermişse yazmaya başlamak için tıklayınca error un silinmesi*/}
            <Box onClick={() => setError_for_name(false)} sx={{ marginBottom: "1.5rem" }}>
              <TextField
                sx={{
                  "& input:-webkit-autofill:focus": {
                    transition: "background-color 600000s 0s, color 600000s 0s"
                  },
                  "& input:-webkit-autofill": {
                    transition: "background-color 600000s 0s, color 600000s 0s"
                  },
                }}
                variant="standard"
                // InputProps={{ sx: { height:"2rem", fontSize: "1.5rem" } }}
                margin="normal"
                id="newPozName"
                name="newPozName"
                // autoFocus
                error={error_for_name}
                helperText={error_for_name ? "hataMesaj düzenlenecek poz için" : ""}
                // margin="dense"
                label="Poz Adi"
                type="text"
                fullWidth
              />
            </Box>


            {/* poz biriminin yazıldığı alan */}
            {/* tıklayınca setShowDialogError(false) çalışmasının sebebi -->  error vermişse yazmaya başlamak için tıklayınca error un silinmesi*/}
            <Box onClick={() => setError_for_unit(false)} sx={{ marginBottom: "1.5rem" }}>
              <TextField
                sx={{
                  "& input:-webkit-autofill:focus": {
                    transition: "background-color 600000s 0s, color 600000s 0s"
                  },
                  "& input:-webkit-autofill": {
                    transition: "background-color 600000s 0s, color 600000s 0s"
                  },
                }}
                variant="standard"
                // InputProps={{ sx: { height:"2rem", fontSize: "1.5rem" } }}
                margin="normal"
                id="newPozUnit"
                name="newPozUnit"
                // autoFocus
                error={error_for_unit}
                helperText={error_for_unit ? "hataMesaj düzenlenecek birim için" : ""}
                // margin="dense"
                label="Poz Birim"
                type="text"
                fullWidth
              />
            </Box>

          </DialogContent>

          <DialogActions sx={{ padding: "1.5rem" }}>
            <Button onClick={() => setShow("PozMain")}>İptal</Button>
            <Button type="submit">Oluştur</Button>
          </DialogActions>

        </Box>
      </Dialog>
    </div >
  );



}




const currencies = [
  {
    value: 'USD',
    label: '$',
    name: "ahmed"
  },
  {
    value: 'EUR',
    label: '€',
    name: "mahmut"
  },
  {
    value: 'BTC',
    label: '฿',
    name: "muhammed"
  },
  {
    value: 'JPY',
    label: '¥',
    name: "mustafa"
  },
];
