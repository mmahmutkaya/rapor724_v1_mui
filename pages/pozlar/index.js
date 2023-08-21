
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { StoreContext } from '../../components/store'
import { useApp } from "../../components/useApp";
import { useQuery } from '@tanstack/react-query'
import FormPozCreate from '../../components/FormPozCreate'
import PozHeader from '../../components/PozHeader'
// import { usePozlarData } from '../../hooks/usePozlarData'

import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import InfoIcon from '@mui/icons-material/Info';



export default function P_Pozlar() {

  const { isProject } = useContext(StoreContext)

  const [show, setShow] = useState("PozMain")

  const router = useRouter();
  // !isProject ? router.push('/projects') : null
  !isProject ? window.location.href = "/projects" : null

  const RealmApp = useApp();

  const { isLoading, isError, data: pozlar, error, refetch: refetch_pozlar } = useQuery({
    queryKey: ['pozlar'],
    // queryFn: deneme,
    queryFn: async () => await RealmApp.currentUser.callFunction("getProjectPozlar", ({ projectId: isProject?._id })),
    refetchOnWindowFocus: false,
    enabled: !!RealmApp?.currentUser,
    // staleTime: 5 * 1000, // 1000 milisecond --> 1 second
  })

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;


  const handleOnCellClick = (params) => {
    console.log(params);
  };

  // aşağıda kullanılıyor
  let wbsCode = ""
  let wbsName = ""
  let cOunt = 0
  let pozlar2
  const gridTemplateColumns_Poz = "2rem 1fr 5rem"

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

      {show == "PozMain" && isProject?.wbs.filter(item => item.openForPoz).length == 0 &&
        <Stack sx={{ width: '100%', padding: "1rem" }} spacing={2}>
          <Alert severity="info">
            Henüz hiç bir poz başlığını poz eklemeye açmamış görünüyorsunumuz.
          </Alert>
        </Stack>
      }

      {show == "PozMain" && isProject?.wbs?.length &&
        <Stack sx={{ width: '100%', padding: "1rem" }} spacing={0}>

          <Grid sx={{ display: "grid", gridAutoFlow: "column", gridTemplateColumns: gridTemplateColumns_Poz, backgroundColor: "lightgray", fontWeight: "600", height: "2rem", alignItems: "center" }} >

            <Grid item >
              <Grid sx={{ display: "grid", justifyContent: "center", width: "100%", height: "100%" }}>
                <InfoIcon sx={{fontSize:"1.2rem"}} />
              </Grid>
            </Grid>

            <Grid item>
              Poz Tanımı
            </Grid>

            <Grid item sx={{ textAlign: "center" }}>
              Birim
            </Grid>

          </Grid>


          {
            isProject.wbs.filter(item => item.openForPoz === true).map(wbsOne => (

              <Grid
                key={wbsOne._id}
                direction="column"
                container spacing={0}
                sx={{ mt: "1rem" }}
              >

                {/* wbs başlıkları */}
                <Grid item>

                  <Grid container>

                    {/* <Grid item>
                      <TurnedInIcon
                        sx={{
                          // "&:hover": {
                          //   color: "red",
                          // },
                          color: wbsOne.includesPoz ? "darkred" : "darkred"
                        }} />
                    </Grid> */}

                    <Grid item>

                      <Box sx={{ display: "none" }}>
                        {cOunt = wbsOne.code.split(".").length}
                      </Box>

                      {
                        wbsOne.code.split(".").map((codePart, index) => {

                          // console.log(cOunt)
                          // console.log(index + 1)
                          // console.log("---")

                          if (index == 0) {
                            wbsCode = codePart
                            wbsName = isProject.wbs.find(item => item.code == wbsCode).codeName
                          }

                          if (index !== 0 && index + 1 !== cOunt) {
                            wbsCode = wbsCode + "." + codePart
                            wbsName = wbsName + " > " + isProject.wbs.find(item => item.code == wbsCode).codeName
                          }

                          if (index !== 0 && index + 1 == cOunt) {
                            wbsCode = wbsCode + "." + codePart
                            wbsName = wbsName + " > " + isProject.wbs.find(item => item.code == wbsCode).name
                          }

                        })
                      }

                      <Box sx={{ display: "none" }}>
                        {cOunt = wbsName.split(">").length}
                      </Box>

                      <Typography sx={{ fontWeight: "bold" }}>

                        {wbsName.split(">").map((item, index) => (

                          <Box key={index} component={"span"} >
                            {item}
                            {index + 1 !== cOunt &&
                              <Box component={"span"} sx={{ color: "darkred" }}>{"--"}</Box>
                            }
                          </Box>

                        ))}
                      </Typography>
                    </Grid>

                  </Grid>

                </Grid>

                <Box sx={{ display: "none" }}>
                  {cOunt = pozlar.filter(item => item._wbsId.toString() == wbsOne._id.toString()).length}
                </Box>

                {
                  pozlar?.filter(item => item._wbsId.toString() == wbsOne._id.toString()).map((item, index) => {

                    // 1 den fazla poz varsa son poz hariç
                    if (cOunt !== 1 && index + 1 !== cOunt) {
                      return (

                        <Grid key={index} sx={{ display: "grid", gridTemplateColumns: gridTemplateColumns_Poz, alignContent: "center", justifyContent: "center" }}>

                          <Grid sx={{ border: "1px solid black", borderRight: "0", borderBottom: "0", textAlign: "center" }}>
                            x
                          </Grid>

                          <Grid sx={{ border: "1px solid black" }}>
                            {item.name}
                          </Grid>

                          <Grid sx={{ border: "1px solid black", borderLeft: "0", textAlign: "center" }}>
                            {item.unit}
                          </Grid>

                        </Grid>
                      )
                    }

                    // 1 den fazla poz varsa son poz
                    if (cOunt !== 1 && index + 1 == cOunt) {
                      return (

                        <Grid key={index} sx={{ display: "grid", gridTemplateColumns: gridTemplateColumns_Poz, }}>

                          <Grid sx={{ border: "1px solid black", borderRight: "0", textAlign: "center" }}>
                            x
                          </Grid>

                          <Grid sx={{ border: "1px solid black", borderTop: "0" }}>
                            {item.name}
                          </Grid>

                          <Grid sx={{ border: "1px solid black", borderLeft: "0", borderTop: "0", textAlign: "center" }}>
                            {item.unit}
                          </Grid>

                        </Grid>
                      )
                    }

                    // 1 poz varsa
                    if (cOunt == 1) {
                      return (

                        <Grid key={index} sx={{ display: "grid", gridTemplateColumns: gridTemplateColumns_Poz, }}>

                          <Grid sx={{ border: "1px solid black", borderRight: "0", textAlign:"center"}}>
                            x
                          </Grid>

                          <Grid sx={{ border: "1px solid black" }}>
                            {item.name}
                          </Grid>

                          <Grid sx={{ border: "1px solid black", borderLeft: "0", textAlign: "center" }}>
                            {item.unit}
                          </Grid>

                        </Grid>
                      )
                    }



                  })
                }


                {/* {
                  pozlar.find(item => item._wbsId.toString() == wbsOne._id.toString()) &&
                  <Grid item marginBottom={1}>
                    <Box >
                      <DataGrid
                        rows={pozlar.filter(item => item._wbsId.toString() == wbsOne._id.toString())}
                        columns={columns}
                        getRowId={(row) => row._id.toString()}
                        hideFooter={true}
                        density="compact"
                        initialState={{
                          // pagination: {
                          //   paginationModel: {
                          //     pageSize: 5,
                          //   },
                          // },
                        }}
                        onCellClick={handleOnCellClick}
                        onRowClick={(row) => { console.log(row.id) }}
                        // pageSizeOptions={[5]}
                        // checkboxSelection
                        // disableRowSelectionOnClick
                        sx={{
                          // '.MuiDataGrid-columnHeader': {
                          //   backgroundColor: 'lightgray',
                          //   borderLeft: 1,
                          // },
                          // '.MuiDataGrid-columnHeader:last-child': {
                          //   borderRight: 1,
                          // },
                          '.MuiDataGrid-columnHeaders': {
                            backgroundColor: 'lightgray',
                            borderRight: 1,
                            display: "none"
                          },
                          // '.MuiDataGrid-columnHeaderTitle': {
                          //   fontSize: "1rem",
                          //   fontWeight: "700",
                          // },
                          "& .MuiDataGrid-cell": {
                            borderLeft: 1,
                            borderLeft: 1,
                          },
                          "& .MuiDataGrid-cell:last-child": {
                            borderRight: 1,
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                } */}


              </Grid>

            ))
          }


        </Stack>
      }

    </Grid >

  )

}


const columns = [
  {
    field: 'name',
    headerName: 'Poz Adı',
    // minWidth: "50%",
    // flex:4,
    editable: true,
  },
  {
    field: 'unit',
    headerName: 'Birim',
    // minWidth: "10%",
    // flex:1,
    editable: true,
  }
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
//   { unit: 1, name: 'Snow', firstName: 'Jon', age: 35 },
//   { unit: 2, name: 'Lannister', firstName: 'Cersei', age: 42 },
//   { unit: 3, name: 'Lannister', firstName: 'Jaime', age: 45 },
//   { unit: 4, name: 'Stark', firstName: 'Arya', age: 16 },
//   { unit: 5, name: 'Targaryen', firstName: 'Daenerys', age: null },
//   { unit: 6, name: 'Melisandre', firstName: null, age: 150 },
//   { unit: 7, name: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { unit: 8, name: 'Frances', firstName: 'Rossini', age: 36 },
//   { unit: 9, name: 'Roxie', firstName: 'Harvey', age: 65 },
// ];



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