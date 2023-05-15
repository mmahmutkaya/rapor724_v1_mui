import React from 'react'
import Box from '@mui/material/Box';
import TabloPozlar from '../../components/TabloPozlar'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function P_Pozlar() {
  return (
    <Grid container sx={{ width: '100%' }}>

      <Grid container sx={{ padding: "1rem", width: '100%', position: "relative" }}>
        <Grid container justifyContent="space-between" >
          <Typography
            // sx={{
            //   position: "absolute",
            //   top: "50%",
            //   transform: "translate(0, -50%)",
            // }}
            variant="h5"
            fontWeight="bold"
            id="tableTitle"
            component="div"
          >
            Pozlar
          </Typography>
          <Button variant="contained">Contained</Button>
        </Grid>
      </Grid>

      <Grid sx={{ width: '100%' }}>
        <TabloPozlar />
      </Grid>

    </Grid>

  )
}


// sx={{ backgroundColor:"red" }}
// sx={{ backgroundColor:"red" }}
// sx={{ backgroundColor:"red" }}

