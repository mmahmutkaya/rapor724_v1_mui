
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



export default function P_Mahallistesi() {

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
  let toplam = 0

  const pozlar = [
    { id: 1, name: "kalıp yapılmasının ardındaki gerçekler" },
    // { id: 1, name: "kalıp yapılması" },
    // { id: 1, name: "kalıp" },
    { id: 2, name: "demir" },
    { id: 3, name: "beton" },
    { id: 4, name: "yevmiye" },
    { id: 1, name: "kalıp yapılmasının ardındaki gerçekler" },
    // { id: 1, name: "kalıp yapılması" },
    // { id: 1, name: "kalıp" },
    { id: 2, name: "demir" },
    { id: 3, name: "beton" },
    { id: 4, name: "yevmiye" },
    { id: 1, name: "kalıp yapılmasının ardındaki gerçekler" },
    // { id: 1, name: "kalıp yapılması" },
    // { id: 1, name: "kalıp" },
    { id: 2, name: "demir" },
    { id: 3, name: "beton" },
    { id: 4, name: "yevmiye" },
  ]

  let pozCount

  const _3_mahal_width_rem = "2rem 15rem 5rem"
  toplam = 0
  _3_mahal_width_rem.split(" ").map(item => {
    let gecici = Number(item.replace("rem", ""))
    toplam = toplam + gecici
  })
  const total_mahal_width = toplam

  const one_bosluk_width = 2

  const one_poz_width = 5


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


          {/* Grid - En üst başlık */}
          <Grid sx={{
            display: "grid", gridAutoFlow: "column", gridTemplateColumns: (total_mahal_width + one_bosluk_width) + "rem " + (pozlar.length * one_poz_width) + "rem",
          }}>


            {/* 1/2 - (total_mahal_width + one_bosluk_width)*/}
            <Grid item sx={{}}>

              {/* total_mahal_width */}
              {/* en üst başlık */}
              <Grid sx={{
                position: "fixed", display: "grid", gridAutoFlow: "column", gridTemplateColumns: _3_mahal_width_rem + " " + one_bosluk_width + "rem "
              }} >

                {/* _3_mahal_width_rem -- 1 */}
                <Grid item sx={{ padding: "0.5rem 0rem", backgroundColor: "lightgray", width: "100%", maxHeight: "4rem" }}>
                  <Grid sx={{ display: "grid", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                    <InfoIcon sx={{ fontSize: "1.2rem" }} />
                  </Grid>
                </Grid>

                {/* _3_mahal_width_rem -- 2 */}
                <Grid item sx={{ padding: "0.5rem 0rem", backgroundColor: "lightgray", textAlign: "center", width: "100%", maxHeight: "4rem" }}>
                  <Grid sx={{ display: "grid", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                    <Typography sx={{ fontWeight: "600" }}>
                      Mahal Tanımı
                    </Typography>
                  </Grid>
                </Grid>

                {/* _3_mahal_width_rem -- 3 */}
                <Grid item sx={{ padding: "0.5rem 0rem", backgroundColor: "lightgray", width: "100%", maxHeight: "4rem" }}>
                  <Grid sx={{ display: "grid", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                    <Typography sx={{ fontWeight: "600" }}>
                      Birim
                    </Typography>
                  </Grid>
                </Grid>


                {/* one_bosluk_width */}
                <Grid item sx={{ padding: "0.5rem 0rem", backgroundColor: "white", color: "white", width: "100%", maxHeight: "4rem" }}>
                  {/* boş */}.
                </Grid>

              </Grid>

            </Grid>



            {/* sadece cOunt tespiti için görünmez bir componenet */}
            <Box sx={{ display: "none" }}>
              {pozCount = pozlar.length}
            </Box>

            {/* 2/2 - (poz_width) */}
            <Grid item>
              <Grid sx={{ display: "grid", gridTemplateColumns: "repeat(" + pozlar.length + ", " + one_poz_width + "rem)" }}>

                {pozlar.map((item, index) => {
                  return (
                    <Grid key={index} item sx={{ border: "1px solid black", borderRight: index + 1 == pozCount ? null : "0", padding: "0.5rem 0.5rem", backgroundColor: "lightgray", width: "100%", maxHeight: "4rem" }}>
                      <Grid sx={{ overflow: "hidden", display: "grid", width: "100%", height: "100%" }}>
                        <Typography >
                          {item.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  )
                })}

              </Grid>
            </Grid>



          </Grid>

          {/* lbs başlığı ve altındaki mahaller */}
          {
            isProject.lbs.filter(item => item.openForMahal === true).map(lbsOne => (

              // lbs başlığını ve altında varsa mahalleri bir component içine almak için
              <Box key={lbsOne._id.toString()}>

                {/* Grid - lbs başlığı ve varsa altındaki mahaller */}
                <Grid
                  key={lbsOne._id.toString()}
                  container spacing={0}
                  sx={{
                    display: "grid", gridAutoFlow: "column", gridTemplateColumns: (total_mahal_width + one_bosluk_width) + "rem " + (pozlar.length * one_poz_width) + "rem",
                    fontWeight: "600", alignItems: "center", mt: "1rem"
                  }}

                >

                  {/* 1/2 - (total_mahal_width + one_bosluk_width) - sabit kısım*/}
                  <Grid item sx={{}}>

                    {/* Grid - lbs başlığı ve varsa altındaki mahaller */}
                    <Grid sx={{
                      display: "grid", gridAutoFlow: "column", gridTemplateColumns: total_mahal_width + " " + one_bosluk_width + "rem "
                    }}>

                      {/* 1/2 - total_mahal_width - lbs başlığı */}
                      <Grid item sx={{ width: total_mahal_width + "rem", backgroundColor: "#FAEBD7", border: "1px solid black" }}>

                        {/* sadece cOunt tespiti için görünmez bir componenet */}
                        <Box sx={{ display: "none" }}>
                          {cOunt = lbsOne.code.split(".").length}
                        </Box>

                        {
                          lbsOne.code.split(".").map((codePart, index) => {

                            if (index == 0 && cOunt == 1) {
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



                        {/* sadece cOunt tespiti için görünmez bir componenet */}
                        <Box sx={{ display: "none" }}>
                          {cOunt = lbsName.split(">").length}
                        </Box>

                        {/* bu seviyede tek görünür grid item bu --> lbs başlığının yazdığı yer */}
                        {lbsName.split(">").map((item, index) => (

                          <Typography key={index} component={"span"} sx={{ ml: "0.3rem", fontWeight: "normal" }} >
                            {item}
                            {index + 1 !== cOunt &&
                              <Typography component={"span"} sx={{ fontWeight: "600", color: "darkred" }}>{">"}</Typography>
                            }
                          </Typography>

                        ))}

                      </Grid>


                      {/* 2/2 - (pozlar.length * one_poz_width) - pozlar genişliğinde dolgu boşluk*/}
                      <Grid>
                        {/* boş */}
                      </Grid>


                    </Grid>

                  </Grid>



                  {/* 2/2 - one_bosluk_width - poz alanı genişliğinde dolgu boşluk*/}
                  <Grid item sx={{ border: "1px solid black", backgroundColor: "#FAEBD7", color: "#FAEBD7" }}>
                    .
                  </Grid>

                </Grid>




                {/* lbs başlığı altındaki mahaller */}
                < Box sx={{ display: "none" }}>
                  {cOunt = mahaller.filter(item => item._lbsId.toString() == lbsOne._id.toString()).length}
                </Box>

                {
                  mahaller?.filter(item => item._lbsId.toString() == lbsOne._id.toString()).map((item, index) => {

                    return (

                      <Grid key={index} onClick={() => handleSelectMahal(item)} sx={{
                        cursor: "pointer",
                        display: "grid", gridAutoFlow: "column", gridTemplateColumns: _3_mahal_width_rem + " " + one_bosluk_width + "rem " + "repeat(" + pozlar.length + ", " + one_poz_width + "rem)",
                        "&:hover .hoverTheLbs": {
                          // display: "inline"
                          visibility: "visible"
                        },
                      }}>

                        <Grid sx={{ border: "1px solid black", borderTop: "0", borderRight: "0", textAlign: "center" }}>
                          <Typography>
                            xx
                          </Typography>
                        </Grid>

                        <Grid sx={{ border: "1px solid black", borderTop: "0", borderRight: "0" }}>

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

                        <Grid sx={{ border: "1px solid black", borderTop: "0", textAlign: "center" }}>
                          <Typography >
                            {item.unit}
                          </Typography>
                        </Grid>


                        {/* one_bosluk_width --> boşluk*/}
                        <Grid>
                          {/* boş */}
                        </Grid>

                        {/* sadece cOunt tespiti için görünmez bir componenet */}
                        <Box sx={{ display: "none" }}>
                          {pozCount = pozlar.length}
                        </Box>

                        {pozlar.map((item, index) => {
                          return (
                            <Grid key={index} sx={{ border: "1px solid black", borderTop: "0", borderRight: (index + 1) == pozCount ? null : "0", textAlign: "center" }}>
                              {item.id}
                            </Grid>
                          )
                        })}

                      </Grid>
                    )

                  })
                }


              </Box>

            ))
          }



        </Stack >
      }

    </Grid >

  )

}
