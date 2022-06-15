import React, { createContext, useContext } from "react"

interface TableContextProviderProps extends React.PropsWithChildren {
  onUpdate: (id: string, data: any) => Promise<void>
  sortConfig: SortConfigType
  setSortConfig: (config: SortConfigType) => void
  onChangeFormState: (status: FormActionTypes, data?: any) => void
  sortable: boolean
  columns: ColumnsSchema
  data: any[]
}

const TableContext = createContext<TableContextType | null>(null)

const TableContextProvider = ({
  onUpdate,
  sortable,
  sortConfig,
  setSortConfig,
  columns,
  data,
  children,
  onChangeFormState,
}: TableContextProviderProps) => {
  return (
    <TableContext.Provider value={{ onChangeFormState, onUpdate, sortConfig, setSortConfig, sortable, columns, data }}>
      {children}
    </TableContext.Provider>
  )
}

export function useTableState() {
  const context = useContext(TableContext)
  if (!context) throw new Error("Table Context must be used within TableContext.Provider")

  return context
}

export default TableContextProvider
