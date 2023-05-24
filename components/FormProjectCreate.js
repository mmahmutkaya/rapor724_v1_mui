import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function DialogForm({ show, setShow }) {



  async function handleSubmit(event) {

    event.preventDefault();

    try {

      const data = new FormData(event.currentTarget);
      const projectName = data.get('projectName')

      console.log(projectName)
      // console.log(password)

      // const credentials = Realm.Credentials.emailPassword(email, password);
      // const user = await RealmApp.logIn(credentials);
      // if (user) {
      //   window.location.reload(false);
      //   return console.log("Giriş işlemi başarılı")
      // }
      // return console.log("Giriş işlemi başarısız, iletişime geçiniz.")

    } catch (err) {

      // return console.log(err)

      const hataMesaj = err.error ? err.error : err

      if (hataMesaj.includes("expected a string 'password' parameter")) {
        return console.log("Şifre girmelisiniz")
      }

      if (hataMesaj === "invalid username") {
        return console.log("Email girmelisiniz")
      }

      if (hataMesaj === "invalid username/password") {
        return console.log("Email ve şifre uyuşmuyor")
      }

      console.log(hataMesaj)
      return console.log("Giriş esnasında hata oluştu, lütfen iletişime geçiniz..")

    }

  }



  return (
    <div>

      <Dialog
        PaperProps={{ sx: { position: "fixed", top: "10rem", m: 0 } }}
        open={true}
        onClose={() => setShow("ProjectMain")} >
        {/* <DialogTitle>Subscribe</DialogTitle> */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <DialogContent>
            {/* <DialogContentText>
              Proje ismini giriniz.
            </DialogContentText> */}
            <TextField
              name="projectName"
              autoFocus
              margin="dense"
              id="projectName"
              label="Proje Adı"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShow("ProjectMain")}>İptal</Button>
            <Button type="submit">Oluştur</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div >
  );
}