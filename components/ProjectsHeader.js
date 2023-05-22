import React from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';



export default function ProjectHeader({ setShow }) {
  return (
    <Paper>

      <Grid
        container
        justifyContent="space-between"
        sx={{ padding: "1rem" }}>

        {/* başlık sol */}
        <Grid item>
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
            Projeler
          </Typography>
        </Grid>


        {/* başlık sağ */}
        <Grid item>
          <Grid container spacing={1}>

            <Grid item>
              <IconButton  onClick={() => console.log("deleted clicked")} aria-label="addWbs">
                <DeleteIcon  variant="contained" color="error" />
              </IconButton>
            </Grid>

            <Grid item>
              <IconButton onClick={() => setShow("FormProjectCreate")} aria-label="addWbs">
                <AddCircleOutlineIcon variant="contained" color="success" />
              </IconButton>
            </Grid>

          </Grid>
        </Grid>

      </Grid>

    </Paper>
  )
}
