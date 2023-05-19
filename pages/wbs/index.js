import React from 'react'
import WbsMain from '../../components/WbsMain'
import WbsHeader from '../../components/WbsHeader'
import Grid from '@mui/material/Grid';

export default function P_Wbs() {
  return (
    <Grid container direction="column" spacing={1}>

      <Grid item >
        <WbsHeader />
      </Grid>

      <Grid item>
        <WbsMain />
      </Grid>

    </Grid>

  )
}


// sx={{ backgroundColor:"red" }}
// sx={{ backgroundColor:"red" }}
// sx={{ backgroundColor:"red" }}

