import { createContext, useState } from 'react'

export const StoreContext = createContext(null)

export default ({ children }) => {

  // const teamMembersNames = ['John', 'Mary', 'Jason', 'David']

  // const [sharing, setSharing] = useState([])
  // const [help, setHelp] = useState([])

  
  const myTema_ = {
    firstColor: "#3c4245",
    secondColor: "#5f6769",
    thirdColor:"#719192",
    fouthColor:"#dfcdc3"
  }
  
  const topBarHeight = "3.5rem"
  const subHeaderHeight = "3.5rem"
  const drawerWidth = 240
  const [selectedLbs, setSelectedLbs] = useState()
  const [selectedWbs, setSelectedWbs] = useState()
  const [selectedPoz, setSelectedPoz] = useState()
  const [selectedMahal, setSelectedMahal] = useState()
  const [selectedMahalBaslik, setSelectedMahalBaslik] = useState()
  const [selectedPozBaslik, setSelectedPozBaslik] = useState()
  const [isProject, setIsProject] = useState()
  const [pozlar, setPozlar] = useState()
  const [mahalMetrajlar, setMahalMetrajlar] = useState()
  const [mahaller, setMahaller] = useState()
  const [mahalListesi, setMahalListesi] = useState()
  const [isContext] = useState(true)
  const [myTema, setMyTema] = useState(myTema_)
  


  const store = {
    // sharing, setSharing,
    // help, setHelp,
    // pairing, setPairing,
    subHeaderHeight,
    topBarHeight,
    drawerWidth,
    selectedLbs, setSelectedLbs,
    selectedMahal, setSelectedMahal,
    selectedMahalBaslik, setSelectedMahalBaslik,
    selectedPozBaslik, setSelectedPozBaslik,
    selectedWbs, setSelectedWbs,
    selectedPoz, setSelectedPoz,
    isProject, setIsProject,
    pozlar, setPozlar,
    mahaller, setMahaller,
    mahalMetrajlar, setMahalMetrajlar,
    mahalListesi, setMahalListesi,
    isContext,
    myTema, setMyTema
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}