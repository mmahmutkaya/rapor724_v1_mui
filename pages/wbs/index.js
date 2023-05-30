
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

  const { isProject, setIsProject } = useContext(StoreContext)
  // const router = useRouter();

  const RealmApp = useApp();



  async function handleGetWbs(project) {

    try {

      console.log(project._id)

      // const credentials = Realm.Credentials.emailPassword(email, password);
      // const user = await RealmApp.logIn(credentials);
      // if (user) {
      //   window.location.reload(false);
      //   return console.log("Giriş işlemi başarılı")
      // }
      // return console.log("Giriş işlemi başarısız, iletişime geçiniz.")

    } catch (err) {

      // return console.log(err)

      const hataMesaj = err.error

      if (hataMesaj.includes("expected a string 'password' parameter")) {
        return console.log("Şifre girmelisiniz")
      }

      if (hataMesaj === "invalid username") {
        return console.log("Email girmelisiniz")
      }

      if (hataMesaj === "invalid username/password") {
        return console.log("Email ve şifre uyuşmuyor")
      }

      console.log(hataMesaj)
      return console.log("Giriş esnasında hata oluştu, lütfen iletişime geçiniz..")

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


  const handleProjectClick = (project) => {
    setIsProject(project)
    router.push('/reports')
    console.log("--setproject-- is worked")
  }


  return (
    <Grid container direction="column" spacing={1}>

      <Grid item >
        <WbsHeader />
      </Grid>

      {/* <Grid item >
        <WbsMain />
      </Grid> */}

      {/* {show == "FormProjectCreate" &&
        <Grid item >
          <FormProjectCreate refetch_projects={refetch_projects} />
        </Grid>
      } */}

      {/* {show == "ProjectMain" && projectNames.empty &&
        <Stack sx={{ width: '100%', padding: "1rem" }} spacing={2}>
          <Alert severity="info">
            Dahil olduğunuz herhangi bir proje bulunamadı, menüler yardımı ile yeni bir proje oluşturabilirsiniz.
          </Alert>
        </Stack>
      } */}

      <Stack sx={{ width: '100%', padding: "1rem" }} spacing={0}>

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


