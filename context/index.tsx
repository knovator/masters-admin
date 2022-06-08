import React, { createContext, useContext } from "react"

interface ProviderProps extends React.PropsWithChildren {
  baseUrl: string
  permissions: any
  token: string
  dataGetter?: (response: any) => any[]
  paginationGetter?: (response: any) => any[]
}

const MasterContext = createContext<MasterContextInterface | null>(null)

const Provider = ({ children, baseUrl, permissions, token, dataGetter, paginationGetter }: ProviderProps) => {
  let ctxDataGetter = typeof dataGetter === "function" ? dataGetter : (response: any) => response?.data?.docs
  let ctxPaginatonGetter = typeof paginationGetter === "function" ? paginationGetter : (response: any) => response?.data
  return (
    <MasterContext.Provider
      value={{ baseUrl, permissions, token, dataGetter: ctxDataGetter, paginationGetter: ctxPaginatonGetter }}
    >
      {children}
    </MasterContext.Provider>
  )
}

export function useMasterState() {
  const context = useContext(MasterContext)
  if (!context) throw new Error("Master Context must be used within MasterContext.Provider")

  return context
}

export default Provider
