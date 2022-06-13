import { Pagination } from "components/Common"
import { useMasterState } from "context/MasterContext"

interface MasterPaginationChildrenProps {
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
  pageSize: number
  setPageSize: (size: number) => void
  totalRecords: number
  limits: number[]
}
interface MasterPaginationProps {
  children?: (props: MasterPaginationChildrenProps) => any
}

const MasterPagination = ({ children }: MasterPaginationProps) => {
  const { limits, currentPage, pageSize, setCurrentPage, setPageSize, totalPages, totalRecords } = useMasterState()
  if (children && typeof children === "function") {
    return children({ limits, currentPage, pageSize, setCurrentPage, setPageSize, totalPages, totalRecords })
  }
  return (
    <Pagination
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPages={totalPages}
      pageSize={pageSize}
      setPageSize={setPageSize}
      totalRecords={totalRecords}
      limits={limits}
    />
  )
}

export default Object.assign(MasterPagination, { Pagination: Pagination })
