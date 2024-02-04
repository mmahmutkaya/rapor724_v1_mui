
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { StoreContext } from '../../components/store'
import { useApp } from "../../components/useApp";

import FormWbsCreate from '../../components/FormWbsCreate'
import FormWbsUpdate from '../../components/FormWbsUpdate'
import WbsHeader from '../../components/WbsHeader'


import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';



export default function P_Wbs() {

  const { subHeaderHeight } = useContext(StoreContext)

  const RealmApp = useApp();
  const { isProject, setIsProject } = useContext(StoreContext)
  const { selectedWbs, setSelectedWbs } = useContext(StoreContext)

  const router = useRouter();
  !isProject ? router.push('/projects') : null

  const [show, setShow] = useState()
  const [nameMode, setNameMode] = useState(false)
  const [codeMode, setCodeMode] = useState(true)


  const handleSelectWbs = (wbs) => {
    setSelectedWbs(wbs)
  }

  let level

  return (
    <Grid container direction="column" spacing={0} sx={{ mt: subHeaderHeight }}>

      <Grid item  >
        <WbsHeader
          RealmApp={RealmApp}
          setShow={setShow}
          nameMode={nameMode} setNameMode={setNameMode}
          codeMode={codeMode} setCodeMode={setCodeMode}
        />
      </Grid>

      {/* <Grid item >
        <WbsMain />
      </Grid> */}

      {show == "FormWbsCreate" &&
        <Grid item >
          <FormWbsCreate setShow={setShow} isProject={isProject} setIsProject={setIsProject} selectedWbs={selectedWbs} setSelectedWbs={setSelectedWbs} />
        </Grid>
      }

      {show == "FormWbsUpdate" &&
        <Grid item >
          <FormWbsUpdate setShow={setShow} isProject={isProject} setIsProject={setIsProject} selectedWbs={selectedWbs} setSelectedWbs={setSelectedWbs} />
        </Grid>
      }


      {!isProject?.wbs?.length &&
        <Stack sx={{ width: '100%', padding: "0.5rem" }} spacing={2}>
          <Alert severity="info">
            Menüler yardımı ile "Poz Başlığı" ekleyebilirsiniz.
          </Alert>
        </Stack>
      }

      {isProject?.wbs?.length > 0 &&
        < Stack sx={{ width: '100%', padding: "0.5rem" }} spacing={0}>

          {/* {console.log("isProject?.wbs?.length", isProject?.wbs?.length)} */}
          <Box display="grid">

            {
              isProject.wbs.sort(function (a, b) {
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
              }).map((theWbs) => {

                // theWbs = { _id, code, name }

                level = theWbs?.code?.split(".").length - 1

                return (
                  <Box key={theWbs._id} sx={{
                    display: "grid",
                    gridTemplateColumns: level == 0 ? "1rem 1fr" : "1rem repeat(" + (level) + ", 1rem) 1fr", // baştaki poz var mı yok mu için
                    "&:hover .hoverTheWbsLeft": {
                      visibility: "visible",
                      color: "red",
                    },

                  }}>

                    {/* grid item */}
                    <Items count={(level)} />

                    <Box sx={{ position: "relative", backgroundColor: color(level).bg, borderLeft: "1px solid " + color("border") }}>

                      {theWbs.openForPoz &&
                        // wbs poza açıksa - var olan mevcut kutunun içinde beliren sarı kutu
                        <Grid container sx={{ position: "absolute", borderRadius: "10%", backgroundColor: "#65FF00", top: "20%", left: "30%", width: "0.7rem", height: "0.7rem" }}>

                          {/* poz kayıtlı ise sarı kutunun içinde beliren siyah nokta */}
                          {theWbs.includesPoz &&
                            <Grid item sx={{ position: "relative", width: "100%", height: "100%" }}>

                              <Box sx={{ position: "absolute", borderRadius: "50%", backgroundColor: "red", top: "25%", left: "25%", width: "50%", height: "50%" }}>

                              </Box>

                            </Grid>
                          }


                        </Grid>
                      }

                    </Box>


                    <Box
                      onClick={() => handleSelectWbs(theWbs)}
                      sx={{

                        pl: "2px",

                        borderBottom: "0.5px solid " + color("border"),

                        // önce hepsini bu şekilde sonra seçilmişi aşağıda değiştiriyoruz
                        backgroundColor: color(level).bg,
                        color: color(level).co,

                        "&:hover .hoverTheWbs": {
                          // display: "inline"
                          visibility: "visible"
                        },

                        cursor: "pointer",

                      }}
                    >

                      <Grid container sx={{ display: "grid", gridTemplateColumns: "1fr 2rem" }}>

                        {/* theWbs isminin yazılı olduğu kısım */}
                        <Grid item>

                          <Grid container sx={{ color: "#cccccc" }}>

                            {codeMode === null && //kısa
                              <Grid item sx={{ ml: "0.2rem" }}>
                                {theWbs.code.split(".")[level] + " - "}
                              </Grid>
                            }

                            {codeMode === false && //tam
                              <Grid item sx={{ ml: "0.2rem" }}>
                                {theWbs.code + " - "}
                              </Grid>
                            }

                            {/* codeMode === true && //yok */}

                            {nameMode === null &&
                              <Grid item sx={{ ml: "0.3rem" }}>
                                {theWbs.name + " - (" + theWbs.codeName + ")"}
                              </Grid>
                            }

                            {nameMode === false &&
                              <Grid item sx={{ ml: "0.3rem" }}>
                                {theWbs.name}
                              </Grid>
                            }

                            {nameMode === true &&
                              <Grid item sx={{ ml: "0.3rem" }}>
                                ({theWbs.codeName})
                              </Grid>
                            }

                            <Grid item className='hoverTheWbs'
                              sx={{
                                ml: "0.5rem",
                                visibility: selectedWbs?._id.toString() === theWbs._id.toString() ? "visible" : "hidden",
                              }}>

                              <Grid container sx={{ alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                                <Grid item >
                                  <Box sx={{
                                    backgroundColor: "yellow",
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

                      </Grid>

                    </Box>



                  </Box>
                )

              })

            }

          </Box>

        </Stack>
      }

    </Grid >

  )

}



const Item = ({ index }) => (
  <Box sx={{ backgroundColor: color(index).bg, borderLeft: "1px solid " + color("border") }}></Box>
);

const Items = ({ count }) => (
  Array.from({ length: count }).map((_item, index) => <Item key={index + 1} index={index} />)
)


function color(index) {
  switch (index) {
    case 0:
      return { bg: "#202020", co: "#e6e6e6" }
    case 1:
      return { bg: "#8b0000", co: "#e6e6e6" }
    case 2:
      return { bg: "#330066", co: "#e6e6e6" }
    case 3:
      return { bg: "#005555", co: "#e6e6e6" }
    case 4:
      return { bg: "#737373", co: "#e6e6e6" }
    case 5:
      return { bg: "#8b008b", co: "#e6e6e6" }
    case 6:
      return { bg: "#2929bc", co: "#e6e6e6" }
    case 7:
      return { bg: "#267347", co: "#e6e6e6" }
    case "border":
      return "gray"
    case "font":
      return "#e6e6e6"
  }
}
