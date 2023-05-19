import React from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';


export default function WbsHeader() {
  return (
    <Paper>

      <Grid
        container
        justifyContent="space-between"
        sx={{ padding: "1rem" }}>

        {/* başlık sol */}
        <Grid>
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
            İş Alanları WBS
          </Typography>
        </Grid>


        {/* başlık sağ */}
        <Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Button variant="contained" color="success">Poz Ekle</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="success">Poz Ekle</Button>
            </Grid>
          </Grid>
        </Grid>

      </Grid>

    </Paper>
  )
}
