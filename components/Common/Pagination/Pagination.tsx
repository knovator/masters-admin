import { Button } from "components/Common"
import { PAGE_LIMIT } from "constants/common"

interface PaginationProps {
  totalPages: number
  currentPage: number
  setCurrentPage: (page: number) => void
  pageSize: number
  setPageSize: (size: number) => void
}

const Pagination = ({ totalPages, currentPage, pageSize, setPageSize, setCurrentPage }: PaginationProps) => {
  const pageHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // @ts-ignore
      setCurrentPage(Number.parseInt(e.target.value, 10) || 1)
    }
  }
  const handleNumbers = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["e", "+", "-"].includes(e.key)) {
      e.preventDefault()
    }
  }
  const pageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && Number(e.target.value) <= totalPages && e.target.value !== "0") {
      setCurrentPage(Number.parseInt(e.target.value, 10))
    }
  }
  return (
    <div className="kms_pagination">
      <Button label="Previous" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage - 1 === 0} />

      <div className="kms_pagination-pager">
        Page
        <input
          className="kms_input w-10"
          maxLength={3}
          pattern="([0-9]|[0-9]|[0-9])"
          type="number"
          onKeyDown={handleNumbers}
          onKeyPress={pageHandler}
          value={currentPage}
          onChange={pageChange}
        />
        of {totalPages}
      </div>
      <select value={pageSize} className="kms_input p-2" onChange={(e) => setPageSize(Number(e.target.value))}>
        {PAGE_LIMIT.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
      <Button label="Next" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
    </div>
  )
}

export default Pagination
