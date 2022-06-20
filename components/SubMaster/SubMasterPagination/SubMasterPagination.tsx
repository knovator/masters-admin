import { Pagination } from "components/Common"
import { useSubMasterState } from "context/SubMasterContext"

const SubMasterPagination = () => {
  const { limits, currentPage, pageSize, setCurrentPage, setPageSize, totalPages, totalRecords, canList } =
    useSubMasterState()

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

export default SubMasterPagination
