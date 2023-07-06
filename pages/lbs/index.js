
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { StoreContext } from '../../components/store'
import { useApp } from "../../components/useApp";

import { useQuery } from '@tanstack/react-query'
import FormLbsCreate from '../../components/FormLbsCreate'
import LbsHeader from '../../components/LbsHeader'
import LbsMain from '../../components/LbsMain'


import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import List from '@mui/material/List';

import FolderIcon from '@mui/icons-material/Folder';




export default function P_Lbs() {

  const RealmApp = useApp();
  const { isProject, setIsProject } = useContext(StoreContext)
  const { selectedLbs, setSelectedLbs } = useContext(StoreContext)
  const router = useRouter();
  !isProject ? router.push('/projects') : null
  
  const [hataMesaj, setHataMesaj] = useState()
  const [show, setShow] = useState("LbsMain")

  // const router = useRouter();


  // const { isLoading, isError, data: projectLbs, error, refetch: refetch_projectLbs } = useQuery({
  //   queryKey: ['projectLbs'],
  //   // queryFn: deneme,
  //   queryFn: async () => await RealmApp.currentUser.callFunction("getProjectLbs", { projectId: isProject._id }),
  //   refetchOnWindowFocus: false,
  //   enabled: !!RealmApp?.currentUser,
  //   // staleTime: 5 * 1000, // 1000 milisecond --> 1 second
  // })

  // if (isLoading) return "Loading...";

  // if (error) return "An error has occurred: " + error.message;


  async function handleSelectLbs2(lbs) {

    try {


      // await RealmApp.currentUser.callFunction("createLbs", { name: projectName });

      // refetch_projects()
      // setShowDialogInfo(true)
      // console.log("merhaba22")


      // const credentials = Realm.Credentials.emailPassword(email, password);
      // const user = await RealmApp.logIn(credentials);
      // if (user) {
      //   window.location.reload(false);
      //   return console.log("Giriş işlemi başarılı")
      // }
      // return console.log("Giriş işlemi başarısız, iletişime geçiniz.")

    } catch (err) {

      console.log(err)
      // err?.error ? setHataMesaj(err.error) : setHataMesaj("Beklenmedik bir hata oluştu, lütfen Rapor7/24 ile irtibata geçiniz..")
      let hataMesaj_ = err?.error ? err.error : "Beklenmedik hata, Rapor7/24 ile irtibata geçiniz.."

      if (hataMesaj_.includes("duplicate key error")) {
        hataMesaj_ = "Sistemde kayıtlı"
      }

      if (hataMesaj_.includes("çok kısa")) {
        hataMesaj_ = "Çok kısa"
      }

      setHataMesaj(hataMesaj_)
      // setShowDialogError(true)

      return console.log(hataMesaj)

    }

  }
  // const RealmApp = useApp();
  // const { isLoading, isError, data: projectNames, error, refetch: refetch_projects } = useQuery({
  //   queryKey: ['projects'],
  //   // queryFn: deneme,
  //   queryFn: async () => await RealmApp.currentUser.callFunction("getProjectNames"),
  //   refetchOnWindowFocus: false,
  //   enabled: !!RealmApp?.currentUser,
  //   // staleTime: 5 * 1000, // 1000 milisecond --> 1 second
  // })


  // const [show, setShow] = useState("ProjectMain")

  // if (isLoading) return "Loading...";

  // if (error) return "An error has occurred: " + error.message;


  const handleSelectLbs = (lbs) => {
    setSelectedLbs(lbs)
  }

  let level


  return (
    <Grid container direction="column" spacing={1}>

      <Grid item >
        <LbsHeader RealmApp={RealmApp} setShow={setShow} selectedLbs={selectedLbs} setSelectedLbs={setSelectedLbs} isProject={isProject} setIsProject={setIsProject} />
      </Grid>

      {/* <Grid item >
        <LbsMain />
      </Grid> */}

      {show == "FormLbsCreate" &&
        <Grid item >
          <FormLbsCreate setShow={setShow} isProject={isProject} setIsProject={setIsProject} selectedLbs={selectedLbs} setSelectedLbs={setSelectedLbs} />
        </Grid>
      }


      {!isProject?.lbs?.length &&
        <Stack sx={{ width: '100%', padding: "1rem" }} spacing={2}>
          <Alert severity="info">
            "{isProject?.name}" isimli projeye ait herhangi LBS kaydı bulunamadı, menüler yardımı ile oluşturmaya başlayabilirsiniz.
          </Alert>
        </Stack>
      }

      {isProject?.lbs?.length &&
        <Stack sx={{ width: '100%', padding: "1rem" }} spacing={0}>

          <Box display="grid">

            {
              isProject.lbs.sort((a, b) => a.code.toLowerCase() >= b.code.toLowerCase() ? 1 : -1).map((lbs) => {

                // lbs = { _id, code, name }

                level = lbs.code.split(".").length - 1

                return (
                  <Box key={lbs._id} display="grid" sx={{ gridTemplateColumns: "repeat(" + level + ", 1rem) 1fr" }}>

                    <Items count={level} />

                    <Box
                      onClick={() => handleSelectLbs(lbs)}
                      sx={{
                        backgroundColor: selectedLbs?.code == lbs.code ? "red" : bgColor(level).bg,
                        // backgroundColor: bgColor(level).bg,
                        color: selectedLbs?.code == lbs.code ? "yellow" : bgColor(level).co,
                        // color: bgColor(level).co,
                        cursor:"pointer",
                        "&:hover": {
                          backgroundColor: "blue",
                          color:"white"
                        }
                      }}
                    >
                      {lbs.code + " - " + lbs.name}
                    </Box>

                  </Box>
                )

              })

            }

          </Box>

        </Stack>
      }

    </Grid>

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

