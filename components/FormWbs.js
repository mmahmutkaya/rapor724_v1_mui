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

import * as Realm from "realm-web";
import { useApp } from "./useApp.js";
import { Padding } from '@mui/icons-material';


const theme = createTheme();

export default function SignIn({ setShow }) {

  const RealmApp = useApp();

  async function handleSubmit(event) {

    event.preventDefault();

    try {

      const data = new FormData(event.currentTarget);
      const email = data.get('email')
      const password = data.get('password')

      const credentials = Realm.Credentials.emailPassword(email, password);
      const user = await RealmApp.logIn(credentials);
      if (user) {
        window.location.reload(false);
        return console.log("Giriş işlemi başarılı")
      }
      return console.log("Giriş işlemi başarısız, iletişime geçiniz.")

    } catch (err) {

      const hataMesaj = err.error

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
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper sx={{ padding: "1rem", backgroundColor: "#EEEEEE" }}>

            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}

            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography component="h1" variant="h5">
                  Wbs İsmi Giriniz
                </Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={() => setShow("WbsMain")} aria-label="delete">
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              {/* <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            /> */}
              <TextField
                margin="normal"
                required
                fullWidth
                name="wbs"
                label="Wbs Adı"
                type="wbs"
                id="wbs"
                autoComplete="wbs"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Tamam
              </Button>

            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}