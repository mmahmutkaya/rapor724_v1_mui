
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { StoreContext } from '../../components/store'
import { useApp } from "../../components/useApp";
import { useQuery } from '@tanstack/react-query'
import FormMahalCreate from '../../components/FormMahalCreate'
import MahalHeader from '../../components/MahalHeader'

import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import InfoIcon from '@mui/icons-material/Info';



export default function P_Mahaller() {

  const { isProject } = useContext(StoreContext)
  const { selectedMahal, setSelectedMahal } = useContext(StoreContext)

  const [show, setShow] = useState("MahalMain")

  const router = useRouter();
  // !isProject ? router.push('/projects') : null
  !isProject ? window.location.href = "/projects" : null

  const RealmApp = useApp();

  const { isLoading, isError, data: mahaller, error, refetch: refetch_mahaller } = useQuery({
    queryKey: ['mahaller'],
    // queryFn: deneme,
    queryFn: async () => await RealmApp.currentUser.callFunction("getProjectMahaller", ({ projectId: isProject?._id })),
    refetchOnWindowFocus: false,
    enabled: !!RealmApp?.currentUser,
    // staleTime: 5 * 1000, // 1000 milisecond --> 1 second
  })

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;


  const handleSelectMahal = (mahal) => {
    setSelectedMahal(prevMahal => mahal)
  }


  // aşağıda kullanılıyor
  let lbsCode = ""
  let lbsName = ""
  let cOunt = 0

  const gridTemplateColumns_Mahal = "2rem 1fr 5rem"

  return (
    <Grid container direction="column" spacing={1}>

      <Grid item >
        <MahalHeader setShow={setShow} />
      </Grid>

      {show == "FormMahalCreate" &&
        <Grid item >
          <FormMahalCreate isProject={isProject} setShow={setShow} />
        </Grid>
      }

      {show == "MahalMain" && isProject?.lbs.filter(item => item.openForMahal).length == 0 &&
        <Stack sx={{ width: '100%', padding: "1rem" }} spacing={2}>
          <Alert severity="info">
            Henüz hiç bir mahal başlığını mahal eklemeye açmamış görünüyorsunumuz. "Mahal Başlıkları" menüsünden işlem yapabilirsiniz.
          </Alert>
        </Stack>
      }

      {show == "MahalMain" && isProject?.lbs.filter(item => item.openForMahal).length > 0 &&
        <Stack sx={{ width: '100%', padding: "1rem" }} spacing={0}>

          <Grid sx={{
            display: "grid", gridAutoFlow: "column", gridTemplateColumns: gridTemplateColumns_Mahal,
            backgroundColor: "lightgray", fontWeight: "600", height: "2rem", alignItems: "center"
          }} >

            <Grid item >
              <Grid sx={{ display: "grid", justifyContent: "center", width: "100%", height: "100%" }}>
                <InfoIcon sx={{ fontSize: "1.2rem" }} />
              </Grid>
            </Grid>

            <Grid item>
              Mahal Tanımı
            </Grid>

            <Grid item sx={{ textAlign: "center" }}>
              Birim
            </Grid>

          </Grid>


          {
            isProject.lbs.filter(item => item.openForMahal === true).map(lbsOne => (

              <Grid
                key={lbsOne._id}
                direction="column"
                container spacing={0}
                sx={{ mt: "1rem" }}
              >

                {/* mahal için lbs başlıkları */}
                <Grid item sx={{ backgroundColor: "#FAEBD7", border: "1px solid black", borderBottom: lbsOne.includesMahal ? "0" : null }}>

                  <Box sx={{ display: "none" }}>
                    {cOunt = lbsOne.code.split(".").length}
                  </Box>

                  {
                    lbsOne.code.split(".").map((codePart, index) => {

                      // console.log(cOunt)
                      // console.log(index + 1)
                      // console.log("---")

                      if  (index == 0 && cOunt == 1) {
                        lbsCode = codePart
                        lbsName = isProject.lbs.find(item => item.code == lbsCode).name
                      }

                      if (index == 0 && cOunt !== 1) {
                        lbsCode = codePart
                        lbsName = isProject.lbs.find(item => item.code == lbsCode).codeName
                      }  

                      if (index !== 0 && index + 1 !== cOunt && cOunt !== 1) {
                        lbsCode = lbsCode + "." + codePart
                        lbsName = lbsName + " > " + isProject.lbs.find(item => item.code == lbsCode).codeName
                      }

                      if (index !== 0 && index + 1 == cOunt && cOunt !== 1) {
                        lbsCode = lbsCode + "." + codePart
                        lbsName = lbsName + " > " + isProject.lbs.find(item => item.code == lbsCode).name
                      }

                    })
                  }

                  <Box sx={{ display: "none" }}>
                    {cOunt = lbsName.split(">").length}
                  </Box>

                  {/* lbs başlığpın yazdığı yer */}
                  {lbsName.split(">").map((item, index) => (

                    <Typography key={index} component={"span"} sx={{ ml: "0.3rem", fontWeight: "normal" }} >
                      {item}
                      {index + 1 !== cOunt &&
                        <Typography component={"span"} sx={{ fontWeight:"600", color: "darkred" }}>{">"}</Typography>
                      }
                    </Typography>

                  ))}

                </Grid>

                <Box sx={{ display: "none" }}>
                  {cOunt = mahaller.filter(item => item._lbsId.toString() == lbsOne._id.toString()).length}
                </Box>

                {
                  mahaller?.filter(item => item._lbsId.toString() == lbsOne._id.toString()).map((item, index) => {

                    // 1 -- 1 den fazla mahal varsa son mahal hariç
                    if (cOunt !== 1 && index + 1 !== cOunt) {
                      return (

                        <Grid key={index} onClick={() => handleSelectMahal(item)} sx={{
                          cursor: "pointer",
                          display: "grid", gridTemplateColumns: gridTemplateColumns_Mahal,
                          "&:hover .hoverTheLbs": {
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

                              <Grid item className='hoverTheLbs'
                                sx={{
                                  ml: "0.5rem",
                                  visibility: selectedMahal?._id.toString() === item._id.toString() ? "visible" : "hidden",
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

                    // 2 -- 1 den fazla mahal varsa son mahal
                    if (cOunt !== 1 && index + 1 == cOunt) {
                      return (

                        <Grid key={index} onClick={() => handleSelectMahal(item)} sx={{
                          cursor: "pointer",
                          display: "grid", gridTemplateColumns: gridTemplateColumns_Mahal,
                          "&:hover .hoverTheLbs": {
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

                              <Grid item className='hoverTheLbs'
                                sx={{
                                  ml: "0.5rem",
                                  visibility: selectedMahal?._id.toString() === item._id.toString() ? "visible" : "hidden",
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

                    // 3 -- 1 mahal varsa
                    if (cOunt == 1) {
                      return (

                        <Grid key={index} onClick={() => handleSelectMahal(item)} sx={{
                          cursor: "pointer",
                          display: "grid", gridTemplateColumns: gridTemplateColumns_Mahal,
                          "&:hover .hoverTheLbs": {
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

                              <Grid item className='hoverTheLbs'
                                sx={{
                                  ml: "0.5rem",
                                  visibility: selectedMahal?._id.toString() === item._id.toString() ? "visible" : "hidden",
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
                  mahaller.find(item => item._lbsId.toString() == lbsOne._id.toString()) &&
                  <Grid item marginBottom={1}>
                    <Box >
                      <DataGrid
                        rows={mahaller.filter(item => item._lbsId.toString() == lbsOne._id.toString())}
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
