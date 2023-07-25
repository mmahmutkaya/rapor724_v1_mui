import { createContext, useState } from 'react'

export const StoreContext = createContext(null)

export default ({ children }) => {

  // const teamMembersNames = ['John', 'Mary', 'Jason', 'David']

  // const [sharing, setSharing] = useState([])
  // const [help, setHelp] = useState([])
  const topBarHeight = "3rem"
  const drawerWidth = 240
  const [selectedWbs, setSelectedWbs] = useState()
  const [isProject, setIsProject] = useState()
  const [isContext] = useState(true)

  const store = {
    // sharing, setSharing,
    // help, setHelp,
    // pairing, setPairing,
    topBarHeight,
    drawerWidth,
    selectedWbs, setSelectedWbs,
    isProject, setIsProject,
    isContext
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}