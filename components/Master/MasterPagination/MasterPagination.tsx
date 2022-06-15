import { Pagination } from "components/Common"
import { usePaginationState } from "context/PaginationContext"

const MasterPagination = () => {
  const { limits, currentPage, pageSize, setCurrentPage, setPageSize, totalPages, totalRecords } = usePaginationState()

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

export default MasterPagination
