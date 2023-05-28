import { createContext, useState } from 'react'

export const StoreContext = createContext(null)

export default ({ children }) => {
  const teamMembersNames = ['John', 'Mary', 'Jason', 'David']

  const [sharing, setSharing] = useState([])
  const [help, setHelp] = useState([])
  const [pairing, setPairing] = useState(teamMembersNames)
  const [isProject, setIsProject] = useState(null)

  const store = {
    sharing, setSharing,
    help, setHelp,
    pairing, setPairing,
    isProject, setIsProject
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}