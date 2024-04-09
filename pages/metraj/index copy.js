
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { StoreContext } from '../../components/store'
import { useApp } from "../../components/useApp";
import FormMahalCreate from '../../components/FormMahalCreate'
import FormMetrajUpdate from '../../components/FormMetrajUpdate'
import MetrajHeader from '../../components/MetrajHeader'


import { styled } from '@mui/system';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Button, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import InfoIcon from '@mui/icons-material/Info';



export default function P_Metraj() {

  const { isProject, setIsProject } = useContext(StoreContext)
  const { selectedMahal, setSelectedMahal } = useContext(StoreContext)
  const { myTema, setMyTema } = useContext(StoreContext)
  const { selectedMahalBaslik, setSelectedMahalBaslik } = useContext(StoreContext)
  const { mahaller, setMahaller } = useContext(StoreContext)
  const { pozMetrajlar, setPozMetrajlar } = useContext(StoreContext)
  const { mahalListesi, setMahalListesi } = useContext(StoreContext)
  const { pozlar, setPozlar } = useContext(StoreContext)
  const { drawerWidth, topBarHeight, subHeaderHeight } = useContext(StoreContext)

  const [show, setShow] = useState("Main")
  const [editMode_Metraj, setEditMode_Metraj] = useState(false)
  const [_pozId, set_pozId] = useState()
  const [mahalBilgiler_willBeSaved, setMahalBilgiler_willBeSaved] = useState([])
  const [autoFocus, setAutoFocus] = useState({ baslikId: null, mahalId: null })



  // https://palettes.shecodes.io/palettes/1312#palette



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



  const mahalListesi_fecth = async () => {
    if (!mahalListesi) {
      const result = await RealmApp?.currentUser.callFunction("getMahalListesi", ({ projectId: isProject?._id }));
      setMahalListesi(result)
    }
  }
  mahalListesi_fecth()


  const pozMetrajlar_fecth = async () => {
    if (!pozMetrajlar) {
      const result = await RealmApp?.currentUser.callFunction("getPozMetrajlar", ({ _projectId: isProject?._id }));
      setPozMetrajlar(result)
      console.log("pozMetrajlar", result)
    }
  }
  pozMetrajlar_fecth()


  const handleSelectMahal = (mahal) => {
    setSelectedMahal(mahal)
    setSelectedMahalBaslik(false)
  }


  // aşağıda kullanılıyor
  let wbsCode = ""
  let wbsName = ""
  let oneMetraj_
  let cOunt = 0
  let count_
  let toplam
  let g_altBaslik


  let totalWidthSabit = isProject?.pozBasliklari?.filter(item => item.sabit).reduce(
    (accumulator, oneBilgi) => accumulator + oneBilgi.genislik,
    0
  ) + 'rem'


  let gridTemplateColumnsSabit = isProject?.pozBasliklari?.filter(item => item.sabit).reduce(
    (ilkString, oneBilgi, index) => index != isProject?.mahalBasliklari?.length ? ilkString + (oneBilgi.genislik + "rem ") : ilkString + (oneBilgi.genislik + "rem"),
    ""
  )

  let totalWidthDegisken = isProject?.metrajBasliklari?.filter(item => !item.sabit && item.goster).reduce(
    (accumulator, oneBilgi) => accumulator + oneBilgi.genislik,
    0
  ) + 'rem'

  let gridTemplateColumnsDegisken = isProject?.metrajBasliklari?.filter(item => !item.sabit && item.goster).reduce(
    (ilkString, item, index) => index != isProject?.mahalBasliklari?.length ? ilkString + (item.genislik + "rem ") : ilkString + (item.genislik + "rem"),
    ""
  )

  let totalWidth = (parseFloat(totalWidthSabit) + 1 + parseFloat(totalWidthDegisken)) + 'rem'
  let gridTemplateColumns_ = gridTemplateColumnsSabit + " 1rem " + gridTemplateColumnsDegisken



  const TableHeader = styled('div')(({ index }) => ({
    marginTop: "1rem",
    // backgroundColor: "rgba(242, 203, 150, 1)",
    // backgroundColor: "rgba(150, 236, 242 , 0.8 )",
    backgroundColor: "rgba( 56,56,56 , 0.3 )",
    borderLeft: (index && index !== 0) ? null : "solid black 1px",
    borderRight: "solid black 1px",
    borderTop: "solid black 1px",
    borderBottom: "solid black 1px"
  }));

  const TableItem = styled('div')(({ index }) => ({
    borderLeft: index == 0 ? "solid black 1px" : null,
    borderRight: "solid black 1px",
    borderBottom: "solid black 1px"
  }));

  const Bosluk = styled('div')(() => ({
    // backgroundColor: "lightblue"
    // borderLeft: index == 0 ? "solid black 1px" : null,
    // borderRight: "solid black 1px",
    // borderBottom: "solid black 1px"
  }));


  const handle_selectBaslik = (oneBaslik) => {
    setSelectedMahalBaslik(oneBaslik)
    setSelectedMahal()
  }




  // bir string değerinin numerik olup olmadığının kontrolü
  function isNumeric(str) {
    if (str) {
      str.toString()
    }
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }



  const saveMahal = async () => {
    // setMahalBilgiler_willBeSaved([])
    const result = await RealmApp?.currentUser.callFunction("updateMahalBilgiler", { _projectId: isProject?._id, mahalBilgiler_willBeSaved });
    setSelectedMahalBaslik(false)
  }

  const data = {
    type: "current",
    row1: {
      desc1: "KISA",
      desc2: "UZUN"
    }
  }



  const updateMetraj = async ({ _pozId }) => {

    const result = await RealmApp?.currentUser.callFunction("updateMetraj", { _projectId: isProject?._id, _pozId });
    return (
      console.log("result", { _projectId: isProject?._id, _pozId, data })
    )
  }


  return (

    <>

      <Grid item >
        <MetrajHeader show={show} setShow={setShow} editMode_Metraj={editMode_Metraj} setEditMode_Metraj={setEditMode_Metraj} saveMahal={saveMahal} />
      </Grid>

      {show == "FormMahalCreate" &&
        <Grid item >
          <FormMahalCreate isProject={isProject} setShow={setShow} />
        </Grid>
      }

      {show == "FormMetrajUpdate" &&
        <Box sx={{ mt: subHeaderHeight }} >
          <FormMetrajUpdate setShow={setShow} _pozId={_pozId} />
        </Box>
      }

      {show == "Main" && (isProject?.wbs?.filter(item => item.openForPoz).length == 0 || !isProject?.wbs) &&
        <Stack sx={{ width: '100%', pl: "1rem", pr: "0.5rem", pt: "1rem", mt: subHeaderHeight }} spacing={2}>
          <Alert severity="info">
            Henüz hiç bir poz başlığını poz eklemeye açmamış görünüyorsunumuz. "Poz Başlıkları" menüsünden işlem yapabilirsiniz.
          </Alert>
        </Stack>
      }

      {show == "Main" && isProject?.wbs?.filter(item => item.openForPoz).length > 0 &&

        <Box sx={{ mt: subHeaderHeight, pt: "1rem", pl: "1rem", pr: "1rem" }}>

          {/* EN ÜST BAŞLIK ÜST SATIRI */}
          <Grid
            sx={{
              // pb: "1rem",
              display: "grid",
              gridTemplateColumns: gridTemplateColumns_
            }}
          >
            {/* SOL KISIM SABİT EN ÜST MAHAL BAŞLIKLARI */}
            {/* HAYALET */}
            <Box sx={{ display: "none" }}>
              {count_ = isProject?.mahalBasliklari?.filter(item => item.sabit).length}
            </Box>
            {isProject?.pozBasliklari?.filter(item => item.sabit).map((oneBaslik, index) => {
              return (
                <Box
                  sx={{
                    cursor: "pointer",
                    backgroundColor: "rgba( 56,56,56 , 0.9 )",
                    color: "white",
                    fontWeight: "bold",
                    border: "solid black 1px",
                    borderRight: index + 1 == count_ ? "solid black 1px" : "0px",
                    width: "100%",
                    display: "grid",
                    alignItems: "center",
                    justifyContent: oneBaslik.yatayHiza,
                    minHeight: "2rem"
                  }}
                  onClick={() => handle_selectBaslik(oneBaslik)}
                  key={index}
                >
                  {oneBaslik.name}
                </Box>
              )
            })}


            <Bosluk>
            </Bosluk>


            {/* SAĞ KISIM DEĞİŞKEN EN ÜST POZ BAŞLIKLARI */}
            {/* HAYALET KOMPONENT */}
            <Box sx={{ display: "none" }}>
              {count_ = pozlar?.length}
            </Box>
            {/* GÖZÜKEN KOMPONENT */}
            {isProject?.metrajBasliklari?.filter(item => !item.sabit && item.goster).map((oneBaslik, index) => {
              return (
                <Box
                  sx={{
                    cursor: "pointer",
                    // backgroundColor: editMode_Metraj ? "rgb( 110, 16, 16 , 1)" : "rgba( 56,56,56 , 0.9 )",
                    backgroundColor: "rgba( 56,56,56 , 0.9 )",
                    color: "white",
                    fontWeight: "bold",
                    border: "solid black 1px",
                    borderRight: index + 1 == count_ ? "solid black 1px" : "0px",
                    width: "100%",
                    display: "grid",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  onClick={() => handle_selectBaslik(oneBaslik)}
                  key={index}
                >
                  {/* <Box sx={{ display: "grid", justifyContent: "center" }}>
                    {index}
                  </Box> */}

                  <Box sx={{ display: "grid", justifyContent: "center" }}>
                    {oneBaslik.name}
                  </Box>

                </Box>
              )
            })}

          </Grid>


          {/* SOL KISIMDAKİ SABİT KISIMDAKİ MAHAL BAŞLIKLARI ve SAĞ DEĞİŞKEN KISIMDA DEVAM EDEN BOŞ BAŞLIK HÜCRELERİ */}
          {/* SOL KISIMDAKİ SABİT KISIMDAKİ MAHAL BAŞLIĞI ALTINDAKİ MAHALLER ve SAĞ DEĞİŞKEN KISIMDA DEVAM EDEN BOŞ BAŞLIK HÜCRELERİ ALTINDA POZ HÜCRELERİ*/}
          {isProject?.wbs
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
            }).map((oneWbs, index) => {
              return (
                <Grid
                  key={index}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: totalWidthSabit + " 1rem " + gridTemplateColumnsDegisken,
                  }}
                >
                  {/* SOL TARAF - SABİT MAHAL BAŞLIĞI */}
                  <TableHeader>

                    {/* HAYALET */}
                    <Box sx={{ display: "none" }}>
                      {cOunt = oneWbs.code.split(".").length}
                    </Box>

                    {
                      oneWbs.code.split(".").map((codePart, index) => {

                        if (index == 0 && cOunt == 1) {
                          wbsCode = codePart
                          wbsName = isProject?.wbs.find(item => item.code == wbsCode).name
                        }

                        if (index == 0 && cOunt !== 1) {
                          wbsCode = codePart
                          wbsName = isProject?.wbs.find(item => item.code == wbsCode).codeName
                        }

                        if (index !== 0 && index + 1 !== cOunt && cOunt !== 1) {
                          wbsCode = wbsCode + "." + codePart
                          wbsName = wbsName + " > " + isProject?.wbs.find(item => item.code == wbsCode).codeName
                        }

                        if (index !== 0 && index + 1 == cOunt && cOunt !== 1) {
                          wbsCode = wbsCode + "." + codePart
                          wbsName = wbsName + " > " + isProject?.wbs.find(item => item.code == wbsCode).name
                        }

                      })
                    }


                    {/* HAYALET */}
                    <Box sx={{ display: "none" }}>
                      {cOunt = wbsName.split(">").length}
                    </Box>

                    {/* GÖZÜKEN KOMPONENET - sabit kısımda - wbs başlığının yazdığı yer */}
                    {wbsName.split(">").map((item, index) => (

                      <Typography key={index} component={"span"} >
                        {item}
                        {index + 1 !== cOunt &&
                          <Typography component={"span"} sx={{ fontWeight: "600", color: "darkred" }}>{">"}</Typography>
                        }
                      </Typography>

                    ))}

                  </TableHeader>


                  <Bosluk ></Bosluk>


                  {/* SAĞ TARAF - DEĞİŞKEN MAHAL BAŞLIĞI - BOŞ */}
                  <TableHeader index={0}></TableHeader>
                  <TableHeader index={1}></TableHeader>




                  {/* 1 SIRA POZ BAŞLIKLARI BİTİNCE  ALTINDAKİ POZ SATIRLARI - BURADA VERDİĞİMİZ GRİD BOYUTLARI YUKARIDAKİ BAŞLIK İLE UYUMLU OLURSA TABLO OLUŞUR YOKSA SATURLAR ŞAŞIRIR*/}

                  {/* HAYALET */}
                  {<Box sx={{ display: "none" }}>
                    {count_ = pozlar?.filter(item => item._wbsId.toString() == oneWbs._id.toString()).length}
                  </Box>}

                  <Box>

                    {/* POZLAR */}
                    {pozlar?.filter(item => item._wbsId.toString() == oneWbs._id.toString()).map((onePoz, index) => {
                      return (
                        <Grid
                          key={index}
                          sx={{
                            display: "grid",
                            gridTemplateColumns: gridTemplateColumns_,
                          }}
                        >
                          {
                            isProject?.pozBasliklari?.filter(item => item.sabit).map((oneBaslik, index) => {
                              return (
                                <TableItem
                                  key={index}
                                  index={index}
                                  count_={count_}
                                  sx={{
                                    // userSelect:"none",
                                    cursor: "pointer",
                                    display: "grid",
                                    alignItems: "center",
                                    justifyItems: oneBaslik.yatayHiza,
                                  }}
                                >
                                  {onePoz[oneBaslik.referans]}
                                </TableItem>
                              )
                            })
                          }

                          <Bosluk>
                          </Bosluk>

                          <TableItem
                            index={0}
                            sx={{ backgroundColor: editMode_Metraj ? "yellow" : null, cursor: editMode_Metraj ? "pointer" : null, display: "grid", justifyContent: "end", pr: "0.4rem" }}
                            // onClick={editMode_Metraj ? () => setShow("FormMetrajUpdate") : null}>
                            onClick={editMode_Metraj ? () => {
                              set_pozId(onePoz._id)
                              setShow("FormMetrajUpdate")
                            } : null}
                          >
                            {pozMetrajlar?.find(item => item._id.toString() == onePoz._id.toString()).metraj}
                          </TableItem>

                          <TableItem
                            index={1}
                            sx={{ display: "grid", justifyContent: "center" }}
                          >
                            {isProject.pozBirimleri.find(item => item.id == onePoz.birimId).name}
                          </TableItem>


                        </Grid>
                      )
                    })}
                  </Box>

                </Grid>
              )
            })
          }

        </Box>

      }

    </ >

  )

}


