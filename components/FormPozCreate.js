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

  const [error_for_wbs, setError_for_wbs] = useState(false)
  const [error_for_name, setError_for_name] = useState(false)
  const [error_for_unit, setError_for_unit] = useState(false)

  const [hataMesaj, setHataMesaj] = useState("")
  const [newWbsName_for_Poz, setNewPozName_for_Poz] = useState("");

  const RealmApp = useApp();

  async function handleSubmit(event) {

    event.preventDefault();

    try {

      const data = new FormData(event.currentTarget);
      const newPozName = data.get('newPozName')
      const newPozUnit = data.get('newPozUnit')

      if (!newWbsName_for_Poz) {
        setError_for_wbs(true);
      }
      console.log("newWbsName_for_Poz--", newWbsName_for_Poz)

      if (!newPozName) {
        setError_for_name(true);
      }
      console.log("newPozName--", newPozName)

      if (!newPozUnit) {
        setError_for_unit(true);
      }
      console.log("newPozUnit--", newPozUnit)

      if (error_for_wbs || error_for_name || error_for_unit) {
        return console.log("bittiiii hata ile")
      }




      // const project = await RealmApp.currentUser.callFunction("createWbs", {
      //   projectId: isProject._id,
      //   upWbs: selectedWbs?.code ? selectedWbs?.code : "0",
      //   newWbsName: wbsName
      // });
      // setSelectedWbs(null)
      // setIsProject(project)
      // setShowDialogInfo(true)


      // await RealmApp.currentUser.callFunction("createProject", { name: newPozName });

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
      // setError_for_name(true)
      // setError_for_name(true)

    }

  }




  //gösterim kodları başlangıcı --> koşulllu sayfa gösterimleri

  if (showDialogInfo) {
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
    setNewPozName_for_Poz(event.target.value);
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
            <Box onClick={() => setError_for_wbs(false)} sx={{ minWidth: 120, marginBottom:"1.5rem" }}>
              <InputLabel error={error_for_wbs} id="select-wbs-label">Başlık seçiniz - poz için (Wbs)</InputLabel>
              <Select
                error={error_for_wbs}
                variant="standard"
                fullWidth
                labelId="select-wbs-label"
                id="select-wbs"
                value={newWbsName_for_Poz}
                // label="Poz için başlık seçiniz"
                // label="Poz"
                onChange={handleChange_newWbsName}
                required
              >
                {
                  isProject?.wbs.map(wbs => (
                    // console.log(wbs)
                    <MenuItem key={wbs._id} value={wbs.name}>
                      {wbs.name}
                    </MenuItem>
                  ))
                }

              </Select>
            </Box>

            {/* poz isminin yazıldığı alan */}
            {/* tıklayınca setShowDialogError(false) çalışmasının sebebi -->  error vermişse yazmaya başlamak için tıklayınca error un silinmesi*/}
            <Box onClick={() => setError_for_name(false)} sx={{marginBottom:"1.5rem" }}>
              <TextField
                variant="standard"
                // InputProps={{ sx: { height:"2rem", fontSize: "1.5rem" } }}
                margin="normal"
                id="newPozName"
                name="newPozName"
                // autoFocus
                error={error_for_name}
                helperText={error_for_name ? "hataMesaj düzenlenecek poz için" : ""}
                // margin="dense"
                label="Poz Adı"
                type="text"
                fullWidth
              />
            </Box>


            {/* poz biriminin yazıldığı alan */}
            {/* tıklayınca setShowDialogError(false) çalışmasının sebebi -->  error vermişse yazmaya başlamak için tıklayınca error un silinmesi*/}
            <Box onClick={() => setError_for_unit(false)} sx={{marginBottom:"1.5rem" }}>
              <TextField
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
