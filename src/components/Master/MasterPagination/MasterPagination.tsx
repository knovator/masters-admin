import React from "react"
import { Pagination } from "../../../components/Common"
import { useMasterState } from "../../../context/MasterContext"

const MasterPagination = () => {
    const { limits, currentPage, pageSize, setCurrentPage, setPageSize, totalPages, totalRecords, canList, t } =
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
            pageLabel={t("page")}
        />
    )
}

export default MasterPagination
