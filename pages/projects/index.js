import { useState } from 'react'

import FormProjectCreate from '../../components/FormProjectCreate'
import ProjectsHeader from '../../components/ProjectsHeader'
import ProjectsMain from '../../components/ProjectsMain'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import { useApp } from "../../components/useApp";
import { useQuery } from '@tanstack/react-query'
import { Typography } from '@mui/material';



const handleCollapse = (id) => {
  // console.log(id)
  let isHidden = data2.find(item => item.wbs.includes(id + "."))

  if (!isHidden?.hidden) {
    let data3 = JSON.parse(JSON.stringify(data2))
    data3 = data3.map(item => {
      if (item.wbs.includes(id + ".")) {
        item.hidden = true
      }
      return item
    })
    return (
      setData2(data3)
    )
  }

  if (isHidden?.hidden) {
    let data3 = JSON.parse(JSON.stringify(data2))
    data3 = data3.map(item => {
      if (item.wbs.includes(id + ".")) {
        item.hidden = false
      }
      return item
    })
    return (
      setData2(data3)
    )
  }

}



export default function P_Wbs() {

  const RealmApp = useApp();
  const { isLoading, isError, data: projectNames, error, refetch: refetch_wbs } = useQuery({
    queryKey: ['projects'],
    // queryFn: deneme,
    queryFn: async () => await RealmApp.currentUser.callFunction("getProjectNames"),
    refetchOnWindowFocus: false,
    enabled: !!RealmApp?.currentUser,
    // staleTime: 5 * 1000, // 1000 milisecond --> 1 second
  })


  const [show, setShow] = useState("ProjectMain")

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  // if (typeof projects == "object") {
  return (
    <Grid container direction="column" spacing={1}>

      <Grid item >
        <ProjectsHeader setShow={setShow} />
      </Grid>

      {show == "FormProjectCreate" &&
        <Grid item >
          <FormProjectCreate show={show} setShow={setShow} />
        </Grid>
      }

      {show == "ProjectMain" && projectNames.empty && show == "ProjectMain" &&
        <Stack sx={{ width: '100%', padding: "1rem" }} spacing={2}>
          <Alert severity="info">
            Dahil olduğunuz herhangi bir proje bulunamadı, menüler yardımı ile yeni bir proje oluşturabilirsiniz.
          </Alert>
        </Stack>
      }

      {show == "ProjectMain" && !projectNames.empty && show == "ProjectMain" &&
        <Stack sx={{ width: '100%', padding: "1rem" }} spacing={2}>
          <ProjectsMain />
        </Stack>
      }

    </Grid>

  )

  // }



}


