import React from 'react'

//mui
import Box from '@mui/material/Grid';


const level_0 = 0
const level_1 = 1
const level_2 = 2
const level_3 = 3
const level_4 = 4
const level_5 = 5

const renk_1 = "red"
const renk_2 = "yellow"

const Item = ({ index }) => (
  <Box sx={{ backgroundColor: bgColor(index) }}>{index}</Box>
);

const Items = ({ count }) => (
  Array.from({ length: count }).map((_item, index) => <Item key={index} index={index} />)
)

export default function WbsMain() {

  return (

    <Box display="grid" p={1}>

      {
        data.map(({ id, level, name }) => {

          return (
            <Box key={id} display="grid" sx={{ gridTemplateColumns: "repeat(" + level + ", 1rem) 1fr" }}>
              <Items count={level} />
              <Box sx={{ backgroundColor: bgColor(level) }}>{name}</Box>
            </Box>
          )

          // return (
          //   <div key={id.toString()}>
          //     <Box display="grid" sx={{ gridTemplateColumns: "repeat(" + level + ", 1rem) 1fr" }}>
          //       {/* <Levels count={level} /> */}
          //       <Box sx={{ backgroundColor: bgColor(level) }}>{metin}</Box>
          //     </Box>
          //   </div>
          // )

        })

      }

    </Box>

  )
}


{/* <Box display="grid" sx={{ gridTemplateColumns: "2rem 1fr" }}>
  <Box sx={{ backgroundColor: renk_1 }}>xs=8</Box>
  <Box sx={{ backgroundColor: renk_2 }}>xs=8</Box>
</Box> */}

// const Level = ({ index }) => (
//   <Box sx={{ backgroundColor: bgColor(index) }} />
// );

// const Levels = ({ count }) => (
//   Array.from({ length: count }).map((_item, index) => <Level index={index} />)
// )




// const Item = ({ level, metin }) => {
//   return (
//     <Box display="grid" sx={{ gridTemplateColumns: "repeat(" + level + ", 1rem) 1fr" }}>
//       <Levels count={level} />
//       <Box sx={{ backgroundColor: bgColor(level) }}>{metin}</Box>
//     </Box>
//   )
// }


function bgColor(index) {
  switch (index) {
    case 0:
      return "red";
    case 1:
      return "blue";
    case 2:
      return "yellow";
    case 3:
      return "aqua";
    case 4:
      return "red";
    case 5:
      return "red";
    case 6:
      return "red";
  }
}



const data = [
  {
    id: 1,
    level: 2,
    name: "Alçı Sıva Yapılması"
  },
  {
    id: 2,
    level: 3,
    name: "Kara Sıva Yapılması"
  },
  {
    id: 3,
    level: 4,
    name: "Laminant Parke Döşenmesi"
  },
  {
    id: 4,
    level: 5,
    name: "Şap Dökülmesi"
  },
  {
    id: 5,
    level: 7,
    name: "İzolasyon Yapılması"
  },
]


