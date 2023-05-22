import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { useApp } from "./useApp.js";


const theme = createTheme();

export default function SignIn({ setShow }) {

  const RealmApp = useApp();

  async function handleSubmit(event) {

    event.preventDefault();

    try {

      const data = new FormData(event.currentTarget);
      const projectName = data.get('projectName')
      // const password = data.get('password')

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

      const hataMesaj = err?.error ? err.error : err

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
    <ThemeProvider theme={theme}>

      <Paper >

        <Box component="form" onSubmit={handleSubmit} noValidate >

          <Grid
            container
            direction="column"
            sx={{ padding: "1rem 2rem" }}
          >

            <Grid item>
              <TextField
                autoFocus
                margin="normal"
                required
                fullWidth
                name="projectName"
                label="Proje Adı"
                type="projectName"
                id="projectName"
                autoComplete="projectName"
              />
            </Grid>

            <Grid item sx={{ alignSelf: "flex-end" }}>
              <Button
                onClick={() => setShow("ProjectMain")}
                type="cancel"
                variant="text"
              >
                <Typography sx={{fontWeight: 'bold'}}>İptal</Typography>
              </Button>

              <Button
                onClick={() => handleSubmit}
                type="submit"
                variant="text"
              >
                <Typography sx={{fontWeight: 'bold'}}>Tamam</Typography>
              </Button>
            </Grid>

          </Grid>
        </Box>
      </Paper>
    </ThemeProvider>
  );
}