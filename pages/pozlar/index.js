
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
import InfoIcon from '@mui/icons-material/Info';



export default function P_Pozlar() {

  const { isProject } = useContext(StoreContext)
  const { selectedPoz, setSelectedPoz } = useContext(StoreContext)

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


  const handleSelectPoz = (poz) => {
    setSelectedPoz(prevPoz => poz)
  }


  // aşağıda kullanılıyor
  let wbsCode = ""
  let wbsName = ""
  let cOunt = 0

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
            Henüz hiç bir poz başlığını poz eklemeye açmamış görünüyorsunumuz. "Poz Başlıkları" menüsünden işlem yapabilirsiniz.
          </Alert>
        </Stack>
      }

      {show == "PozMain" && isProject?.wbs.filter(item => item.openForPoz).length > 0 &&
        <Stack sx={{ width: '100%', padding: "1rem" }} spacing={0}>

          <Grid sx={{
            display: "grid", gridAutoFlow: "column", gridTemplateColumns: gridTemplateColumns_Poz,
            backgroundColor: "lightgray", fontWeight: "600", height: "2rem", alignItems: "center"
          }} >

            <Grid item >
              <Grid sx={{ display: "grid", justifyContent: "center", width: "100%", height: "100%" }}>
                <InfoIcon sx={{ fontSize: "1.2rem" }} />
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

                {/* poz için wbs başlıkları */}
                <Grid item sx={{ backgroundColor: "#FAEBD7", border: "1px solid black", borderBottom: wbsOne.includesPoz ? "0" : null }}>

                  <Box sx={{ display: "none" }}>
                    {cOunt = wbsOne.code.split(".").length}
                  </Box>

                  {
                    wbsOne.code.split(".").map((codePart, index) => {

                      // console.log(cOunt)
                      // console.log(index + 1)
                      // console.log("---")

                      if  (index == 0 && cOunt == 1) {
                        wbsCode = codePart
                        wbsName = isProject.wbs.find(item => item.code == wbsCode).name
                      }

                      if (index == 0 && cOunt !== 1) {
                        wbsCode = codePart
                        wbsName = isProject.wbs.find(item => item.code == wbsCode).codeName
                      }  

                      if (index !== 0 && index + 1 !== cOunt && cOunt !== 1) {
                        wbsCode = wbsCode + "." + codePart
                        wbsName = wbsName + " > " + isProject.wbs.find(item => item.code == wbsCode).codeName
                      }

                      if (index !== 0 && index + 1 == cOunt && cOunt !== 1) {
                        wbsCode = wbsCode + "." + codePart
                        wbsName = wbsName + " > " + isProject.wbs.find(item => item.code == wbsCode).name
                      }

                    })
                  }

                  <Box sx={{ display: "none" }}>
                    {cOunt = wbsName.split(">").length}
                  </Box>

                  {/* wbs başlığpın yazdığı yer */}
                  {wbsName.split(">").map((item, index) => (

                    <Typography key={index} component={"span"} sx={{ ml: "0.3rem", fontWeight: "normal" }} >
                      {item}
                      {index + 1 !== cOunt &&
                        <Typography component={"span"} sx={{ fontWeight:"600", color: "darkred" }}>{">"}</Typography>
                      }
                    </Typography>

                  ))}

                </Grid>

                <Box sx={{ display: "none" }}>
                  {cOunt = pozlar.filter(item => item._wbsId.toString() == wbsOne._id.toString()).length}
                </Box>

                {
                  pozlar?.filter(item => item._wbsId.toString() == wbsOne._id.toString()).map((item, index) => {

                    // 1 -- 1 den fazla poz varsa son poz hariç
                    if (cOunt !== 1 && index + 1 !== cOunt) {
                      return (

                        <Grid key={index} onClick={() => handleSelectPoz(item)} sx={{
                          cursor: "pointer",
                          display: "grid", gridTemplateColumns: gridTemplateColumns_Poz,
                          "&:hover .hoverTheWbs": {
                            // display: "inline"
                            visibility: "visible"
                          },
                        }}>

                          <Grid sx={{ border: "1px solid black", borderRight: "0", borderBottom: "0", textAlign: "center" }}>
                            <Typography>
                              xx
                            </Typography>
                          </Grid>

                          <Grid sx={{ border: "1px solid black" }}>

                            <Grid container >

                              <Grid item>
                                <Typography sx={{ ml: "0.2rem" }}>
                                  {item.name}
                                </Typography>
                              </Grid>

                              <Grid item className='hoverTheWbs'
                                sx={{
                                  ml: "0.5rem",
                                  visibility: selectedPoz?._id.toString() === item._id.toString() ? "visible" : "hidden",
                                }}>
                                <Grid container sx={{ alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                                  <Grid item >
                                    <Box sx={{
                                      backgroundColor: "red",
                                      borderRadius: "0.5rem",
                                      height: "0.5rem",
                                      width: "0.5rem",
                                    }}>
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Grid>

                            </Grid>

                          </Grid>

                          <Grid sx={{ border: "1px solid black", borderLeft: "0", textAlign: "center" }}>
                            <Typography >
                              {item.unit}
                            </Typography>
                          </Grid>

                        </Grid>
                      )
                    }

                    // 2 -- 1 den fazla poz varsa son poz
                    if (cOunt !== 1 && index + 1 == cOunt) {
                      return (

                        <Grid key={index} onClick={() => handleSelectPoz(item)} sx={{
                          cursor: "pointer",
                          display: "grid", gridTemplateColumns: gridTemplateColumns_Poz,
                          "&:hover .hoverTheWbs": {
                            // display: "inline"
                            visibility: "visible"
                          },
                        }}>

                          <Grid sx={{ border: "1px solid black", borderRight: "0", textAlign: "center" }}>
                            <Typography >
                              xx
                            </Typography>
                          </Grid>

                          <Grid sx={{ border: "1px solid black", borderTop: "0" }}>

                            <Grid container >

                              <Grid item>
                                <Typography component={"span"} sx={{ ml: "0.2rem" }}>
                                  {item.name}
                                </Typography>
                              </Grid>

                              <Grid item className='hoverTheWbs'
                                sx={{
                                  ml: "0.5rem",
                                  visibility: selectedPoz?._id.toString() === item._id.toString() ? "visible" : "hidden",
                                }}>
                                <Grid container sx={{ alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                                  <Grid item >
                                    <Box sx={{
                                      backgroundColor: "red",
                                      borderRadius: "0.5rem",
                                      height: "0.5rem",
                                      width: "0.5rem",
                                    }}>
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Grid>

                            </Grid>

                          </Grid>

                          <Grid sx={{ border: "1px solid black", borderLeft: "0", borderTop: "0", textAlign: "center" }}>
                            <Typography >
                              {item.unit}
                            </Typography>
                          </Grid>

                        </Grid>
                      )
                    }

                    // 3 -- 1 poz varsa
                    if (cOunt == 1) {
                      return (

                        <Grid key={index} onClick={() => handleSelectPoz(item)} sx={{
                          cursor: "pointer",
                          display: "grid", gridTemplateColumns: gridTemplateColumns_Poz,
                          "&:hover .hoverTheWbs": {
                            // display: "inline"
                            visibility: "visible"
                          },
                        }}>


                          <Grid sx={{ border: "1px solid black", borderRight: "0", textAlign: "center" }}>
                            <Typography >
                              xx
                            </Typography>
                          </Grid>

                          <Grid sx={{ border: "1px solid black" }}>

                            <Grid container >

                              <Grid >
                                <Typography sx={{ ml: "0.2rem" }}>
                                  {item.name}
                                </Typography>
                              </Grid>

                              <Grid item className='hoverTheWbs'
                                sx={{
                                  ml: "0.5rem",
                                  visibility: selectedPoz?._id.toString() === item._id.toString() ? "visible" : "hidden",
                                }}>
                                <Grid container sx={{ alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                                  <Grid item >
                                    <Box sx={{
                                      backgroundColor: "red",
                                      borderRadius: "0.5rem",
                                      height: "0.5rem",
                                      width: "0.5rem",
                                    }}>
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Grid>

                            </Grid>

                          </Grid>

                          <Grid sx={{ border: "1px solid black", borderLeft: "0", textAlign: "center" }}>
                            <Typography >
                              {item.unit}
                            </Typography>
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
