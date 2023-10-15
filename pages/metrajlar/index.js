
import * as React from 'react';
import { useState, useContext } from 'react';
import { StoreContext } from '../../components/store'
import { useApp } from "../../components/useApp";
import MetrajHeader from '../../components/MetrajHeader'
import FormMetrajCreate from '../../components/FormMetrajCreate'

import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InfoIcon from '@mui/icons-material/Info';



export default function P_Metraj() {

  const { drawerWidth, topBarHeight } = useContext(StoreContext)

  const { isProject } = useContext(StoreContext)
  const { metrajlar, setMetrajlar } = useContext(StoreContext)
  const { mahaller, setMahaller } = useContext(StoreContext)

  const [show, setShow] = useState("Main")
  const [deger, setDeger] = useState(0)

  !isProject ? window.location.href = "/projects" : null

  const RealmApp = useApp();

  const mahaller_fecth = async () => {
    if (!mahaller) {
      const result = await RealmApp?.currentUser.callFunction("getProjectMahaller", ({ projectId: isProject?._id }));
      setMahaller(result)
    }
  }
  mahaller_fecth()



  const metrajlar_fecth = async () => {
    if (!metrajlar) {
      const resultMetrajlar = await RealmApp?.currentUser.callFunction("getProjectMetrajlar", ({ projectId: isProject?._id }));
      setMetrajlar(resultMetrajlar)
      console.log("resultMetrajlar",resultMetrajlar)
    }
  }
  metrajlar_fecth()



  // const openMetraj = async ({ mahalId, pozId }) => {
  //   const openedMetraj = await RealmApp?.currentUser.callFunction("openMetraj", ({ projectId: isProject?._id, mahalId, pozId }));
  //   setMahalListesi(oldMahalListesi => [...oldMahalListesi, openedMetraj])
  // }

  // const closeMetraj = async ({ mahalId, pozId }) => {
  //   await RealmApp?.currentUser.callFunction("closeMetraj", ({ projectId: isProject?._id, mahalId, pozId }));
  //   // hata olmadı db den çıktı - o zaman çıkarıyoruz
  //   setMahalListesi(oldMahalListesi => oldMahalListesi.map(item => {
  //     if (item._mahalId.toString() === mahalId.toString() && item._pozId.toString() === pozId.toString()) {
  //       return { ...item, open: false }
  //     } else {
  //       return item
  //     }
  //   }))
  //   // setMahalListesi(oldMahalListesi => oldMahalListesi.map(item => {
  //   //   if (item._mahalId.toString() === mahalId.toString() && item._pozId.toString() === pozId.toString()) {
  //   //     return { ...item, open: false }
  //   //   } else {
  //   //     return item
  //   //   }
  //   // }))
  // }



  // metraj oluşturma fonksiyonu
  async function handleSubmit(event) {

    console.log("submit")

    event.preventDefault();

    try {
      // isError = false

      //verileri tanımlama
      const data = new FormData(event.currentTarget);
      const newValue1 = deleteLastSpace(data.get('newValue1'))

      console.log("newValue1", newValue1)

      return


      const newPoz = {
        projectId: isProject._id,
        wbsId: wbsId_for_Poz,
        newPozName,
        newPozUnit
      }

      const result = await RealmApp?.currentUser?.callFunction("createPoz", newPoz);


      // eğer gönderilen form verilerinde hata varsa db den gelen form validation mesajları form içindeki ilgili alanlarda gösterilir ve fonksiyon durdurulur
      // yukarıda da frontend kontrolü yapılmıştı
      if (result.errorFormObj) {

        const errorFormObj = result.errorFormObj

        console.log("errorFormObj", errorFormObj)

        if (errorFormObj.wbsId) {
          setError_for_wbs(true);
          setErrorText_for_wbs(errorFormObj.wbsId)
          isError = true
        }

        if (errorFormObj.newPozName) {
          setError_for_name(true);
          setErrorText_for_name(errorFormObj.newPozName)
          isError = true
        }

        if (errorFormObj.newPozUnit) {
          setError_for_unit(true);
          setErrorText_for_unit(errorFormObj.newPozUnit)
          isError = true
        }

        return
      }

      if (!result.newPoz?._id) {
        throw new Error("db den -newPoz- ve onun da -_id-  property dönmedi, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz..")
      }

      if (!result.newProject?._id) {
        throw new Error("db den -newProject- ve onun da -_id-  property dönmedi, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz..")
      }

      setMetrajlar(oldPozlar => [...oldPozlar, result.newPoz])
      setIsProject(result.newProject)
      setShow("Main")

    } catch (err) {

      console.log(err)
      let hataMesaj_ = err?.message ? err.message : "Beklenmedik hata, Rapor7/24 ile irtibata geçiniz.."

      // eğer çifte kayıt oluyorsa form içindeki poz ismi girilen yere aşağıdaki mesaj gönderilir, fonksiyon durdurulur
      if (hataMesaj_.includes("duplicate key error")) {
        setError_for_name(true);
        setErrorText_for_name("Bu poz ismi bu projede mevcut")
        console.log("Bu poz ismi bu projede mevcut")
        return
      }

      // setDialogCase("error")
      // setShowDialog(hataMesaj_)

    }

  }




  // aşağıda kullanılıyor
  let lbsCode = ""
  let lbsName = ""
  let cOunt = 0
  let toplam = 0


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


  const handleUpdate = (event) => {
    setDeger(event.target.value);
    console.log("event.target.value", event.target.value)
  };



  return (
    <Grid container direction="column" spacing={0}>

      <Grid item >
        <MetrajHeader setShow={setShow} />
      </Grid>

      {show == "FormMetrajCreate" &&
        <Grid item >
          <FormMetrajCreate setShow={setShow} />
        </Grid>
      }

      {show == "Main" && (isProject?.lbs.filter(item => item.openForMahal).length == 0) && (
        <Stack sx={{ mt: topBarHeight, width: '100%', padding: "1rem" }} spacing={2}>
          <Alert severity="info">
            Henüz hiç bir mahal başlığını mahal eklemeye açmamış görünüyorsunumuz. "Mahal Başlıkları" menüsünden işlem yapabilirsiniz.
          </Alert>
        </Stack>)
      }

      {show == "Main" && (isProject?.lbs.filter(item => item.openForMahal).length == 0) && (
        <Stack sx={{ mt: topBarHeight, width: '100%', padding: "1rem" }} spacing={2}>
          <Alert severity="info">
            Henüz hiç bir mahal başlığını mahal eklemeye açmamış görünüyorsunumuz. "Mahal Başlıkları" menüsünden işlem yapabilirsiniz.
          </Alert>
        </Stack>)
      }

      {show == "Main" && isProject?.lbs.filter(item => item.openForMahal).length > 0 && mahaller?.length > 0 &&
        <Stack sx={{ mt: topBarHeight, width: '100%', pl: "1rem" }} spacing={0}>


          {/* gridTemplateRows - baştaki ve sondaki "1rem"  padding yerine üstte ve altta dolu alan, yoksa sticky transparan problemi  */}
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
                display: "grid", gridAutoFlow: "column", gridTemplateColumns: (total_mahal_width + one_bosluk_width) + "rem " + (metrajlar?.length * one_poz_width) + "rem",

              }}>

                {/* 1/2 - (total_mahal_width + one_bosluk_width)*/}
                <Grid item sx={{ position: "sticky", left: { xs: 0, md: "240px" } }}>
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
                  {pozCount = metrajlar?.length}
                </Box>


                {/* poz isimleri */}
                {/* 2/2 - (poz_width) */}
                <Grid item sx={{}}>
                  <Grid sx={{ display: "grid", gridTemplateRows: "3.2rem", gridTemplateColumns: "repeat(" + metrajlar?.length + ", " + one_poz_width + "rem)" }}>

                    {metrajlar?.map((onePoz, index) => {
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

            </Grid>


            {/* padding yerine alttaki 1rem dolu alan, yoksa sticky transparan problemi */}
            <Box sx={{ mt: "3px", backgroundColor: "white" }}>
              .
            </Box>

          </Grid>


          {/* lbs başlığı ve altındaki mahaller */}
          {
            isProject.lbs.filter(item => item.openForMahal === true).map(lbsOne => (

              // lbs başlığını ve altında varsa mahalleri bir component içine almak için
              <Grid key={lbsOne._id.toString()} sx={{ display: "grid", pb: "1rem", width: "100%" }}>

                <Grid item key={lbsOne._id.toString()}>

                  {/* Grid - lbs başlığı ve boş mahal başlığı uzantısı  */}
                  <Grid

                    sx={{
                      display: "grid", gridAutoFlow: "column", gridTemplateColumns: (total_mahal_width + one_bosluk_width) + "rem " + (metrajlar?.length * one_poz_width) + "rem",
                      width: "100%"
                    }}

                  >

                    {/* 1/2 - (total_mahal_width + one_bosluk_width) - sabit kısım*/}
                    <Grid sx={{ position: "sticky", left: { xs: 0, md: drawerWidth + "px" } }}>

                      {/* Grid - lbs başlığı ve varsa altındaki mahaller */}
                      <Grid sx={{
                        display: "grid", gridAutoFlow: "column", gridTemplateColumns: total_mahal_width + "rem " + one_bosluk_width + "rem",

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



                    {/* 2/2 - (metrajlar.length * one_poz_width) + "rem" - poz alanı genişliğinde dolgu boşluk*/}
                    <Grid item sx={{ display: metrajlar?.length > 0 ? "block" : "none", border: "1px solid black", backgroundColor: "#FAEBD7", color: "#FAEBD7" }}>
                      ee
                    </Grid>

                  </Grid>

                </Grid>

                {/* lbs başlığı altındaki mahaller */}
                < Box sx={{ display: "none" }}>
                  {cOunt = mahaller.filter(item => item._lbsId.toString() == lbsOne._id.toString()).length}
                </Box>

                {
                  mahaller?.filter(item => item._lbsId.toString() == lbsOne._id.toString()).map((mahalOne, index) => {

                    return (

                      <Grid item key={mahalOne._id.toString()}>

                        <Grid

                          sx={{
                            display: "grid", gridAutoFlow: "column", gridTemplateColumns: (total_mahal_width + one_bosluk_width) + "rem " + (metrajlar?.length * one_poz_width) + "rem",
                          }}

                        >

                          <Grid item sx={{ position: "sticky", left: { xs: 0, md: "240px" }, width: "100%" }}>

                            <Grid key={index} sx={{
                              cursor: "pointer",
                              display: "grid", gridAutoFlow: "column", gridTemplateColumns: _3_mahal_width_rem + " " + one_bosluk_width + "rem",
                              "&:hover .hoverTheLbs": {
                                // display: "inline"
                                visibility: "visible"
                              },
                            }}>

                              <Grid sx={{ backgroundColor: "white", border: "1px solid black", borderRight: "0", borderTop: "0", textAlign: "center" }}>
                                <Typography>
                                  xx
                                </Typography>
                              </Grid>

                              <Grid sx={{ backgroundColor: "white", border: "1px solid black", borderRight: "0", borderTop: "0" }}>

                                <Grid container >

                                  <Grid item>
                                    <Typography sx={{ ml: "0.2rem" }}>
                                      {mahalOne.name}
                                    </Typography>
                                  </Grid>

                                  {/* <Grid item className='hoverTheLbs'
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
                                  </Grid> */}

                                </Grid>

                              </Grid>

                              <Grid sx={{ backgroundColor: "white", border: "1px solid black", borderTop: "0", textAlign: "center" }}>
                                <Typography >
                                  {mahalOne.unit}
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
                              display: "grid", gridTemplateColumns: "repeat(" + metrajlar?.length + ", " + one_poz_width + "rem)",
                            }}>

                              {/* sadece cOunt tespiti için görünmez bir componenet */}
                              <Box sx={{ display: "none" }}>
                                {pozCount = metrajlar?.length}
                              </Box>

                              {metrajlar?.map((pozOne, index) => {

                                return (
                                  <Grid key={index} onClick={() => openMetraj({ "mahalId": mahalOne._id, "pozId": pozOne._id })} sx={{ border: "1px solid black", borderTop: "0", borderRight: (index + 1) == pozCount ? null : "0", textAlign: "center", cursor: "pointer" }}>

                                    <Box component="form" onSubmit={handleSubmit}  >
                                      <TextField
                                        variant="standard"
                                        // value={(1234).toLocaleString()}
                                        value={deger == 0 ? "" : deger?.toLocaleString()}
                                        // onChange={handleUpdate}
                                        name="newValue1"
                                        id="newValue1"
                                        sx={{
                                          "& .MuiInputBase-input": {
                                            p: "0.1rem"
                                          }
                                        }}
                                      />
                                    </Box>

                                  </Grid>
                                )

                              })}


                            </Grid>

                          </Grid>

                        </Grid>

                      </Grid>

                    )

                  })
                }




              </Grid>

            ))
          }



        </Stack >
      }

    </Grid >

  )

}


