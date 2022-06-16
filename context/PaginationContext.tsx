import React, { createContext, useContext } from "react"

interface PaginationContextProviderProps extends React.PropsWithChildren, PaginationContextType {}

const PaginationContext = createContext<PaginationContextType | null>(null)

const PaginationContextProvider = ({
  currentPage,
  pageSize,
  limits,
  setCurrentPage,
  setPageSize,
  totalPages,
  totalRecords,
  children,
  canList,
}: PaginationContextProviderProps) => {
  return (
    <PaginationContext.Provider
      value={{ currentPage, pageSize, setCurrentPage, setPageSize, totalPages, totalRecords, limits, canList }}
    >
      {children}
    </PaginationContext.Provider>
  )
}

export function usePaginationState() {
  const context = useContext(PaginationContext)
  if (!context) throw new Error("Pagination Context must be used within PaginationContext.Provider")

  return context
}

export default PaginationContextProvider
