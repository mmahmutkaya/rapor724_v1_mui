
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { StoreContext } from '../../components/store'
import { useApp } from "../../components/useApp";
import FormMahalCreate from '../../components/FormMahalCreate'
import FormMahalBilgiCreate from '../../components/FormMahalBilgiCreate'
import MahalHeader from '../../components/MahalHeader'


import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import InfoIcon from '@mui/icons-material/Info';



export default function P_Mahaller() {

  const { isProject } = useContext(StoreContext)
  const { selectedMahal, setSelectedMahal } = useContext(StoreContext)
  const { mahaller, setMahaller } = useContext(StoreContext)
  const { drawerWidth, topBarHeight, subHeaderHeight } = useContext(StoreContext)

  const [show, setShow] = useState("Main")

  const router = useRouter();
  // !isProject ? router.push('/projects') : null
  !isProject ? window.location.href = "/projects" : null

  const RealmApp = useApp();


  const mahaller_fecth = async () => {
    if (!mahaller) {
      const result = await RealmApp?.currentUser.callFunction("getProjectMahaller", ({ projectId: isProject?._id }));
      console.log("result", result)
      setMahaller(result)
    }
  }
  mahaller_fecth()


  const handleSelectMahal = (mahal) => {
    setSelectedMahal(mahal)
  }


  // aşağıda kullanılıyor
  let lbsCode = ""
  let lbsName = ""
  let cOunt = 0
  let toplam = 0
  let mahalCount

  const _3_fixed_width_rem = "6rem 35rem 5rem"
  toplam = 0
  _3_fixed_width_rem.split(" ").map(item => {
    let gecici = Number(item.replace("rem", ""))
    toplam = toplam + gecici
  })
  const total_fixed_width = toplam

  const one_bosluk_width = 2

  const one_mahal_width = 10


  /* padding - top | right | bottom | left */
  const [mahalBilgileri, setMahalBilgileri] = useState([
    // { id: 1, sira: 2, genislik: 8, padding_M: "0px 1rem 0px 0px", yatayHiza: "end", name: "Mahal Tipi", dataType: "number" },
    { id: 2, sira: 1, genislik: 10, padding_M: "0px 1rem 0px 0px", yatayHiza: "end", name: "Zemin Alanı", dataType: "string" },
    // { id: 3, sira: 3, genislik: 10, padding_M: "0px 0rem 0px 0px", yatayHiza: "center", name: "Bağımsız Bölüm", dataType: "date" },
    // { id: 3, sira: 3, genislik: 20, padding_M: "0px 0rem 0px 0px", yatayHiza: "center", name: "Bağımsız Bölüm", dataType: "date" },
  ].sort((a, b) => a.sira - b.sira))

  const total_mahals_width = mahalBilgileri.reduce(
    (accumulator, oneBilgi) => accumulator + oneBilgi.genislik,
    0
  )
  console.log("total_mahals_width", total_mahals_width)


  const mahalWidths = mahalBilgileri.reduce(
    (ilkString, oneBilgi, index) => index != mahalBilgileri.length ? ilkString + (oneBilgi.genislik + "rem ") : ilkString + (oneBilgi.genislik + "rem"),
    ""
  )
  console.log("mahalWidths", mahalWidths)


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

      {show == "FormMahalBilgiCreate" &&
        <Grid item >
          <FormMahalBilgiCreate setShow={setShow} />
        </Grid>
      }

      {show == "Main" && (isProject?.lbs?.filter(item => item.openForMahal).length == 0 || !isProject?.lbs) &&
        <Stack sx={{ width: '100%', pl: "1rem", pr: "0.5rem", pt: "1rem", mt: subHeaderHeight }} spacing={2}>
          <Alert severity="info">
            Henüz hiç bir mahal başlığını mahal eklemeye açmamış görünüyorsunumuz. "Mahal Başlıkları" menüsünden işlem yapabilirsiniz.
          </Alert>
        </Stack>
      }


      {show == "Main" && isProject?.lbs?.filter(item => item.openForMahal).length > 0 &&

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
                display: "grid",
                gridAutoFlow: "column",
                gridTemplateColumns: (total_fixed_width + one_bosluk_width) + "rem " + (total_mahals_width) + "rem",
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
                        Mahal No
                        {/* <InfoIcon sx={{}} /> */}
                      </Grid>
                    </Grid>

                    {/* _3_fixed_width_rem -- 2 */}
                    <Grid item sx={{ border: "1px solid black", borderRight: "0", padding: "0.5rem 0rem", backgroundColor: "lightgray", textAlign: "center" }}>
                      <Grid sx={{ display: "grid", height: "100%", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{}}>
                          Mahal Tanımı
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



                {/* sadece cOunt tespiti için görünmez bir componenet */}
                {/* <Box sx={{ display: "none" }}>
                  {mahalCount = mahaller.length}
                </Box> */}


                {/* yatayda uzayan en üst başlıklar - mahal isimleri */}
                {/* 2/2 - (mahal_width) */}
                <Grid item sx={{}}>

                  <Grid sx={{
                    display: "grid",
                    gridTemplateRows: "3.2rem",
                    // gridTemplateColumns: "repeat(" + mahalBilgileri.length + ", " + one_mahal_width + "rem)"
                    gridTemplateColumns: mahalWidths
                  }}>

                    {mahalBilgileri.map((oneSutun, index) => {
                      return (
                        <Grid key={index} item sx={{ border: "1px solid black", borderRight: index + 1 == mahalBilgileri.length ? null : "0", padding: "0.5rem 0.5rem", backgroundColor: "lightgray", height: "100%" }}>

                          {/* <Grid sx={{ display: "grid", height: "100%", justifyContent: "center", alignItems: "center" }}> */}
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

                {/* yatayda uzayan başlıklar - mahalBilgileri */}
                {/* 2/2 - (mahal_width) */}
                {/* <Grid item sx={{}}>
                  <Grid sx={{ display: "grid", gridTemplateRows: "3.2rem", gridTemplateColumns: "repeat(" + mahalBilgileri.length + ", " + one_mahal_width + "rem)" }}>

                    <Grid item sx={{ border: "1px solid black", padding: "0.5rem 0.5rem", backgroundColor: "lightgray",  height: "100%" }}>
                      <Grid sx={{ display: "grid" }}>
                        <Typography sx={{ maxHeight: "2.2rem", overflow: "hidden", fontSize: "0.8rem" }} >
                          {"mahalBilgileri"}
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


          {/* satır 2/2 -  lbs başlığı ve varsa altındaki mahaller  */}
          {
            isProject.lbs
              .filter(item => item.openForMahal === true)
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
              .map(lbsOne => (

                // lbs başlığını ve altında varsa mahalleri bir component içine almak için
                <Grid key={lbsOne._id.toString()} sx={{ display: "grid", pb: "1rem" }}>

                  <Grid item key={lbsOne._id.toString()}>

                    {/* Grid - lbs başlığı ve boş mahal başlığı uzantısı  */}
                    <Grid
                      sx={{
                        display: "grid",
                        gridAutoFlow: "column",
                        gridTemplateColumns: (total_fixed_width + one_bosluk_width) + "rem " + (total_mahals_width + "rem"),
                      }}
                    >

                      {/* 1/2 - (total_fixed_width + one_bosluk_width) - sabit kısım*/}
                      <Grid sx={{ position: "sticky", left: { xs: 0, md: drawerWidth + "px" } }}>

                        {/* Grid - lbs başlığı ve varsa altındaki mahaller */}
                        <Grid sx={{
                          display: "grid", gridAutoFlow: "column", gridTemplateColumns: total_fixed_width + "rem " + one_bosluk_width + "rem",
                        }}>

                          {/* 1/2 - total_fixed_width - lbs başlığı */}
                          <Grid item sx={{ backgroundColor: "#FAEBD7", border: "1px solid black" }}>

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
                          <Grid item sx={{ backgroundColor: "white", color: "white" }}>
                            .
                          </Grid>

                        </Grid>

                      </Grid>


                      {/* yatayda uzayan mahal başlık satırları */}
                      {/* 2/2 - (mahaller.length * one_mahal_width) + "rem" - mahal alanı genişliğinde dolgu boşluk*/}
                      <Grid item sx={{ display: (!mahalBilgileri.length ? "none" : null) }}>


                        <Grid sx={{
                          display: "grid",
                          gridTemplateColumns: mahalWidths,
                        }}>

                          {mahalBilgileri.map((oneBilgi, index) =>
                            <Grid item key={index} sx={{
                              border: "1px solid black",
                              borderRight: mahalBilgileri.length !== index + 1 ? 0 : null,
                              backgroundColor: "#FAEBD7",
                            }}>

                              <Grid sx={{
                                display: "grid",
                              }}>
                                <Grid item sx={{
                                  justifySelf: oneBilgi.yatayHiza,
                                  padding: oneBilgi.padding_M,
                                }}>
                                  {oneBilgi.name}
                                </Grid>

                              </Grid>

                            </Grid>
                          )}

                        </Grid>

                      </Grid>


                    </Grid>

                  </Grid>

                  {/* hayalet component - lbs başlığı altındaki mahallerin sayısını tespit etmek için */}
                  {/* < Box sx={{ display: "none" }}>
                  {cOunt = mahaller.filter(item => item._lbsId.toString() == lbsOne._id.toString()).length}
                </Box> */}

                  {
                    mahaller?.filter(item => item._lbsId.toString() == lbsOne._id.toString()).map((oneMahal, index) => (

                      <Grid item key={oneMahal._id.toString()}>

                        <Grid
                          sx={{
                            display: "grid", gridAutoFlow: "column", gridTemplateColumns: (total_fixed_width + one_bosluk_width) + "rem " + (mahalBilgileri.length * one_mahal_width) + "rem",
                          }}
                        >

                          <Grid item sx={{ position: "sticky", left: { xs: 0, md: "240px" } }}>

                            <Grid
                              key={index}
                              onClick={() => handleSelectMahal(oneMahal)}
                              sx={{
                                cursor: "pointer",
                                display: "grid", gridAutoFlow: "column", gridTemplateColumns: _3_fixed_width_rem + " " + one_bosluk_width + "rem",
                                "&:hover .hoverTheLbs": {
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
                                        {oneMahal.name}
                                      </Typography>
                                    </Grid>
                                  </Grid>

                                  <Grid item className='hoverTheLbs'
                                    sx={{
                                      ml: "0.5rem",
                                      visibility: selectedMahal?._id.toString() === oneMahal._id.toString() ? "visible" : "hidden",
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
                                    {oneMahal.birim}
                                  </Typography>
                                </Grid>
                              </Grid>

                              {/* one_bosluk_width --> boşluk*/}
                              <Grid item sx={{ backgroundColor: "white", color: "white" }}>
                                .
                              </Grid>

                            </Grid>

                          </Grid>

                          {/* yatayda uzayan mahal satırları */}
                          <Grid item sx={{ display: (!mahalBilgileri.length ? "none" : null), height: "100%" }}>

                            <Grid sx={{
                              height: "100%",
                              display: "grid", gridTemplateColumns: "repeat(" + mahalBilgileri.length + ", " + one_mahal_width + "rem)",
                            }}>

                              {/* <Box sx={{ display: "none" }}>
                              {mahalCount = mahaller.length}
                            </Box> */}

                              <Grid item onClick={() => console.log("deneme")}
                                sx={{
                                  border: "1px solid black", borderTop: "0",
                                  cursor: "pointer"
                                }}>

                                <Grid sx={{ height: "100%", display: "grid", justifyContent: "center", alignItems: "center", pr: "0.5rem" }}>
                                  <Typography sx={{ overflow: "hidden" }} >
                                    {isProject.mahalTipleri?.find(oneTip => oneTip.id === oneMahal.tip).name}
                                  </Typography>
                                </Grid>

                              </Grid>

                            </Grid>


                            {/* yatayda uzayan mahal satırları */}
                            {/* <Grid sx={{
                            height: "100%",
                            display: "grid", gridTemplateColumns: "repeat(" + mahaller.length + ", " + one_mahal_width + "rem)",
                          }}>

                            hayalet component - sadece cOunt tespiti için görünmez bir componenet
                            <Box sx={{ display: "none" }}>
                              {mahalCount = mahaller.length}
                            </Box>

                            {mahaller.map((oneMahal, index) => (
                              <Grid item key={index} onClick={() => console.log("deneme")}
                                sx={{
                                  border: "1px solid black", borderTop: "0", borderRight: (index + 1) == mahalCount ? null : "0",
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
