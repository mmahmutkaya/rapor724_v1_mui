
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { StoreContext } from '../../components/store'
import { useApp } from "../../components/useApp";
import { useQuery } from '@tanstack/react-query'
import FormMahalCreate from '../../components/FormMahalCreate'
import MahalListesiHeader from '../../components/MahalListesiHeader'

import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import InfoIcon from '@mui/icons-material/Info';



export default function P_Mahallistesi() {

  const { drawerWidth, topBarHeight } = useContext(StoreContext)

  const { isProject } = useContext(StoreContext)
  const { pozlar, setPozlar } = useContext(StoreContext)
  const { selectedMahal, setSelectedMahal } = useContext(StoreContext)

  const [show, setShow] = useState("MahalMain")

  const router = useRouter();
  // !isProject ? router.push('/projects') : null
  !isProject ? window.location.href = "/projects" : null

  const RealmApp = useApp();




  ///////////////////////////////
  const { isLoading: isLoading_Mahaller, isError: isError_Mahaller, data: mahaller, error: error_Mahaller, refetch: refetch_Mahaller } = useQuery({
    queryKey: ['mahaller'],
    // queryFn: deneme,
    queryFn: async () => await RealmApp.currentUser.callFunction("getProjectMahaller", ({ projectId: isProject?._id })),
    refetchOnWindowFocus: false,
    enabled: !!RealmApp?.currentUser,
    // staleTime: 5 * 1000, // 1000 milisecond --> 1 second
  })

  if (isLoading_Mahaller) return "Loading...";

  if (error_Mahaller) return "An error has occurred: " + error_Mahaller.message;
  ///////////////////////////////




  // ///////////////////////////////
  // const { isLoading: isLoading_Pozlar, isError: isError_Pozlar, data: pozlar, error: error_Pozlar, refetch: refetch_Pozlar } = useQuery({
  //   queryKey: ['pozlar'],
  //   // queryFn: deneme,
  //   queryFn: async () => await RealmApp.currentUser.callFunction("getProjectPozlar", ({ projectId: isProject?._id })),
  //   refetchOnWindowFocus: false,
  //   enabled: !!RealmApp?.currentUser,
  //   // staleTime: 5 * 1000, // 1000 milisecond --> 1 second
  // })

  // if (isLoading_Pozlar) return "Loading...";

  // if (error_Pozlar) return "An error has occurred: " + error_Pozlar.message;
  // ///////////////////////////////


  try {

    const pozlar_fecth = async () => {
      const result = await RealmApp?.currentUser.callFunction("getProjectPozlar", ({ projectId: isProject?._id }));
      // console.log("result", result)
      setPozlar(result)
      // setSelectedWbs(result.project.wbs.find(item => item._id.toString() === selectedWbs._id.toString()))
    }
    pozlar_fecth()


  } catch (err) {

    console.log("err", err)
    let hataMesaj_ = err?.message ? err.message : "Beklenmedik hata, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz.."

    let text1 = "__mesajBaslangic__"
    let text2 = "__mesajBitis__"
    let mesajBaslangic = hataMesaj_.includes(text1) ? hataMesaj_.indexOf(text1) + text1.length : 0
    let mesajBitis = hataMesaj_.includes(text2) ? hataMesaj_.indexOf(text2) : hataMesaj_.length

    hataMesaj_ = hataMesaj_.slice(mesajBaslangic, mesajBitis)
    console.log("hataMesaj_", hataMesaj_)

    setDialogCase("error")
    setShowDialog(hataMesaj_)

  }


  const handleSelectMahal = (mahal) => {
    setSelectedMahal(prevMahal => mahal)
  }


  // aşağıda kullanılıyor
  let lbsCode = ""
  let lbsName = ""
  let cOunt = 0
  let toplam = 0

  // const pozlar = [
  //   { id: 1, name: "kalıp yapılmasının ardındaki gerçekler" },
  //   // { id: 1, name: "kalıp yapılması" },
  //   // { id: 1, name: "kalıp" },
  //   { id: 2, name: "demir" },
  //   { id: 3, name: "beton" },
  //   { id: 4, name: "yevmiye" },
  //   // { id: 1, name: "kalıp yapılmasının ardındaki gerçekler" },
  //   // { id: 1, name: "kalıp yapılması" },
  //   // { id: 1, name: "kalıp" },
  //   { id: 2, name: "demir" },
  //   { id: 3, name: "beton" },
  //   { id: 4, name: "yevmiye" },
  //   // { id: 1, name: "kalıp yapılmasının ardındaki gerçekler" },
  //   // { id: 1, name: "kalıp yapılması" },
  //   // { id: 1, name: "kalıp" },
  //   { id: 2, name: "demir" },
  //   { id: 3, name: "beton" },
  //   { id: 4, name: "yevmiye" },
  //   { id: 2, name: "demir" },
  //   { id: 3, name: "beton" },
  //   { id: 4, name: "yevmiye" },
  // ]

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
    <Grid container direction="column" spacing={0}>

      <Grid item >
        <MahalListesiHeader setShow={setShow} />
      </Grid>

      {show == "FormMahalCreate" &&
        <Grid item >
          <FormMahalCreate isProject={isProject} setShow={setShow} />
        </Grid>
      }

      {show == "MahalMain" && (isProject?.lbs.filter(item => item.openForMahal).length == 0 || !pozlar) && (
        <Stack sx={{ mt: topBarHeight, width: '100%', padding: "1rem" }} spacing={2}>
          <Alert severity="info">
            Henüz hiç bir mahal başlığını mahal eklemeye açmamış görünüyorsunumuz. "Mahal Başlıkları" menüsünden işlem yapabilirsiniz.
          </Alert>
        </Stack>)
      }

      {show == "MahalMain" && isProject?.lbs.filter(item => item.openForMahal).length > 0 && pozlar.length > 0 &&
        <Stack sx={{ mt: topBarHeight, width: '100%' }} spacing={0}>


          <Grid sx={{
            display: "grid", gridAutoFlow: "row", gridTemplateRows: "1rem 3rem 1rem",
            position: "sticky", top: "7rem",
            zIndex: "10"
          }}>

            {/* padding yerine üstteki 1rem lik dolu alan, yoksa sticky transparan problemi */}
            <Box>

            </Box>


            {/* Grid - En üst başlık */}
            <Grid sx={{
              display: "grid", gridAutoFlow: "column", gridTemplateColumns: (total_mahal_width + one_bosluk_width) + "rem " + (pozlar.length * one_poz_width) + "rem",
            }}>


              {/* 1/2 - (total_mahal_width + one_bosluk_width)*/}
              <Grid item sx={{ position: "sticky", left: (drawerWidth) + "px" }}>
                {/* <Grid item sx={{}}> */}

                {/* total_mahal_width */}
                {/* en üst başlık */}
                <Grid sx={{
                  // position: "fixed", display: "grid", gridAutoFlow: "column", gridTemplateRows: "3.2rem", gridTemplateColumns: _3_mahal_width_rem + " " + one_bosluk_width + "rem "
                  display: "grid", gridAutoFlow: "column", gridTemplateRows: "3.2rem", gridTemplateColumns: _3_mahal_width_rem + " " + one_bosluk_width + "rem "
                }} >

                  {/* _3_mahal_width_rem -- 1 */}
                  <Grid item sx={{ border: "1px solid black", borderRight: "0", padding: "0.5rem 0rem", backgroundColor: "lightgray", width: "100%" }}>
                    <Grid sx={{ display: "grid", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                      <InfoIcon sx={{}} />
                    </Grid>
                  </Grid>

                  {/* _3_mahal_width_rem -- 2 */}
                  <Grid item sx={{ border: "1px solid black", borderRight: "0", padding: "0.5rem 0rem", backgroundColor: "lightgray", textAlign: "center", width: "100%" }}>
                    <Grid sx={{ display: "grid", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                      <Typography sx={{}}>
                        Mahal Tanımı
                      </Typography>
                    </Grid>
                  </Grid>

                  {/* _3_mahal_width_rem -- 3 */}
                  <Grid item sx={{ border: "1px solid black", padding: "0.5rem 0rem", backgroundColor: "lightgray", width: "100%" }}>
                    <Grid sx={{ display: "grid", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                      <Typography sx={{}}>
                        Birim
                      </Typography>
                    </Grid>
                  </Grid>


                  {/* one_bosluk_width */}
                  <Grid item sx={{ border: "1px solid white", padding: "0.5rem 0rem", backgroundColor: "white", color: "white", width: "100%" }}>

                  </Grid>

                </Grid>

              </Grid>



              {/* sadece cOunt tespiti için görünmez bir componenet */}
              <Box sx={{ display: "none" }}>
                {pozCount = pozlar.length}
              </Box>


              {/* poz isimleri */}
              {/* 2/2 - (poz_width) */}
              <Grid item sx={{}}>
                <Grid sx={{ display: "grid", gridTemplateRows: "3.2rem", gridTemplateColumns: "repeat(" + pozlar.length + ", " + one_poz_width + "rem)" }}>

                  {pozlar.map((onePoz, index) => {
                    return (
                      <Grid key={index} item sx={{ border: "1px solid black", borderRight: index + 1 == pozCount ? null : "0", padding: "0.5rem 0.5rem", backgroundColor: "lightgray", width: "100%", height: "100%" }}>
                        <Grid sx={{ display: "grid", width: "100%" }}>
                          <Typography sx={{ maxHeight: "2.2rem", overflow: "hidden", fontSize: "0.8rem" }} >
                            {onePoz.name}
                          </Typography>
                        </Grid>
                      </Grid>
                    )
                  })}

                </Grid>
              </Grid>

            </Grid>

            <Box>

            </Box>

          </Grid>


          {/* lbs başlığı ve altındaki mahaller */}
          {
            isProject.lbs.filter(item => item.openForMahal === true).map(lbsOne => (

              // lbs başlığını ve altında varsa mahalleri bir component içine almak için
              <Box key={lbsOne._id.toString()} sx={{ zIndex: "1", mt: "1rem" }}>

                {/* Grid - lbs başlığı ve boş mahal başlığı uzantısı  */}
                <Grid
                  key={lbsOne._id.toString()}
                  sx={{
                    display: "grid", gridAutoFlow: "column", gridTemplateColumns: (total_mahal_width + one_bosluk_width) + "rem " + (pozlar.length * one_poz_width) + "rem",
                  }}

                >

                  {/* 1/2 - (total_mahal_width + one_bosluk_width) - sabit kısım*/}
                  <Grid item sx={{ position: "sticky", left: (drawerWidth) + "px" }}>

                    {/* Grid - lbs başlığı ve varsa altındaki mahaller */}
                    <Grid sx={{
                      display: "grid", gridAutoFlow: "column", gridTemplateColumns: total_mahal_width + "rem " + one_bosluk_width + "rem "
                    }}>

                      {/* 1/2 - total_mahal_width - lbs başlığı */}
                      <Grid item sx={{ width: "100%", backgroundColor: "#FAEBD7", border: "1px solid black" }}>

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


                      {/* 2/2 - one_bosluk_width - 2rem boşluk*/}
                      <Grid item sx={{ backgroundColor: "white", color: "white", width: "100%" }}>
                        .
                      </Grid>


                    </Grid>

                  </Grid>



                  {/* 2/2 - (pozlar.length * one_poz_width) + "rem" - poz alanı genişliğinde dolgu boşluk*/}
                  <Grid item sx={{ overflow: "hidden", border: "1px solid black", backgroundColor: "#FAEBD7", color: "#FAEBD7" }}>
                    ee
                  </Grid>

                </Grid>



                {/* lbs başlığı altındaki mahaller */}
                < Box sx={{ display: "none" }}>
                  {cOunt = mahaller.filter(item => item._lbsId.toString() == lbsOne._id.toString()).length}
                </Box>

                {
                  mahaller?.filter(item => item._lbsId.toString() == lbsOne._id.toString()).map((item, index) => {

                    return (

                      <Grid
                        key={item._id.toString()}
                        sx={{
                          display: "grid", gridAutoFlow: "column", gridTemplateColumns: (total_mahal_width + one_bosluk_width) + "rem " + (pozlar.length * one_poz_width) + "rem",

                        }}

                      >

                        <Grid item sx={{ position: "sticky", left: (drawerWidth) + "px" }}>

                          <Grid key={index} onClick={() => handleSelectMahal(item)} sx={{
                            cursor: "pointer",
                            display: "grid", gridAutoFlow: "column", gridTemplateColumns: _3_mahal_width_rem + " " + one_bosluk_width + "rem",
                            "&:hover .hoverTheLbs": {
                              // display: "inline"
                              visibility: "visible"
                            },
                          }}>

                            <Grid sx={{ backgroundColor: "white", border: "1px solid black", borderRight: "0", textAlign: "center" }}>
                              <Typography>
                                xx
                              </Typography>
                            </Grid>

                            <Grid sx={{ backgroundColor: "white", border: "1px solid black", borderRight: "0" }}>

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

                            <Grid sx={{ backgroundColor: "white", border: "1px solid black", textAlign: "center" }}>
                              <Typography >
                                {item.unit}
                              </Typography>
                            </Grid>

                            {/* one_bosluk_width --> boşluk*/}
                            <Grid item sx={{ backgroundColor: "white", color: "white", width: "100%" }}>
                              .
                            </Grid>

                          </Grid>

                        </Grid>

                        <Grid item>

                          <Grid sx={{
                            display: "grid", gridTemplateColumns: "repeat(" + pozlar.length + ", " + one_poz_width + "rem)",

                          }}>

                            {/* sadece cOunt tespiti için görünmez bir componenet */}
                            <Box sx={{ display: "none" }}>
                              {pozCount = pozlar.length}
                            </Box>

                            {pozlar.map((item, index) => {
                              return (
                                <Grid key={index} sx={{ border: "1px solid black", borderTop: "0", borderRight: (index + 1) == pozCount ? null : "0", textAlign: "center" }}>
                                  <Typography sx={{ height: "1.5rem", overflow: "hidden" }} >
                                    {item.name}
                                  </Typography>
                                </Grid>
                              )
                            })}


                          </Grid>

                        </Grid>

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
