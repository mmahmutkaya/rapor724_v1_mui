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
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import * as Realm from "realm-web";
import { useApp } from "./useApp.js";
import { Padding } from '@mui/icons-material';


const theme = createTheme();

export default function FormProjectCreate({ setShow }) {

  const RealmApp = useApp();


  async function handleForm({ event }) {

    event.preventDefault();

    try {

      const data = new FormData(event.currentTarget);
      const projectName = data.get('projectName')

      console.log(projectName)

      const result = await RealmApp.currentUser.callFunction("createProject", { name: projectName });

      console.log(result)
      // refetch_groups()
      // return setShow("Groups")

    } catch (err) {

      const hataMesaj = err.error ? err.error : err

      if (hataMesaj.includes("duplicate key error")) {
        return console.log("Bu grup adı sistemde kayıtlı, grup adınızın başına proje, firma, şube vb. ilaveler ekleyerek özelleştirebilirsiniz.")
      }

      return console.log(hataMesaj)
    }

  }



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        {/* <CssBaseline /> */}
        <Box
          sx={{
            marginTop: 2,
            display: 'grid',
          }}
        >
          <Stack sx={{ padding: "1rem", backgroundColor: "#EEEEEE" }}>

            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}

            <Grid container justifyContent="space-between">
              <Grid item>
                {/* <Typography component="h1" variant="h5">
                  Wbs İsmi Giriniz
                </Typography> */}
              </Grid>
              <Grid item>
                <IconButton onClick={() => setShow("ProjectMain")} aria-label="delete">
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>

            <Box component="form" onSubmit={handleForm} noValidate sx={{ mt: 1 }}>
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
                name="project"
                label="Proje Adı"
                type="project"
                id="project"
                autoComplete="project"
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
          </Stack>
        </Box>
      </Container>
    </ThemeProvider>
  );
}