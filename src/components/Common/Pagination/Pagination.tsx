import React from "react"
import Button from "../Button"

const Pagination = ({
    totalPages,
    currentPage,
    pageSize,
    setPageSize,
    setCurrentPage,
    totalRecords,
    limits,
    disabledPagination,

    pageText,
    showText,
    showingText,
    ofText,
    nextContent,
    previousContent,
}: PaginationProps) => {
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
            <div>
                {showingText} {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalRecords)}{" "}
                {ofText} {totalRecords}
            </div>
            <div className="kms_pagination-actions">
                <Button
                    label={previousContent}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage - 1 === 0 || !!disabledPagination}
                />
                <div className="kms_pagination-pager">
                    {pageText}
                    <input
                        className="kms_input kms_input-sm kms_w-10"
                        maxLength={3}
                        pattern="([0-9]|[0-9]|[0-9])"
                        type="number"
                        onKeyDown={handleNumbers}
                        onKeyPress={pageHandler}
                        value={currentPage}
                        onChange={pageChange}
                        disabled={!!disabledPagination}
                    />
                    / {totalPages}
                </div>
                {Array.isArray(limits) ? (
                    <select
                        value={pageSize}
                        className="kms_input kms_input-sm"
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        disabled={!!disabledPagination}
                    >
                        {limits.map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {showText} {pageSize}
                            </option>
                        ))}
                    </select>
                ) : null}
                <Button
                    label={nextContent}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages || !!disabledPagination}
                />
            </div>
        </div>
    )
}

Pagination.type = "Pagination"

export default Pagination
