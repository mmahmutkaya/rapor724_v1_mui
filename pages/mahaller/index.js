
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { StoreContext } from '../../components/store'
import { useApp } from "../../components/useApp";
import FormMahalCreate from '../../components/FormMahalCreate'
import FormMahalBaslikCreate from '../../components/FormMahalBaslikCreate'
import MahalHeader from '../../components/MahalHeader'


import { styled } from '@mui/system';
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

  const [basliklar, setBasliklar] = useState(isProject.mahalBasliklari)


  let totalWidthSabit = basliklar.filter(item => item.sabit).reduce(
    (accumulator, oneBilgi) => accumulator + oneBilgi.genislik,
    0
  )
  totalWidthSabit = totalWidthSabit + 'rem'
  // console.log("totalWidthSabit", totalWidthSabit)


  let totalWidthDegisken = basliklar.filter(item => !item.sabit).reduce(
    (accumulator, oneBilgi) => accumulator + oneBilgi.genislik,
    0
  )
  totalWidthDegisken = totalWidthDegisken + 'rem'
  // console.log("totalWidthDegisken", totalWidthDegisken)


  let totalWidth = basliklar.reduce(
    (accumulator, oneBilgi) => accumulator + oneBilgi.genislik,
    0
  )
  totalWidth = (totalWidth + 2) + 'rem'
  // console.log("totalWidth", totalWidth)


  let gridTemplateColumnsSabit = basliklar.filter(item => item.sabit).reduce(
    (ilkString, oneBilgi, index) => index != basliklar.length ? ilkString + (oneBilgi.genislik + "rem ") : ilkString + (oneBilgi.genislik + "rem"),
    ""
  )
  // console.log("gridTemplateColumnsSabit", gridTemplateColumnsSabit)


  let gridTemplateColumnsDegisken = basliklar.filter(item => !item.sabit).reduce(
    (ilkString, oneBilgi, index) => index != basliklar.length ? ilkString + (oneBilgi.genislik + "rem ") : ilkString + (oneBilgi.genislik + "rem"),
    ""
  )
  // console.log("gridTemplateColumnsDegisken", gridTemplateColumnsDegisken)


  let gridTemplateColumns_ = gridTemplateColumnsSabit + " 2rem " + gridTemplateColumnsDegisken
  // console.log("gridTemplateColumns_", gridTemplateColumns_)


  const TableHeader = styled('div')(({ index }) => ({
    marginTop: "1rem",
    // fontWeight: "bold",
    backgroundColor: "#FAEBD7",
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


  return (

    <>

      <Grid item >
        <MahalHeader setShow={setShow} />
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
              gridTemplateColumns: gridTemplateColumns_,
            }}
          >
            {/* HAYALET */}
            <Box sx={{ display: "none" }}>
              {count_ = basliklar.filter(item => item.sabit).length}
            </Box>
            {basliklar.filter(item => item.sabit).map((oneBaslik, index) => {
              return (
                <Box key={index} sx={{ backgroundColor: "lightgrey", fontWeight: "bold", border: "solid black 1px", borderRight: index + 1 == count_ ? "solid black 1px" : "0px" }}>
                  {oneBaslik.name}
                </Box>
              )
            })}
            <Bosluk >

            </Bosluk>
            {/* HAYALET */}
            <Box sx={{ display: "none" }}>
              {count_ = basliklar.filter(item => !item.sabit).length}
            </Box>
            {basliklar.filter(item => !item.sabit).map((oneBaslik, index) => {
              return (
                <Box key={index} sx={{ backgroundColor: "lightgrey", fontWeight: "bold", border: "solid black 1px", borderRight: index + 1 == count_ ? "solid black 1px" : "0px" }}>
                  {oneBaslik.name}
                </Box>
              )
            })}
          </Grid>


          {/* MAHAL BAŞLIKLARI ve MAHALLER */}
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
              .map((oneLbs, index) => {
                return (
                  <Grid
                    key={index}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: totalWidthSabit + " 2rem " + gridTemplateColumnsDegisken,
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


                      {/* HAYALET */}
                      <Box sx={{ display: "none" }}>
                        {cOunt = lbsName.split(">").length}
                      </Box>

                      {/* bu seviyede tek görünür grid item bu --> lbs başlığının yazdığı yer */}
                      {lbsName.split(">").map((item, index) => (

                        <Typography key={index} component={"span"} >
                          {item}
                          {index + 1 !== cOunt &&
                            <Typography component={"span"} sx={{ fontWeight: "600", color: "darkred" }}>{">"}</Typography>
                          }
                        </Typography>

                      ))}

                    </TableHeader>

                    <Bosluk ></Bosluk>

                    {
                      basliklar.filter(item => !item.sabit).map((item, index) => {
                        return (
                          <TableHeader key={index} index={index} count_={count_}>
                            {oneLbs.code}
                          </TableHeader>
                        )
                      })
                    }


                    {/* HAYALET */}
                    {<Box sx={{ display: "none" }}>
                      {count_ = mahaller?.filter(item => item._lbsId.toString() == oneLbs._id.toString()).length}
                    </Box>}

                    <Grid
                      key={index}
                      sx={{
                        display: "grid",
                        gridTemplateColumns: totalWidth,
                      }}
                    >

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
                              basliklar.filter(item => item.sabit).map((item, index) => {
                                return (
                                  <TableItem key={index} index={index} count_={count_}>
                                    {oneMahal[item.referans]}
                                  </TableItem>
                                )
                              })
                            }

                            <Bosluk>

                            </Bosluk>

                            {
                              basliklar.filter(item => !item.sabit).map((item, index) => {
                                return (
                                  <TableItem key={index} index={index} count_={count_}>
                                    {oneMahal[item.referans]}
                                  </TableItem>
                                )
                              })
                            }
                          </Grid>
                        )
                      })}
                    </Grid>

                  </Grid>
                )
              })}



        </Box>

      }

    </ >

  )

}
