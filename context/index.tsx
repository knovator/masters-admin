import React, { createContext, useContext } from "react"
interface MasterContextInterface {
  baseUrl: string
  permissions: any
  token: string
}

interface ProviderProps extends React.PropsWithChildren {
  baseUrl: string
  permissions: any
  token: string
}

const MasterContext = createContext<MasterContextInterface | null>(null)

const Provider = ({ children, baseUrl, permissions, token }: ProviderProps) => {
  return <MasterContext.Provider value={{ baseUrl, permissions, token }}>{children}</MasterContext.Provider>
}

export function useMasterState() {
  const context = useContext(MasterContext)
  if (!context) throw new Error("Master Context must be used within MasterContext.Provider")

  return context
}

export default Provider
