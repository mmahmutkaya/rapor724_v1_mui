
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { StoreContext } from '../../components/store'
import { useApp } from "../../components/useApp";
import { useQuery } from '@tanstack/react-query'
import FormPozCreate from '../../components/FormPozCreate'
import ItemsHeader from '../../components/ItemsHeader'


import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import List from '@mui/material/List';

import TurnedInIcon from '@mui/icons-material/TurnedIn';




export default function P_Pozlar() {

  const { isProject, setIsProject } = useContext(StoreContext)
  const { selectedWbs, setSelectedWbs } = useContext(StoreContext)

  const [show, setShow] = useState("PozMain")

  console.log("isProject", isProject)


  const router = useRouter();
  !isProject ? router.push('/projects') : null

  // const RealmApp = useApp();


  const handleWbsClick = (project) => {
    console.log("handleWbsClick")
  }

  let wbsCode
  let wbsName

  return (
    <Grid container direction="column" spacing={1}>

      <Grid item >
        <ItemsHeader setShow={setShow} />
      </Grid>

      {show == "FormPozCreate" &&
        <Grid item >
          <FormPozCreate setShow={setShow} />
        </Grid>
      }

      {show == "PozMain" && !isProject?.wbs &&
        <Stack sx={{ width: '100%', padding: "1rem" }} spacing={2}>
          <Alert severity="info">
            Poz ekleyebilmek için öncelikle poz eklenebilcek Wbs leri belirlemeniz gerekmektedir.
          </Alert>
        </Stack>
      }

      {show == "PozMain" && isProject?.wbs &&
        <Stack sx={{ width: '100%', padding: "1rem" }} spacing={0}>

          {
            isProject.wbs.map(wbsOne => (

              <Grid
                key={wbsOne._id}
                container spacing={2}
                sx={{
                  "&:hover": {
                    color: "red",
                  },
                  padding: "0.2rem 1rem",
                  cursor: "pointer"
                }}
              >

                <Grid item>
                  <TurnedInIcon
                    sx={{
                      // "&:hover": {
                      //   color: "red",
                      // },
                      color: "#757575"
                    }} />
                </Grid>

                <Grid item>
                  {
                    wbsOne.code.split(".").map((codePart, index) => {
                      if (index == 0) {
                        wbsCode = codePart
                        wbsName = isProject.wbs.find(item => item.code == wbsCode).name
                      } else {
                        wbsCode = wbsCode + "." + codePart
                        wbsName = wbsName + " --> " + isProject.wbs.find(item => item.code == wbsCode).name
                      }
                    })
                  }
                  <Typography sx={{ fontWeight: "normal" }}>
                    {wbsName}
                  </Typography>
                </Grid>
                

              </Grid>

            ))
          }


        </Stack>
      }

    </Grid>

  )

}


