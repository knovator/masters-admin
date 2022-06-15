import React, { createContext, useContext } from "react"

interface ProviderContextProviderProps
  extends React.PropsWithChildren,
    Omit<ProviderContextType, "onError" | "onSuccess"> {
  onError?: (code: string, message: string) => void
  onSuccess?: (code: string, message: string) => void
}

const ProviderContext = createContext<ProviderContextType | null>(null)

const Provider = ({
  children,
  baseUrl,
  permissions,
  token,
  dataGetter,
  paginationGetter,
  onError = () => {},
  onSuccess = () => {},
}: ProviderContextProviderProps) => {
  let ctxDataGetter = typeof dataGetter === "function" ? dataGetter : (response: any) => response?.data?.docs
  let ctxPaginatonGetter = typeof paginationGetter === "function" ? paginationGetter : (response: any) => response?.data
  return (
    <ProviderContext.Provider
      value={{
        baseUrl,
        permissions,
        token,
        dataGetter: ctxDataGetter,
        paginationGetter: ctxPaginatonGetter,
        onError,
        onSuccess,
      }}
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
