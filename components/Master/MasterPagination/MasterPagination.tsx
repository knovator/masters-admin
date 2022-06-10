import { Pagination } from "components/Common"
import { useMasterState } from "context/MasterContext"

type MasterPaginationProps = Omit<PaginationProps, "limits">

const MasterPagination = ({
  totalPages,
  currentPage,
  pageSize,
  setPageSize,
  setCurrentPage,
  totalRecords,
}: MasterPaginationProps) => {
  const { limits } = useMasterState()
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
