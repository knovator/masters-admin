import React, { createContext, useContext } from "react"

interface MasterContextProviderProps extends React.PropsWithChildren, MasterContextType {}

const MasterContext = createContext<MasterContextType | null>(null)

const MasterContextProvider = ({ children, getMastersList }: MasterContextProviderProps) => {
  return (
    <MasterContext.Provider
      value={{
        getMastersList,
      }}
    >
      {children}
    </MasterContext.Provider>
  )
}

export function useMasterState() {
  const context = useContext(MasterContext)
  if (!context) throw new Error("Master Context must be used within MasterContextProvider")

  return context
}

export default MasterContextProvider
