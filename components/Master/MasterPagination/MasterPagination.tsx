import { Pagination } from "components/Common"
import { useMasterState } from "context/MasterContext"

const MasterPagination = () => {
  const { limits, currentPage, pageSize, setCurrentPage, setPageSize, totalPages, totalRecords, canList } =
    useMasterState()

  if (!canList) return null
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
