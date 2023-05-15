import React from 'react'
import Box from '@mui/material/Box';
import TabloPozlar from '../../components/TabloPozlar'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function P_Pozlar() {
  return (

    //sayfa
    <Grid >

      {/* başlık */}
      <Grid
        container
        justifyContent="space-between"
        sx={{ padding: "1rem" }}>

        {/* başlık sol */}
        <Typography
          // parent içinde position: "relative" gerekli
          // sx={{
          //   position: "absolute",
          //   top: "50%",
          //   transform: "translate(0, -50%)",
          // }}
          variant="h5"
          fontWeight="bold"
        >
          Pozlar
        </Typography>

        <Box>
          <Grid container spacing={1}>
            <Grid item>
              <Button variant="contained" color="success">Poz Ekle</Button>
            </Grid>
          </Grid>
        </Box>

      </Grid>

      <Grid >
        <TabloPozlar />
      </Grid>

    </Grid>

  )
}


// sx={{ backgroundColor:"red" }}
// sx={{ backgroundColor:"red" }}
// sx={{ backgroundColor:"red" }}

