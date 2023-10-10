import { createContext, useState } from 'react'

export const StoreContext = createContext(null)

export default ({ children }) => {

  // const teamMembersNames = ['John', 'Mary', 'Jason', 'David']

  // const [sharing, setSharing] = useState([])
  // const [help, setHelp] = useState([])
  const topBarHeight = "3.5rem"
  const subHeaderHeight = "3.5rem"
  const drawerWidth = 240
  const [selectedLbs, setSelectedLbs] = useState()
  const [selectedWbs, setSelectedWbs] = useState()
  const [selectedPoz, setSelectedPoz] = useState()
  const [selectedMahal, setSelectedMahal] = useState()
  const [isProject, setIsProject] = useState()
  const [pozlar, setPozlar] = useState()
  const [mahaller, setMahaller] = useState()
  const [mahalListesi, setMahalListesi] = useState()
  const [isContext] = useState(true)

  const store = {
    // sharing, setSharing,
    // help, setHelp,
    // pairing, setPairing,
    subHeaderHeight,
    topBarHeight,
    drawerWidth,
    selectedLbs, setSelectedLbs,
    selectedMahal, setSelectedMahal,
    selectedWbs, setSelectedWbs,
    selectedPoz, setSelectedPoz,
    isProject, setIsProject,
    pozlar, setPozlar,
    mahaller, setMahaller,
    mahalListesi, setMahalListesi,
    isContext
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}