
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { StoreContext } from '../../components/store'
import { useApp } from "../../components/useApp";
import FormMahalCreate from '../../components/FormMahalCreate'
import SettingsMahalBasliklar from '../../components/SettingsMahalBasliklar'
import FormMahalBaslikCreate from '../../components/FormMahalBaslikCreate'
import MahalHeader from '../../components/MahalHeader'


import { styled } from '@mui/system';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import InfoIcon from '@mui/icons-material/Info';



export default function P_Mahaller() {

  const { isProject, setIsProject } = useContext(StoreContext)
  const { selectedMahal, setSelectedMahal } = useContext(StoreContext)
  const { selectedMahalBaslik, setSelectedMahalBaslik } = useContext(StoreContext)
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
  let count_
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


  // let basliklar = [
  //   { id: 1, isim: "No" },
  //   { id: 2, isim: "İsim" },
  //   { id: 3, isim: "bosluk" },
  //   { id: 3, isim: "Tarif" },
  //   { id: 4, isim: "Ölçü" },
  // ]

  /* padding - top | right | bottom | left */
  // const [basliklar, setBasliklar] = useState([
  //   { id: 1, sira: 1, referans: "kod", goster: true, sabit: true, genislik: 7, padding_M: "0px 1rem 0px 0px", yatayHiza: "end", name: "Mahal No", dataType: "number" },
  //   { id: 2, sira: 2, referans: "name", goster: true, sabit: true, genislik: 20, padding_M: "0px 1rem 0px 0px", yatayHiza: "end", name: "Mahal İsmi", dataType: "string" },
  //   { id: 3, sira: 3, referans: "name", goster: true, sabit: false, genislik: 15, padding_M: "0px 0rem 0px 0px", yatayHiza: "center", name: "Zemin Alan", dataType: "date" },
  //   { id: 4, sira: 4, referans: "name", goster: true, sabit: false, genislik: 20, padding_M: "0px 0rem 0px 0px", yatayHiza: "center", name: "Fonksiyon", dataType: "date" },
  // ].sort((a, b) => a.sira - b.sira))

  // const [basliklar, setBasliklar] = useState(isProject?.mahalBasliklari?.filter(item => item.goster))


  let totalWidthSabit_rem = isProject?.mahalBasliklari?.filter(item => item.sabit).reduce(
    (accumulator, oneBilgi) => accumulator + oneBilgi.genislik,
    0
  )
  totalWidthSabit_rem = totalWidthSabit_rem + 'rem'
  // console.log("totalWidthSabit_rem", totalWidthSabit_rem)


  let totalWidthDegisken_rem = isProject?.mahalBasliklari?.filter(item => !item.sabit && item.goster).reduce(
    (accumulator, oneBilgi) => accumulator + oneBilgi.genislik,
    0
  )
  totalWidthDegisken_rem = totalWidthDegisken_rem + 'rem'
  // console.log("totalWidthDegisken_rem", totalWidthDegisken_rem)


  let totalWidth = isProject?.mahalBasliklari?.reduce(
    (accumulator, oneBilgi) => accumulator + oneBilgi.genislik,
    0
  )
  totalWidth = (totalWidth + 2) + 'rem'
  // console.log("totalWidth", totalWidth)


  let gridTemplateColumnsSabit = isProject?.mahalBasliklari?.filter(item => item.sabit).reduce(
    (ilkString, oneBilgi, index) => index != isProject?.mahalBasliklari?.length ? ilkString + (oneBilgi.genislik + "rem ") : ilkString + (oneBilgi.genislik + "rem"),
    ""
  )
  // console.log("gridTemplateColumnsSabit", gridTemplateColumnsSabit)


  let gridTemplateColumnsDegisken = isProject?.mahalBasliklari?.filter(item => !item.sabit && item.goster).reduce(
    (ilkString, oneBilgi, index) => index != isProject?.mahalBasliklari?.length ? ilkString + (oneBilgi.genislik + "rem ") : ilkString + (oneBilgi.genislik + "rem"),
    ""
  )
  // console.log("gridTemplateColumnsDegisken", gridTemplateColumnsDegisken)


  let gridTemplateColumns_ = gridTemplateColumnsSabit + gridTemplateColumnsDegisken
  // console.log("gridTemplateColumns_", gridTemplateColumns_)


  const TableHeader = styled('div')(({ index }) => ({
    marginTop: "1rem",
    // fontWeight: "bold",
    backgroundColor: "#FAEBD7",
    // borderLeft: (index && index !== 0) ? null : "solid black 1px",
    borderLeft: "solid black 1px",
    borderRight: "solid black 1px",
    borderTop: "solid black 1px",
    borderBottom: "solid black 1px"
  }));


  const TableItem = styled('div')(({ index }) => ({
    // borderLeft: index == 0 ? "solid black 1px" : null,
    borderLeft: "solid black 1px",
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
    console.log("mahal baslık secildi")
  }


  const handle_editMahal = (event, oneBaslik, oneMahal) => {
    setMahaller(mahaller => {
      let mahaller_ = mahaller
      let bilgi = { id: oneBaslik.id, bilgi: event.target.value }
      if (!mahaller_.find(item => item._id.toString() == oneMahal._id.toString()).ilaveBilgiler) {
        mahaller_.find(item => item._id.toString() == oneMahal._id.toString()).ilaveBilgiler = [bilgi]
        return mahaller_
      }
      if (!mahaller_.find(item => item._id.toString() == oneMahal._id.toString()).ilaveBilgiler.find(item => item.id == oneBaslik.id)) {
        mahaller_.find(item => item._id.toString() == oneMahal._id.toString()).ilaveBilgiler.push(bilgi)
        return mahaller_
      }
      mahaller_.find(item => item._id.toString() == oneMahal._id.toString()).ilaveBilgiler.find(item => item.id == oneBaslik.id).bilgi = event.target.value
      return mahaller_
    })
  }


  const [editMahal, setEditMahal] = useState(false)

  // console.log("-Page_Mahaller--isProject?.mahaller", isProject?.mahalBasliklari)

  // let deneme = mahaller?.find(item => item._lbsId.toString() == oneLbs.toString()).ilaveBilgiler?.reduce((accumulator, oneMahal) => accumulator + Number(oneMahal.bilgi), 0)


  return (

    <>

      <Grid item >
        <MahalHeader setShow={setShow} editMahal={editMahal} setEditMahal={setEditMahal} />
      </Grid>

      {show == "FormMahalCreate" &&
        <Grid item >
          <FormMahalCreate isProject={isProject} setShow={setShow} />
        </Grid>
      }

      {show == "FormMahalBaslikCreate" &&
        <Grid item >
          <FormMahalBaslikCreate setShow={setShow} />
        </Grid>
      }

      {show == "SettingsMahalBasliklar" &&
        <Grid item >
          <SettingsMahalBasliklar setShow={setShow} />
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

        <Box sx={{ mt: subHeaderHeight, pt: "1rem", pl: "1rem", pr: "1rem" }}>

          {/* EN ÜST BAŞLIK SATIRI */}
          <Grid
            sx={{
              pb: "1rem",
              display: "grid",
              gridTemplateColumns: totalWidthSabit_rem + " 2rem " + totalWidthDegisken_rem
            }}
          >

            {/* SABİT SUTUN - totalWidthSabit_rem - (MAHAL KOD ve MAHAL İSİM YAZAN ALAN) */}
            <Box>


              {/* SABİT KISIM - EN ÜST BAŞLIK SATIRI */}
              <Grid
                sx={{
                  pb: "1rem",
                  display: "grid",
                  gridTemplateColumns: gridTemplateColumnsSabit,
                }}
              >
                {/* HAYALET */}
                <Box sx={{ display: "none" }}>
                  {count_ = isProject?.mahalBasliklari?.filter(item => item.sabit).length}
                </Box>
                {isProject?.mahalBasliklari?.filter(item => item.sabit).map((oneBaslik, index) => {
                  return (
                    <Box
                      sx={{
                        cursor: "pointer",
                        backgroundColor: selectedMahalBaslik?.id == oneBaslik.id ? "rgba(120, 120, 120, 0.7)" : "rgb(120, 120, 120, 0.4)",
                        fontWeight: "bold",
                        border: "solid black 1px",
                        borderRight: index + 1 == count_ ? "solid black 1px" : "0px",
                        width: "100%",
                        display: "grid",
                        justifyContent: oneBaslik.yatayHiza,
                      }}
                      onClick={() => handle_selectBaslik(oneBaslik)}
                      key={index}
                    >
                      {oneBaslik.name}
                    </Box>
                  )
                })}
              </Grid>


              {/* SABİT KISIM == MAHAL BAŞLIKLARI ve MAHALLER */}
              {isProject?.lbs
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
                }).map((oneLbs, index) => {
                  return (
                    <Grid
                      key={index}
                      sx={{
                        display: "grid",
                        gridTemplateColumns: totalWidthSabit_rem,
                      }}
                    >
                      <TableHeader>

                        {/* HAYALET */}
                        <Box sx={{ display: "none" }}>
                          {cOunt = oneLbs.code.split(".").length}
                        </Box>

                        {
                          oneLbs.code.split(".").map((codePart, index) => {

                            if (index == 0 && cOunt == 1) {
                              lbsCode = codePart
                              lbsName = isProject?.lbs.find(item => item.code == lbsCode).name
                            }

                            if (index == 0 && cOunt !== 1) {
                              lbsCode = codePart
                              lbsName = isProject?.lbs.find(item => item.code == lbsCode).codeName
                            }

                            if (index !== 0 && index + 1 !== cOunt && cOunt !== 1) {
                              lbsCode = lbsCode + "." + codePart
                              lbsName = lbsName + " > " + isProject?.lbs.find(item => item.code == lbsCode).codeName
                            }

                            if (index !== 0 && index + 1 == cOunt && cOunt !== 1) {
                              lbsCode = lbsCode + "." + codePart
                              lbsName = lbsName + " > " + isProject?.lbs.find(item => item.code == lbsCode).name
                            }

                          })
                        }


                        {/* HAYALET */}
                        <Box sx={{ display: "none" }}>
                          {cOunt = lbsName.split(">").length}
                        </Box>

                        {/* GÖZÜKEN KOMPONENET - sabit kısımda - lbs başlığının yazdığı yer */}
                        {lbsName.split(">").map((item, index) => (

                          <Typography key={index} component={"span"} >
                            {item}
                            {index + 1 !== cOunt &&
                              <Typography component={"span"} sx={{ fontWeight: "600", color: "darkred" }}>{">"}</Typography>
                            }
                          </Typography>

                        ))}

                      </TableHeader>


                      {/* HAYALET */}
                      {<Box sx={{ display: "none" }}>
                        {count_ = mahaller?.filter(item => item._lbsId.toString() == oneLbs._id.toString()).length}
                      </Box>}



                      {/* MAHALLER */}
                      {mahaller?.filter(item => item._lbsId.toString() == oneLbs._id.toString()).map((oneMahal, index) => {
                        return (
                          <Grid
                            key={index}
                            sx={{
                              display: "grid",
                              gridTemplateColumns: gridTemplateColumns_,
                            }}
                          >
                            {
                              isProject?.mahalBasliklari?.filter(item => item.sabit).map((oneBaslik, index) => {
                                return (
                                  <TableItem
                                    key={index}
                                    index={index}
                                    count_={count_}
                                    // onDoubleClick={() => handle_selectMahal(oneBaslik, oneMahal)}
                                    sx={{
                                      // userSelect:"none",
                                      cursor: "pointer",
                                      display: "grid",
                                      alignItems: "center",
                                      justifyItems: oneBaslik.yatayHiza,
                                      // backgroundColor: selectedMahal?._id.toString() == oneMahal._id.toString() ? "green" : null
                                    }}
                                  >
                                    {oneMahal[oneBaslik.referans]}
                                  </TableItem>
                                )
                              })
                            }

                          </Grid>
                        )
                      })}

                    </Grid>
                  )
                })
              }


            </Box>


            {/* BOŞLUK */}
            <Box></Box>


            {/* DEĞİŞKEN SUTUNLAR - totalWidthDegisken_rem - */}
            <Box>

              <Grid
                sx={{
                  pb: "1rem",
                  display: "grid",
                  gridTemplateColumns: gridTemplateColumnsDegisken,
                }}
              >

                {isProject?.mahalBasliklari?.filter(item => !item.sabit).map((oneBaslik, index) => {
                  return (
                    <Box key={index}>

                      {/* DEĞİŞKEN KISIM - EN ÜST BAŞLIK SATIRI */}
                      <Box
                        sx={{
                          cursor: "pointer",
                          backgroundColor: selectedMahalBaslik?.id == oneBaslik.id ? "rgba(120, 120, 120, 0.7)" : "rgb(120, 120, 120, 0.4)",
                          fontWeight: "bold",
                          border: "solid black 1px",
                          borderRight: index + 1 == count_ ? "solid black 1px" : "0px",
                          width: "100%",
                          display: "grid",
                          justifyContent: oneBaslik.yatayHiza,
                        }}
                        onClick={() => handle_selectBaslik(oneBaslik)}
                      >
                        {oneBaslik.name}
                      </Box>


                    </Box>
                  )
                })}


              </Grid>

            </Box>

          </Grid>

        </Box>


      }

    </ >

  )

}
