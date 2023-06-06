
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { StoreContext } from '../../components/store'
import { useApp } from "../../components/useApp";
import { useQuery } from '@tanstack/react-query'
import FormProjectCreate from '../../components/FormProjectCreate'
import ItemsHeader from '../../components/ItemsHeader'


import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import List from '@mui/material/List';

import FolderIcon from '@mui/icons-material/Folder';




export default function P_Pozlar() {

  const { isProject, setIsProject } = useContext(StoreContext)
  console.log("isProject")
  console.log(isProject)
  const router = useRouter();

  const RealmApp = useApp();
  const { isLoading, isError, data: projectNames, error, refetch: refetch_projects } = useQuery({
    queryKey: ['projectNames'],
    // queryFn: deneme,
    queryFn: async () => await RealmApp.currentUser.callFunction("getProjectNames"),
    refetchOnWindowFocus: false,
    enabled: !!RealmApp?.currentUser,
    // staleTime: 5 * 1000, // 1000 milisecond --> 1 second
  })


  const [show, setShow] = useState("ProjectMain")

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;


  const handleProjectClick = (project) => {
    setIsProject(project)
    router.push('/reports')
  }


  return (
    <Grid container direction="column" spacing={1}>

      <Grid item >
        <ItemsHeader setShow={setShow} />
      </Grid>

      {show == "FormProjectCreate" &&
        <Grid item >
          <FormProjectCreate setShow={setShow} refetch_projects={refetch_projects} />
        </Grid>
      }

      {show == "ProjectMain" && !isProject.wbs &&
        <Stack sx={{ width: '100%', padding: "1rem" }} spacing={2}>
          <Alert severity="info">
            Poz ekleyebilmek için öncelikle poz eklenebilcek Wbs leri belirlemeniz gerekmektedir.
          </Alert>
        </Stack>
      }

      {show == "ProjectMain" && isProject.wbs &&
        <Stack sx={{ width: '100%', padding: "1rem" }} spacing={0}>

          {
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
          }


        </Stack>
      }

    </Grid>

  )

}


