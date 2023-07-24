
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
    <Grid container direction="column" spacing={1}>

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
        <Stack sx={{ width: '100%', padding: "1rem" }} spacing={2}>
          <Alert severity="info">
            "{isProject?.name}" isimli projeye ait herhangi WBS kaydı bulunamadı, menüler yardımı ile oluşturmaya başlayabilirsiniz.
          </Alert>
        </Stack>
      }

      {isProject?.wbs?.length &&
        <Stack sx={{ width: '100%', padding: "1rem" }} spacing={0}>

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
              }).map((wbs) => {

                // wbs = { _id, code, name }

                level = wbs.code.split(".").length - 1

                return (
                  <Box key={wbs._id} sx={{ display: "grid", gridTemplateColumns: level == 0 ? "1fr" : "repeat(" + level + ", 1rem) 1fr" }}>

                    <Items count={level} />

                    <Box
                      onClick={() => handleSelectWbs(wbs)}
                      sx={{
                        backgroundColor: bgColor(level).bg,
                        color: bgColor(level).co,
                        ...(selectedWbs?.code == wbs.code && {
                          // color: "red",
                          backgroundColor: "red",
                        }),
                        cursor: "pointer",
                        ...(selectedWbs?.code !== wbs.code && {
                          "&:hover": {
                            backgroundColor: "blue",
                            color: "white"
                          }
                        })
                      }}
                    >

                      <Grid container sx={{ display: "grid", gridTemplateColumns: "1fr 2rem" }}>

                        <Grid item>
                          <Box>  {wbs.code + " - " + wbs.name}</Box>
                        </Grid>

                        <Grid item onClick={() => console.log(wbs._id.toString())} >
                          <Grid container sx={{ alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                            <Grid item >
                              <Box sx={{ width: "0.5rem", height: "0.5rem", backgroundColor: "white" }}></Box>
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
  // <Box sx={{ backgroundColor: bgColor(index).bg }}></Box>
  <Box sx={{ backgroundColor: bgColor(index).bg }}></Box>
);

const Items = ({ count }) => (
  Array.from({ length: count }).map((_item, index) => <Item key={index + 1} index={index} />)
)



function bgColor(index) {
  switch (index) {
    case 0:
      return { bg: "#202020", co: "white" }
    case 1:
      return { bg: "#660033", co: "white" }
    case 2:
      return { bg: "#330066", co: "white" }
    case 3:
      return { bg: "#006666", co: "white" }
    case 4:
      return { bg: "#303030", co: "white" }
    case 5:
      return { bg: "#550033", co: "white" }
    case 6:
      return { bg: "#330055", co: "white" }
    case 7:
      return { bg: "#005555", co: "white" }
  }
}



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