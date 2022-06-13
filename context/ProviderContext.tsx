import React, { createContext, useContext } from "react"

interface ProviderContextProviderProps extends React.PropsWithChildren {
  baseUrl: string
  permissions: any
  token: string
  dataGetter?: (response: any) => any[]
  paginationGetter?: (response: any) => any[]
}

const ProviderContext = createContext<ProviderContextType | null>(null)

const Provider = ({
  children,
  baseUrl,
  permissions,
  token,
  dataGetter,
  paginationGetter,
}: ProviderContextProviderProps) => {
  let ctxDataGetter = typeof dataGetter === "function" ? dataGetter : (response: any) => response?.data?.docs
  let ctxPaginatonGetter = typeof paginationGetter === "function" ? paginationGetter : (response: any) => response?.data
  return (
    <ProviderContext.Provider
      value={{ baseUrl, permissions, token, dataGetter: ctxDataGetter, paginationGetter: ctxPaginatonGetter }}
    >
      {children}
    </ProviderContext.Provider>
  )
}

export function useProviderState() {
  const context = useContext(ProviderContext)
  if (!context) throw new Error("Master Context must be used within MasterContext.Provider")

  return context
}

export default Provider
