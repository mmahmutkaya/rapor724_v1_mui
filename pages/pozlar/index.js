
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { StoreContext } from '../../components/store'
import { useApp } from "../../components/useApp";
import { useQuery } from '@tanstack/react-query'
import FormPozCreate from '../../components/FormPozCreate'
import PozHeader from '../../components/PozHeader'


import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


import TurnedInIcon from '@mui/icons-material/TurnedIn';




export default async function P_Pozlar() {

  const { isProject } = useContext(StoreContext)
  const { selectedWbs, setSelectedWbs } = useContext(StoreContext)

  const [show, setShow] = useState("PozMain")

  const router = useRouter();
  // !isProject ? router.push('/projects') : null
  !isProject ? window.location.href = "/projects" : null

  const RealmApp = useApp();
  const [pozlar, setPozlar] = useState([])
  if (RealmApp?.currentUser) {
    const _pozlar = await RealmApp?.currentUser.callFunction("getProjectPozlar", ({ projectId: isProject?._id }))
    setPozlar(_pozlar)
  }
  console.log(pozlar)


  const handleWbsClick = (project) => {
    console.log("handleWbsClick")
  }

  let wbsCode
  let wbsName

  return (
    <Grid container direction="column" spacing={1}>

      <Grid item >
        <PozHeader setShow={setShow} />
      </Grid>

      {show == "FormPozCreate" &&
        <Grid item >
          <FormPozCreate isProject={isProject} setShow={setShow} />
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
                direction="column"
                container spacing={0}
                sx={{
                  "&:hover": {
                    color: "red",
                  },
                  padding: "0.2rem 1rem",
                  cursor: "pointer"
                }}
              >


                <Grid item>

                  <Grid container>

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

                </Grid>



                <Grid item marginBottom={5}>
                  {/* <Box sx={{ height: 400, width: '100%' }}> */}
                  <Box >
                    <DataGrid
                      rows={pozlar}
                      columns={columns}
                      hideFooter={true}
                      density="compact"
                      initialState={{
                        // pagination: {
                        //   paginationModel: {
                        //     pageSize: 5,
                        //   },
                        // },
                      }}
                      // pageSizeOptions={[5]}
                      // checkboxSelection
                      disableRowSelectionOnClick
                    />
                  </Box>
                </Grid>

              </Grid>

            ))
          }


        </Stack>
      }

    </Grid>

  )

}


const columns = [
  // {
  //   field: 'id',
  //   headerName: 'ID',
  //   width: 90,
  // },
  {
    field: 'name',
    headerName: 'Poz Adı',
    width: 150,
    editable: true,
  },
  {
    field: 'unit',
    headerName: 'Birim',
    width: 150,
    editable: true,
  },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];


// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];