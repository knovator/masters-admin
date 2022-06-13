import React, { createContext, useContext } from "react"

interface MasterContextProviderProps extends React.PropsWithChildren {
  onUpdate: (id: string, data: any) => Promise<void>
  limits: number[]
  sortConfig: SortConfigType
  setSortConfig: (config: SortConfigType) => void
  sortable: boolean

  // Table
  columns: ColumnsSchema
  data: any[]

  // Pagination
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
  pageSize: number
  setPageSize: (size: number) => void
  totalRecords: number

  // Search
  getMastersList: (search?: string) => Promise<void>
}

const MasterContext = createContext<MasterContextType | null>(null)

const MasterContextProvider = ({
  onUpdate,
  limits,
  children,
  sortable,
  sortConfig,
  setSortConfig,

  // Table
  columns,
  data,

  // Pagination
  currentPage,
  pageSize,
  setCurrentPage,
  setPageSize,
  totalPages,
  totalRecords,

  // Search
  getMastersList,
}: MasterContextProviderProps) => {
  return (
    <MasterContext.Provider
      value={{
        onUpdate,
        limits,
        sortConfig,
        setSortConfig,
        sortable,
        columns,
        data,
        currentPage,
        pageSize,
        setCurrentPage,
        setPageSize,
        totalPages,
        totalRecords,
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
