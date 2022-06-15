import React, { createContext, useContext } from "react"

interface PaginationContextProviderProps extends React.PropsWithChildren {
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
  pageSize: number
  setPageSize: (size: number) => void
  totalRecords: number
  limits: number[]
}

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
}: PaginationContextProviderProps) => {
  return (
    <PaginationContext.Provider
      value={{ currentPage, pageSize, setCurrentPage, setPageSize, totalPages, totalRecords, limits }}
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
