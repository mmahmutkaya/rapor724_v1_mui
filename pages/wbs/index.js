
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { StoreContext } from '../../components/store'
import { useApp } from "../../components/useApp";

import { useQuery } from '@tanstack/react-query'
import FormWbsCreate from '../../components/FormWbsCreate'
import WbsHeader from '../../components/WbsHeader'
import WbsMain from '../../components/WbsMain'


import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import List from '@mui/material/List';

import FolderIcon from '@mui/icons-material/Folder';




export default function P_Wbs() {

  const { subHeaderHeight } = useContext(StoreContext)

  const RealmApp = useApp();
  const { isProject, setIsProject } = useContext(StoreContext)
  const { selectedWbs, setSelectedWbs } = useContext(StoreContext)
  // const [selectedWbs, setSelectedWbs] = useState()
  const router = useRouter();
  !isProject ? router.push('/projects') : null

  const [show, setShow] = useState("WbsMain")


  const handleSelectWbs = (wbs) => {
    setSelectedWbs(wbs)
  }

  let level

  return (
    <Grid container direction="column" spacing={0} sx={{ mt: subHeaderHeight }}>

      <Grid item  >
        <WbsHeader RealmApp={RealmApp} setShow={setShow} selectedWbs={selectedWbs} setSelectedWbs={setSelectedWbs} isProject={isProject} setIsProject={setIsProject} />
      </Grid>

      {/* <Grid item >
        <WbsMain />
      </Grid> */}

      {show == "FormWbsCreate" &&
        <Grid item >
          <FormWbsCreate setShow={setShow} isProject={isProject} setIsProject={setIsProject} selectedWbs={selectedWbs} setSelectedWbs={setSelectedWbs} />
        </Grid>
      }


      {!isProject?.wbs?.length &&
        <Stack sx={{ width: '100%', padding: "0.5rem" }} spacing={2}>
          <Alert severity="info">
            "{isProject?.name}" isimli projeye ait herhangi WBS kaydı bulunamadı, menüler yardımı ile oluşturmaya başlayabilirsiniz.
          </Alert>
        </Stack>
      }

      {isProject?.wbs?.length > 0 &&
        < Stack sx={{ width: '100%', padding: "0.5rem" }} spacing={0}>

          {/* {console.log("isProject?.wbs?.length", isProject?.wbs?.length)} */}
          <Box display="grid">

            {console.log("wbsS",isProject.wbs)}

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
                  <Box key={theWbs._id} sx={{ display: "grid", gridTemplateColumns: level == 0 ? "1fr" : "repeat(" + level + ", 1rem) 1fr" }}>

                    <Items count={level} />

                    <Box
                      onClick={() => handleSelectWbs(theWbs)}
                      sx={{

                        pl: "0.1rem",
                        
                        // önce hepsini bu şekilde sonra seçilmişi aşağıda değiştiriyoruz
                        backgroundColor: bgColor(level).bg,
                        color: bgColor(level).co,

                        ...(selectedWbs?.code == theWbs.code && {
                          backgroundColor: "#ffff00",
                          color: "red",
                        }),

                        "&:hover": {
                          backgroundColor: "yellow",
                          color: "red",
                        },

                        "&:hover .poz-box": {
                          border: "2px solid red"
                        },

                        cursor: "pointer",

                      }}
                    >

                      <Grid container sx={{ display: "grid", gridTemplateColumns: "1fr 2rem" }}>

                        {/* theWbs isminin yazılı olduğu kısım */}
                        <Grid item>
                          <Box>  {theWbs.code.split(".")[theWbs.code.split(".").length - 1] + " - " + theWbs.name}</Box>
                        </Grid>

                        {/* poza açık theWbs lerin işaretli olduğu kısım */}
                        {theWbs.openForPoz &&
                          <Grid item onClick={() => console.log(theWbs._id.toString())} >
                            <Grid container sx={{ alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                              <Grid item >
                                <Box className="poz-box" sx={{
                                  boxSizing: "border-box",
                                  width: "0.5rem", height: "0.5rem",
                                  backgroundColor: "white",
                                  ...(selectedWbs?.code == theWbs.code && theWbs.includesPoz && {
                                    backgroundColor: "red",
                                  }),
                                  ...(selectedWbs?.code == theWbs.code && {
                                    border: "2px solid red"
                                  }),
                                }}></Box>
                              </Grid>
                            </Grid>
                          </Grid>
                        }

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
  // <Box sx={{ backgroundColor: bgColor(index).bg }}></Box>
  <Box sx={{ backgroundColor: bgColor(index).bg }}></Box>
);

const Items = ({ count }) => (
  Array.from({ length: count }).map((_item, index) => <Item key={index + 1} index={index} />)
)



// function bgColor(index) {
//   switch (index) {
//     case 0:
//       return { bg: "#202020", co: "white" }
//     case 1:
//       return { bg: "#8b0000", co: "white" }
//     case 2:
//       return { bg: "#330066", co: "white" }
//     case 3:
//       return { bg: "#005555", co: "white" }
//     case 4:
//       return { bg: "#006666", co: "white" }
//     case 5:
//       return { bg: "#8b008b", co: "white" }
//     case 6:
//       return { bg: "#737373", co: "white" }
//     case 7:
//       return { bg: "#2929bc", co: "white" }
//   }
// }


function bgColor(index) {
  switch (index) {
    case 0:
      return { bg: "#202020", co: "white" }
    case 1:
      return { bg: "#8b0000", co: "white" }
    case 2:
      return { bg: "#330066", co: "white" }
    case 3:
      return { bg: "#005555", co: "white" }
    case 4:
      return { bg: "#737373", co: "white" }
    case 5:
      return { bg: "#8b008b", co: "white" }
    case 6:
      return { bg: "#2929bc", co: "white" }
    case 7:
      return { bg: "#267347", co: "white" }
  }
}


// 0 - 202020
// 1 - 330066
// 2 - 330066
// 3 - 2929bc
// 4 - 005555
// 5 - 006666
// 6 - 005555
// 7 - 006666


{/* <Grid
  container
  direction="column"
  justifyContent="center"
  alignItems="center"
>
  <Grid item sx={{ position: "relative" }}>
    <Box sx={{ position: "absolute", top: "50%", left: "50%", width: "0,5rem", height: "0,5rem", border: "2px solid", backgroundColor: "red" }}>a</Box>
  </Grid>
</Grid> */}