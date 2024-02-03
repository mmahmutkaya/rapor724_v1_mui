
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
  const { pozlar, setPozlar } = useContext(StoreContext)
  const { drawerWidth, topBarHeight } = useContext(StoreContext)

  const [show, setShow] = useState("Main")

  const router = useRouter();
  // !isProject ? router.push('/projects') : null
  !isProject ? window.location.href = "/projects" : null

  const RealmApp = useApp();


  const pozlar_fecth = async () => {
    if (!pozlar) {
      const result = await RealmApp?.currentUser.callFunction("getProjectPozlar", ({ projectId: isProject?._id }));
      setPozlar(result)
    }
  }
  pozlar_fecth()


  const handleSelectPoz = (poz) => {
    setSelectedPoz(poz)
  }


  // aşağıda kullanılıyor
  let wbsCode = ""
  let wbsName = ""
  let cOunt = 0
  let toplam = 0
  let pozCount

  const _3_fixed_width_rem = "2rem 25rem 5rem"
  toplam = 0
  _3_fixed_width_rem.split(" ").map(item => {
    let gecici = Number(item.replace("rem", ""))
    toplam = toplam + gecici
  })
  const total_fixed_width = toplam

  const one_bosluk_width = 2

  const one_poz_width = 20

  const sutunlar = [
    { name: "Metraj Tipi" }
  ]


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

      {show == "Main" && isProject?.wbs.filter(item => item.openForPoz).length == 0 &&
        <Stack sx={{ width: '100%', padding: "1rem" }} spacing={2}>
          <Alert severity="info">
            Henüz hiç bir poz başlığını poz eklemeye açmamış görünüyorsunumuz. "Poz Başlıkları" menüsünden işlem yapabilirsiniz.
          </Alert>
        </Stack>
      }

      {show == "Main" && isProject?.wbs.filter(item => item.openForPoz).length > 0 &&

        <Stack sx={{ mt: topBarHeight, pl: "1rem" }} spacing={0}>

          {/* bu sayfa satırlardan oluşmakta  */}

          {/* satır 1/2 -  gri başlık */}
          {/* gridTemplateRows: "1rem 3rem 1rem" - baştaki ve sondaki "1rem"  padding yerine üstte ve altta dolu alan, yoksa sticky transparan problemi  */}
          <Grid sx={{
            display: "grid", gridTemplateRows: "1rem 3rem 1rem",
            position: "sticky", top: "7rem",
            zIndex: "10",
            backgroundColor: "white",
          }}>

            {/* padding yerine üstteki 1rem lik dolu alan, yoksa sticky transparan problemi */}
            <Box sx={{ backgroundColor: "white" }}>

            </Box>

            <Grid item sx={{}}>
              {/* Grid - En üst başlık */}
              <Grid sx={{
                display: "grid", gridAutoFlow: "column", gridTemplateColumns: (total_fixed_width + one_bosluk_width) + "rem " + ((sutunlar.length * one_poz_width) + "rem"),
              }}>

                {/* 1/2 - (total_fixed_width + one_bosluk_width)*/}
                <Grid item sx={{ position: "sticky", left: { xs: 0, md: "240px" } }}>
                  {/* <Grid item sx={{}}> */}

                  {/* total_fixed_width */}
                  {/* en üst başlık */}
                  <Grid sx={{
                    // position: "fixed", display: "grid", gridAutoFlow: "column", gridTemplateRows: "3.2rem", gridTemplateColumns: _3_fixed_width_rem + " " + one_bosluk_width + "rem "
                    display: "grid", gridAutoFlow: "column", gridTemplateRows: "3.2rem", gridTemplateColumns: _3_fixed_width_rem + " " + one_bosluk_width + "rem "
                  }} >

                    {/* _3_fixed_width_rem -- 1 */}
                    <Grid item sx={{ border: "1px solid black", borderRight: "0", padding: "0.5rem 0rem", backgroundColor: "lightgray" }}>
                      <Grid sx={{ display: "grid", height: "100%", justifyContent: "center", alignItems: "center" }}>
                        <InfoIcon sx={{}} />
                      </Grid>
                    </Grid>

                    {/* _3_fixed_width_rem -- 2 */}
                    <Grid item sx={{ border: "1px solid black", borderRight: "0", padding: "0.5rem 0rem", backgroundColor: "lightgray", textAlign: "center" }}>
                      <Grid sx={{ display: "grid", height: "100%", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{}}>
                          Poz Tanımı
                        </Typography>
                      </Grid>
                    </Grid>

                    {/* _3_fixed_width_rem -- 3 */}
                    <Grid item sx={{ border: "1px solid black", padding: "0.5rem 0rem", backgroundColor: "lightgray" }}>
                      <Grid sx={{ display: "grid", height: "100%", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{}}>
                          Birim
                        </Typography>
                      </Grid>
                    </Grid>


                    {/* one_bosluk_width */}
                    <Grid item sx={{ border: "1px solid white", padding: "0.5rem 0rem", backgroundColor: "white", color: "white" }}>
                      
                    </Grid>

                  </Grid>

                </Grid>



                {/* yatayda uzayan en üst başlıklar - poz isimleri */}
                {/* 2/2 - (poz_width) */}
                <Grid item sx={{}}>
                  <Grid sx={{ display: "grid", gridTemplateRows: "3.2rem", gridTemplateColumns: "repeat(" + sutunlar.length + ", " + one_poz_width + "rem)" }}>

                    {sutunlar.map((oneSutun, index) => {
                      return (
                        <Grid key={index} item sx={{ border: "1px solid black", borderRight: index + 1 == sutunlar.length ? null : "0", padding: "0.5rem 0.5rem", backgroundColor: "lightgray", height: "100%" }}>

                          <Grid sx={{ display: "grid", height: "100%", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{}}>
                              {oneSutun.name}
                            </Typography>
                          </Grid>

                          {/* <Grid sx={{ display: "grid" }}>
                            <Typography sx={{ maxHeight: "2.2rem", overflow: "hidden", fontSize: "0.8rem" }} >
                              {oneSutun.name}
                            </Typography>
                          </Grid> */}

                        </Grid>
                      )
                    })}

                  </Grid>
                </Grid>

                {/* yatayda uzayan başlıklar - sutunlar */}
                {/* 2/2 - (poz_width) */}
                {/* <Grid item sx={{}}>
                  <Grid sx={{ display: "grid", gridTemplateRows: "3.2rem", gridTemplateColumns: "repeat(" + sutunlar.length + ", " + one_poz_width + "rem)" }}>

                    <Grid item sx={{ border: "1px solid black", padding: "0.5rem 0.5rem", backgroundColor: "lightgray",  height: "100%" }}>
                      <Grid sx={{ display: "grid" }}>
                        <Typography sx={{ maxHeight: "2.2rem", overflow: "hidden", fontSize: "0.8rem" }} >
                          {"sutunlar"}
                        </Typography>
                      </Grid>
                    </Grid>

                  </Grid>
                </Grid> */}

              </Grid>

            </Grid>


            {/* padding yerine alttaki 1rem dolu alan, yoksa sticky transparan problemi */}
            <Box sx={{ mt: "3px", backgroundColor: "white" }}>
              .
            </Box>

          </Grid>


          {/* satır 2/2 -  wbs başlığı ve varsa altındaki pozlar  */}
          {
            isProject.wbs
              .filter(item => item.openForPoz === true)
              .sort(function (a, b) {
                var nums1 = a.code.split(".");
                var nums2 = b.code.split(".");

                for (var i = 0; i < nums1.length; i++) {
                  if (nums2[i]) { // assuming 5..2 is invalid
                    if (nums1[i] !== nums2[i]) {
                      return nums1[i] - nums2[i];
                    } // else continue
                  } else {
                    return 1; // no second number in b
                  }
                }
                return -1; // was missing case b.len > a.len
              })
              .map(wbsOne => (

                // wbs başlığını ve altında varsa pozları bir component içine almak için
                <Grid key={wbsOne._id.toString()} sx={{ display: "grid", pb: "1rem" }}>

                  <Grid item key={wbsOne._id.toString()}>

                    {/* Grid - wbs başlığı ve boş poz başlığı uzantısı  */}
                    <Grid

                      sx={{
                        display: "grid",
                        gridAutoFlow: "column",
                        gridTemplateColumns: (total_fixed_width + one_bosluk_width) + "rem " + (sutunlar.length * one_poz_width) + "rem",
                      }}

                    >

                      {/* 1/2 - (total_fixed_width + one_bosluk_width) - sabit kısım*/}
                      <Grid sx={{ position: "sticky", left: { xs: 0, md: drawerWidth + "px" } }}>

                        {/* Grid - wbs başlığı ve varsa altındaki pozlar */}
                        <Grid sx={{
                          display: "grid", gridAutoFlow: "column", gridTemplateColumns: total_fixed_width + "rem " + one_bosluk_width + "rem",
                        }}>

                          {/* 1/2 - total_fixed_width - wbs başlığı */}
                          <Grid item sx={{ backgroundColor: "#FAEBD7", border: "1px solid black" }}>

                            {/* sadece cOunt tespiti için görünmez bir componenet */}
                            <Box sx={{ display: "none" }}>
                              {cOunt = wbsOne.code.split(".").length}
                            </Box>

                            {
                              wbsOne.code.split(".").map((codePart, index) => {

                                if (index == 0 && cOunt == 1) {
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


                            {/* sadece cOunt tespiti için görünmez bir componenet */}
                            <Box sx={{ display: "none" }}>
                              {cOunt = wbsName.split(">").length}
                            </Box>

                            {/* bu seviyede tek görünür grid item bu --> wbs başlığının yazdığı yer */}
                            {wbsName.split(">").map((item, index) => (

                              <Typography key={index} component={"span"} sx={{ ml: "0.3rem", fontWeight: "normal" }} >
                                {item}
                                {index + 1 !== cOunt &&
                                  <Typography component={"span"} sx={{ fontWeight: "600", color: "darkred" }}>{">"}</Typography>
                                }
                              </Typography>

                            ))}

                          </Grid>


                          {/* 2/2 - one_bosluk_width - 2rem boşluk*/}
                          <Grid item sx={{ backgroundColor: "white", color: "white" }}>
                            .
                          </Grid>


                        </Grid>

                      </Grid>



                      {/* yatayda uzayan poz başlık satırları */}
                      {/* 2/2 - (pozlar.length * one_poz_width) + "rem" - poz alanı genişliğinde dolgu boşluk*/}
                      <Grid item sx={{ display: (!sutunlar.length ? "none" : null), border: "1px solid black", backgroundColor: "#FAEBD7", color: "#FAEBD7" }}>
                        .
                      </Grid>

                    </Grid>

                  </Grid>

                  {/* {console.log("pozlar",pozlar)} */}
                  {
                    pozlar?.filter(item => item._wbsId.toString() == wbsOne._id.toString()).map((onePoz, index) => (

                      <Grid item key={onePoz._id.toString()}>

                        <Grid
                          sx={{
                            display: "grid", gridAutoFlow: "column", gridTemplateColumns: (total_fixed_width + one_bosluk_width) + "rem " + (sutunlar.length * one_poz_width) + "rem",
                          }}
                        >

                          <Grid item sx={{ position: "sticky", left: { xs: 0, md: "240px" } }}>

                            <Grid
                              key={index}
                              onClick={() => handleSelectPoz(onePoz)}
                              sx={{
                                cursor: "pointer",
                                display: "grid", gridAutoFlow: "column", gridTemplateColumns: _3_fixed_width_rem + " " + one_bosluk_width + "rem",
                                "&:hover .hoverTheWbs": {
                                  // display: "inline"
                                  visibility: "visible"
                                },
                              }}>


                              <Grid item sx={{ backgroundColor: "white", border: "1px solid black", borderRight: "0", borderTop: "0", textAlign: "center" }}>
                                <Grid sx={{ height: "100%", display: "grid", justifyContent: "center", alignItems: "center" }}>
                                  <Typography sx={{ overflow: "hidden" }} >
                                    xx
                                  </Typography>
                                </Grid>
                              </Grid>


                              <Grid item sx={{ backgroundColor: "white", border: "1px solid black", borderRight: "0", borderTop: "0" }}>

                                <Grid sx={{ display: "grid", gridTemplateColumns: "1fr 2rem" }}>

                                  <Grid item>
                                    <Grid sx={{ height: "100%", display: "grid", justifyContent: "left", alignItems: "center", p: "0.1rem 0.5rem" }}>
                                      <Typography sx={{ overflow: "hidden" }} >
                                        {onePoz.name}
                                      </Typography>
                                    </Grid>
                                  </Grid>

                                  <Grid item className='hoverTheWbs'
                                    sx={{
                                      ml: "0.5rem",
                                      visibility: selectedPoz?._id.toString() === onePoz._id.toString() ? "visible" : "hidden",
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

                              <Grid item sx={{ backgroundColor: "white", border: "1px solid black", borderTop: "0", textAlign: "center" }}>
                                <Grid sx={{ height: "100%", display: "grid", justifyContent: "center", alignItems: "center" }}>
                                  <Typography sx={{ overflow: "hidden" }} >
                                    {/* {console.log("pozBirimleri", isProject.pozBirimleri)} */}
                                    {/* {console.log("onePoz", onePoz)} */}
                                    {isProject.pozBirimleri.find(oneTip => oneTip.id === onePoz.birimId).name}
                                    {/* bbb */}
                                  </Typography>
                                </Grid>
                              </Grid>

                              {/* one_bosluk_width --> boşluk*/}
                              <Grid item sx={{ backgroundColor: "white", color: "white" }}>
                                .
                              </Grid>

                            </Grid>

                          </Grid>

                          {/* yatayda uzayan poz satırları */}
                          <Grid item sx={{ display: (!sutunlar.length ? "none" : null), height: "100%" }}>


                            <Grid sx={{
                              height: "100%",
                              display: "grid", gridTemplateColumns: "repeat(" + sutunlar.length + ", " + one_poz_width + "rem)",
                            }}>

                              {/* <Box sx={{ display: "none" }}>
                              {pozCount = pozlar.length}
                            </Box> */}

                              <Grid item onClick={() => console.log("deneme")}
                                sx={{
                                  border: "1px solid black", borderTop: "0",
                                  cursor: "pointer"
                                }}>

                                <Grid sx={{ height: "100%", display: "grid", justifyContent: "center", alignItems: "center", pr: "0.5rem" }}>
                                  <Typography sx={{ overflow: "hidden" }} >
                                    {isProject.pozMetrajTipleri.find(oneTip => oneTip.id === onePoz.metrajTipId).name}
                                  </Typography>
                                </Grid>

                              </Grid>


                            </Grid>


                            {/* yatayda uzayan poz satırları */}
                            {/* <Grid sx={{
                            height: "100%",
                            display: "grid", gridTemplateColumns: "repeat(" + pozlar.length + ", " + one_poz_width + "rem)",
                          }}>

                            hayalet component - sadece cOunt tespiti için görünmez bir componenet
                            <Box sx={{ display: "none" }}>
                              {pozCount = pozlar.length}
                            </Box>

                            {pozlar.map((onePoz, index) => (
                              <Grid item key={index} onClick={() => console.log("deneme")}
                                sx={{
                                  border: "1px solid black", borderTop: "0", borderRight: (index + 1) == pozCount ? null : "0",
                                  // textAlign: "center",
                                  cursor: "pointer"
                                }}>

                                <Grid sx={{ height: "100%", display: "grid", justifyContent: "end", alignItems: "center", pr: "0.5rem" }}>
                                  <Typography sx={{ overflow: "hidden" }} >
                                    1.00
                                  </Typography>
                                </Grid>

                              </Grid>
                            ))}


                          </Grid> */}

                          </Grid>

                        </Grid>

                      </Grid>

                    ))
                  }

                </Grid>

              ))
          }



        </Stack >}

    </Grid >

  )

}
