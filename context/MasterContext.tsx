import React, { createContext, useContext } from "react"

interface MasterContextType {
  onUpdate: (id: string, data: any) => Promise<void>
  limits: number[]
  sortConfig: SortConfigType
  setSortConfig: (config: SortConfigType) => void
  sortable: boolean
}

interface MasterContextProviderProps extends React.PropsWithChildren {
  onUpdate: (id: string, data: any) => Promise<void>
  limits: number[]
  sortConfig: SortConfigType
  setSortConfig: (config: SortConfigType) => void
  sortable: boolean
}

const MasterContext = createContext<MasterContextType | null>(null)

const MasterContextProvider = ({
  onUpdate,
  limits,
  children,
  sortable,
  sortConfig,
  setSortConfig,
}: MasterContextProviderProps) => {
  return (
    <MasterContext.Provider value={{ onUpdate, limits, sortConfig, setSortConfig, sortable }}>
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
