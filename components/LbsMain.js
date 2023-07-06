import { useState } from 'react'


//mui
import Box from '@mui/material/Grid';


const level_0 = 0
const level_1 = 1
const level_2 = 2
const level_3 = 3
const level_4 = 4
const level_5 = 5


const Item = ({ index }) => (
  <Box sx={{ backgroundColor: bgColor(index).bg }}></Box>
);

const Items = ({ count }) => (
  Array.from({ length: count }).map((_item, index) => <Item key={index + 1} index={index} />)
)


export default function LbsMain({ data2, setSelected }) {

  let modeOn = {
    height: "1.5rem",
    color: "black"
  }

  let modeOff = {
    height: "0rem",
    color: "white"
  }

  return (

    <Box display="grid" p={1}>

      {
        data2.map((index, { lbs = 1, name = "alcipan" }) => {

          // let level = lbs.split(".").length;

          let hidden = false;
          let level = 1;


          return (
            <Box
              key={index}
              display="grid"
              onClick={() => setSelected(id)}
              sx={{
                color: !hidden ? modeOn.color : modeOff.color,
                height: !hidden ? modeOn.height : modeOff.height,
                transition: "0.5s",
                gridTemplateColumns: "repeat(" + level + ", 1rem) 1fr"
              }}>

              <Items count={level} />

              <Box sx={{
                "&:hover": {
                  backgroundColor: 'rgb(7, 177, 77, 0.42)'
                }
              }}>
                {lbs + " " + name}
              </Box>

              {/* <Box sx={{ backgroundColor: bgColor(level).bg, color: bgColor(level).co }}>{name}</Box> */}
            </Box>
          )

        })

      }

    </Box>

  )
}



function bgColor(index) {
  return { bg: "white", co: "black" }
}


// function bgColor(index) {
//   switch (index) {
//     case 0:
//       return {bg:"#202020", co:"white"}
//     case 1:
//       return {bg:"#660033", co:"white"}
//     case 2:
//       return {bg:"#330066", co:"white"}
//     case 3:
//       return {bg:"#006666", co:"white"}
//     case 4:
//       return {bg:"#303030", co:"white"}
//     case 5:
//       return {bg:"#550033", co:"white"}
//     case 6:
//       return {bg:"#330055", co:"white"}
//     case 7:
//       return {bg:"#005555", co:"white"}
//   }
// }




// function bgColor(index) {
//   switch (index) {
//     case 0:
//       return "#a6e7ff";
//     case 1:
//       return "#efc5b5";
//     case 2:
//       return "#aaffaa";
//     case 3:
//       return "#eeaaff";
//     case 4:
//       return "#f1f33f";
//     case 5:
//       return "#a6e7ff";
//     case 6:
//       return "#f2dea4";
//     case 7:
//       return "#aefd6c";
//   }
// }



// const data = [
//   {
//     id: 1,
//     level: 0,
//     name: "Alçı Sıva Yapılması"
//   },
//   {
//     id: 2,
//     level: 1,
//     name: "Kara Sıva Yapılması"
//   },
//   {
//     id: 3,
//     level: 1,
//     name: "Laminant Parke Döşenmesi"
//   },
//   {
//     id: 4,
//     level: 2,
//     name: "Şap Dökülmesi"
//   },
//   {
//     id: 5,
//     level: 1,
//     name: "İzolasyon Yapılması"
//   },
//   {
//     id: 6,
//     level: 2,
//     name: "İzolasyon Yapılması"
//   },
//   {
//     id: 7,
//     level: 3,
//     name: "İzolasyon Yapılması"
//   },
//   {
//     id: 8,
//     level: 4,
//     name: "İzolasyon Yapılması"
//   },
//   {
//     id: 9,
//     level: 4,
//     name: "İzolasyon Yapılması"
//   },
//   {
//     id: 10,
//     level: 5,
//     name: "İzolasyon Yapılması"
//   },
//   {
//     id: 11,
//     level: 6,
//     name: "İzolasyon Yapılması"
//   },
//   {
//     id: 12,
//     level: 7,
//     name: "İzolasyon Yapılması"
//   },
//   {
//     id: 13,
//     level: 6,
//     name: "İzolasyon Yapılması"
//   },
//   {
//     id: 14,
//     level: 7,
//     name: "İzolasyon Yapılması"
//   },
// ]


