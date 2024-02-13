
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { StoreContext } from '../../components/store'
import { useApp } from "../../components/useApp";
import FormMahalCreate from '../../components/FormMahalCreate'
import FormMahalBilgiCreate from '../../components/FormMahalBilgiCreate'
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


  let basliklar = [
    { id: 1, isim: "No" },
    { id: 2, isim: "İsim" },
    { id: 3, isim: "bosluk" },
    { id: 3, isim: "Tarif" },
    { id: 4, isim: "Ölçü" },
  ]

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



  let count_

  const TableHeader = styled('div')(({ index, count_ }) => ({
    marginTop: "1rem",
    fontWeight: "bold",
    backgroundColor: "rgba(255, 165, 0, 0.18)",
    border: "solid black 1px"
  }));

  const TableItem = styled('div')(({ index, count_ }) => ({
    borderRight: "solid black 1px",
    borderBottom: "solid black 1px"
  }));

  let gridTemplateColumns_ = "5rem 15rem 1rem 30rem 25rem"
  const totalWidth = "76rem"


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

        <Box sx={{ mt: subHeaderHeight, pt: "1rem", pl: "1rem", pr: "1rem" }}>

          {/* EN ÜST BAŞLIK SATIRI */}
          <Grid
            sx={{
              pb: "1rem",
              display: "grid",
              gridTemplateColumns: gridTemplateColumns_,
            }}
          >
            {basliklar.map((oneBaslik, index) => {
              return (
                <Box key={index} sx={{ backgroundColor: "lightgrey", fontWeight: "bold", border: "solid black 1px", borderRight: index + 1 == basliklar.length ? "solid black 1px" : "0px" }}>
                  {oneBaslik.isim}
                </Box>
              )
            })}
          </Grid>


          {/* ALT BAŞLIKLAR ve MAHALLER */}
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
                      gridTemplateColumns: totalWidth,
                    }}
                  >
                    <TableHeader >

                      {/* sadece cOunt tespiti için görünmez bir componenet */}
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


                      {/* sadece cOunt tespiti için görünmez bir componenet */}
                      <Box sx={{ display: "none" }}>
                        {cOunt = lbsName.split(">").length}
                      </Box>

                      {/* bu seviyede tek görünür grid item bu --> lbs başlığının yazdığı yer */}
                      {lbsName.split(">").map((item, index) => (

                        <Typography key={index} component={"span"} sx={{ fontWeight: "normal" }} >
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

                    {/* POZLAR - SATIR SATIR */}
                    {mahaller?.filter(item => item._lbsId.toString() == oneLbs._id.toString()).map((oneMahal, index) => {
                      return (
                        <Grid
                          key={index}
                          sx={{
                            display: "grid",
                            gridTemplateColumns: gridTemplateColumns_,
                          }}
                        >
                          <TableItem index={index} count_={count_} sx={{ borderLeft: "solid black 1px" }}>
                            xxx
                          </TableItem>
                          <TableItem index={index} count_={count_}>
                            {oneMahal.name}
                          </TableItem>
                          <Box index={index} count_={count_}>
                            {oneMahal.birim}
                          </Box>
                          <TableItem index={index} count_={count_}>
                            {oneMahal.birim}
                          </TableItem>
                          <TableItem index={index} count_={count_}>
                            {oneMahal.name}
                          </TableItem >
                        </Grid>
                      )
                    })}

                  </Grid>
                )
              })}



        </Box>

      }

    </ >

  )

}
