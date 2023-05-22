import React from 'react'
import { useState } from 'react'

import WbsMain from '../../components/WbsMain'
import WbsHeader from '../../components/WbsHeader'
import Grid from '@mui/material/Grid';

import { useApp } from "../../components/useApp";
import { useQuery } from '@tanstack/react-query'



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

  // const [data2, setData2] = useState(data)

  const { isLoading, isError, data: wbs, error, refetch: refetch_wbs } = useQuery({
    queryKey: ['wbs'],
    // queryFn: deneme,
    queryFn: async () => await RealmApp.currentUser.callFunction("getWbs", { projectName: "Taksim 360" }),
    refetchOnWindowFocus: false,
    enabled: !!RealmApp?.currentUser,
    // staleTime: 5 * 1000, // 1000 milisecond --> 1 second
  })

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!wbs) return "henüz bir wbs oluşturmamışsınız"

  console.log(wbs)



  const handleRight = (e) => {

  }


  return (
    <Grid container direction="column" spacing={1}>

      <Grid item >
        <WbsHeader handleRight={handleRight} />
      </Grid>

      <Grid item>
        <WbsMain data2={wbs} handleCollapse={handleCollapse} />
      </Grid>

    </Grid>

  )
}



const data = [
  {
    id: 1,
    wbs: "1",
    level: 0,
    // hidden: false,
    name: "Alçı Sıva Yapılması"
  },
  {
    id: 2,
    wbs: "1.1",
    level: 1,
    // hidden: false,
    name: "Kara Sıva Yapılması"
  },
  {
    id: 3,
    wbs: "1.2",
    level: 1,
    // hidden: false,
    name: "Laminant Parke Döşenmesi"
  },
  {
    id: 4,
    wbs: "2",
    level: 0,
    // hidden: false,
    name: "Laminant Parke Döşenmesi"
  },
]



// sx={{ backgroundColor:"red" }}
// sx={{ backgroundColor:"red" }}
// sx={{ backgroundColor:"red" }}

