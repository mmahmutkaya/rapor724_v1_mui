import { useState } from 'react';
import { useApp } from "./useApp.js";


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
import WarningIcon from '@mui/icons-material/Warning';
import { Typography } from '@mui/material';


export default function FormPozCreate({ setShow, isProject }) {

  // console.log("FormPozCreate-->isProject",isProject)

  const [showDialogInfo, setShowDialogInfo] = useState(false)
  const [showDialogError, setShowDialogError] = useState(false)
  const [hataMesaj, setHataMesaj] = useState("")
  const [wbsToCreatePoz, setWbsToCreatePoz] = useState("");

  const RealmApp = useApp();

  async function handleSubmit(event) {

    event.preventDefault();

    try {

      const data = new FormData(event.currentTarget);
      const wbsName = data.get('wbsName')

      // console.log({ projectId: isProject._id })
      // console.log({ upWbs: selectedWbs?.code ? selectedWbs?.code : null })
      // console.log({ upWbs: selectedWbs?.name ? selectedWbs?.name : "En üst seviyeye" })
      console.log("wbsName--", wbsName)

      const project = await RealmApp.currentUser.callFunction("createWbs", {
        projectId: isProject._id,
        upWbs: selectedWbs?.code ? selectedWbs?.code : "0",
        newWbsName: wbsName
      });
      setSelectedWbs(null)
      setIsProject(project)
      setShowDialogInfo(true)


      // await RealmApp.currentUser.callFunction("createProject", { name: wbsName });

      // refetch_projects()
      // setShowDialogInfo(true)

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

      setHataMesaj(hataMesaj_)
      setShowDialogError(true)

    }

  }




  //gösterim kodları başlangıcı --> koşulllu sayfa gösterimleri

  if (showDialogInfo) {
    return (
      <div>

        <Dialog
          PaperProps={{ sx: { position: "fixed", top: "10rem", margin: { xs: '2rem' } } }}
          open={true}
          onClose={() => setShow("ProjectMain")} >
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



  const handleChange = (event) => {
    setWbsToCreatePoz(event.target.value);
    console.log(event.target.value)
  };




  return (
    <div>

      <Dialog
        PaperProps={{ sx: { width: "80%", position: "fixed", top: "10rem" } }}
        open={true}
        onClose={() => setShow("WbsMain")} >
        {/* <DialogTitle>Subscribe</DialogTitle> */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

          <DialogContent>

            <DialogContentText sx={{ fontWeight: "bold", paddingBottom: "1rem" }}>
              {/* <Typography sx> */}
              Poz Oluştur
              {/* </Typography> */}
            </DialogContentText>


            <Box sx={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={wbsToCreatePoz}
                label="Age"
                // onChange={handleChange}
              >
                {
                  /* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */
                }

                {/* {console.log(isProject)} */}

                {
                  isProject?.wbs.map(wbs => (
                    // console.log(wbs)
                    <MenuItem key={wbs._id} value={wbs.name} name={wbsName}>
                      {wbs.name}
                    </MenuItem>
                  ))
                }

              </Select>
            </Box>

            {/* <Box onClick={() => setShowDialogError(false)}>
              <TextField
                variant="standard"
                // InputProps={{ sx: { height:"2rem", fontSize: "1.5rem" } }}
                margin="normal"
                id="wbsName"
                name="wbsName"
                // autoFocus
                error={showDialogError}
                helperText={showDialogError ? hataMesaj : ""}
                // margin="dense"
                label="Wbs Adı"
                type="text"
                fullWidth
              />
            </Box> */}

          </DialogContent>

          <DialogActions sx={{ padding: "1.5rem" }}>
            <Button onClick={() => setShow("ProjectWbsMain")}>İptal</Button>
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
