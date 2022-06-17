import React, { createContext, useContext } from "react"

interface TableContextProviderProps extends React.PropsWithChildren, TableContextType {}

const TableContext = createContext<TableContextType | null>(null)

const TableContextProvider = ({
  onUpdate,
  sortable,
  sortConfig,
  setSortConfig,
  columns,
  data,
  children,
  loader,
  loading,
  onChangeFormState,
  canDelete = false,
  canList = false,
  canUpdate = false,
  canPartialUpdate = false,
  getMastersList,
}: TableContextProviderProps) => {
  return (
    <TableContext.Provider
      value={{
        onChangeFormState,
        onUpdate,
        sortConfig,
        setSortConfig,
        sortable,
        columns,
        data,
        loader,
        loading,
        canDelete,
        canList,
        canUpdate,
        canPartialUpdate,
        getMastersList,
      }}
    >
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
