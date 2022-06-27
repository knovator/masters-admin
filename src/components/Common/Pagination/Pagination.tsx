import React from "react"
import Button from "../Button"
import { PaginationProps } from "@knovator/masters-admin"

const Pagination = ({
    totalPages,
    currentPage,
    pageSize,
    setPageSize,
    setCurrentPage,
    totalRecords,
    limits,
    pageLabel = "Page",
    nextLabel = "Next",
    previousLabel = "Previous",
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
                {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalRecords)} of {totalRecords}
            </div>
            <div className="kms_pagination-actions">
                <Button
                    size="sm"
                    label={previousLabel}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage - 1 === 0}
                />
                <div className="kms_pagination-pager">
                    {pageLabel}
                    <input
                        className="kms_input kms_input-sm w-10"
                        maxLength={3}
                        pattern="([0-9]|[0-9]|[0-9])"
                        type="number"
                        onKeyDown={handleNumbers}
                        onKeyPress={pageHandler}
                        value={currentPage}
                        onChange={pageChange}
                    />
                    / {totalPages}
                </div>
                {Array.isArray(limits) ? (
                    <select
                        value={pageSize}
                        className="kms_input kms_input-sm"
                        onChange={(e) => setPageSize(Number(e.target.value))}
                    >
                        {limits.map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                ) : null}
                <Button
                    size="sm"
                    label={nextLabel}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
            </div>
        </div>
    )
}

Pagination.type = "Pagination"

export default Pagination
