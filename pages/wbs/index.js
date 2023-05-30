
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { StoreContext } from '../../components/store'
import { useApp } from "../../components/useApp";
import { useQuery } from '@tanstack/react-query'
import FormProjectCreate from '../../components/FormProjectCreate'
import WbsHeader from '../../components/WbsHeader'
import WbsMain from '../../components/WbsMain'


import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import List from '@mui/material/List';

import FolderIcon from '@mui/icons-material/Folder';




export default function P_Projects() {

  const { isProject } = useContext(StoreContext)
  const [selectedWbs, setSelectedWbs] = useState()
  const [hataMesaj, setHataMesaj] = useState()

  // const router = useRouter();

  const RealmApp = useApp();



  async function handleSelectWbs(wbs) {

    try {

      console.log(isProject._id)
      console.log(wbs)

      // await RealmApp.currentUser.callFunction("createWbs", { name: projectName });

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


  const handleWbsClick = (wbs) => {
    setSelectedWbs(wbs)
  }


  return (
    <Grid container direction="column" spacing={1}>

      <Grid item >
        <WbsHeader RealmApp={RealmApp} selectedWbs={selectedWbs} isProject={isProject} />
      </Grid>

      {/* <Grid item >
        <WbsMain />
      </Grid> */}

      {/* {show == "FormProjectCreate" &&
        <Grid item >
          <FormProjectCreate refetch_projects={refetch_projects} />
        </Grid>
      } */}

      {!isProject?.wbs &&
        <Stack sx={{ width: '100%', padding: "1rem" }} spacing={2}>
          <Alert severity="info">
            "{isProject?.name}" isimli projeye ait herhangi WBS kaydı bulunamadı, menüler yardımı ile oluşturmaya başlayabilirsiniz.
          </Alert>
        </Stack>
      }

      <Stack sx={{ width: '100%', padding: "1rem" }} spacing={0}>

        {
          [1, 6, 5.5, 3.2, 2, 2.1, 2.2, 2.3, 2.4, 3, 4, 5].map((wbs, index) => (
            <Typography key={index} onClick={() => handleWbsClick(wbs)}>
              {wbs}
            </Typography>
          ))
        }

        {/* {
            projectNames.map(project => (

              <Grid
                key={project._id}
                container spacing={2}
                onClick={() => handleProjectClick(project)}
                sx={{
                  "&:hover": {
                    color: "red",
                  },
                  padding: "0.2rem 1rem",
                  cursor: "pointer"
                }}
              >

                <Grid item>
                  <FolderIcon
                    sx={{
                      // "&:hover": {
                      //   color: "red",
                      // },
                      color: "#757575"
                    }} />
                </Grid>

                <Grid item>
                  <Typography sx={{ fontWeight: "normal" }}>
                    {project.name}
                  </Typography>
                </Grid>

              </Grid>

            ))
          } */}


      </Stack>

    </Grid>

  )

}


