import { useState } from 'react';
import { useApp } from "./useApp.js";


//mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import { Typography } from '@mui/material';


export default function P_FormWbsCreate({ setShow, isProject, setIsProject, selectedWbs, setSelectedWbs }) {

  const [showDialogInfo, setShowDialogInfo] = useState(false)
  const [showDialogError, setShowDialogError] = useState(false)
  const [hataMesaj, setHataMesaj] = useState("")

  const RealmApp = useApp();

  async function handleSubmit(event) {

    event.preventDefault();

    try {

      const data = new FormData(event.currentTarget);
      const wbsName = data.get('wbsName')

      // console.log({ projectId: isProject._id })
      // console.log({ upWbs: selectedWbs?.code ? selectedWbs?.code : null })
      // console.log({ upWbs: selectedWbs?.name ? selectedWbs?.name : "En üst seviyeye" })
      // console.log(wbsName)

      const project = await RealmApp.currentUser.callFunction("createWbs", {
        projectId: isProject._id,
        upWbs: selectedWbs?.code ? selectedWbs?.code : "0",
        newWbsName:wbsName
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
                    Wbs kaydı başarı ile gerçekleşti
                  </DialogContentText>
                </Grid>
              </Grid>
            </DialogContent>

          </Box>
        </Dialog>
      </div >
    );
  }


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
              Wbs Oluştur
              {/* </Typography> */}
            </DialogContentText>

            {selectedWbs &&
              <>
                <DialogContentText sx={{ fontWeight: "bold", paddingBottom: "1rem" }}>
                  {selectedWbs.code} {selectedWbs.name}
                </DialogContentText>
                <Typography >
                  başlığı altına yeni bir Wbs eklemek üzeresiniz.
                </Typography>
              </>
            }

            {!selectedWbs &&
              <DialogContentText sx={{ fontWeight: "bold", paddingBottom: "1rem" }}>
                {/* <Typography > */}
                En üst düzeye yeni bir Wbs eklemek üzeresiniz.
                {/* </Typography> */}
              </DialogContentText>
            }

            <Box onClick={() => setShowDialogError(false)}>
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
            </Box>

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