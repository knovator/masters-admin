import React from "react"
import { Pagination } from "../../../components/Common"
import { useMasterState } from "../../../context/MasterContext"
import { useProviderState } from "../../../context/ProviderContext"

const MasterPagination = () => {
    const { commonTranslations } = useProviderState()
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
            nextContent={commonTranslations.next}
            previousContent={commonTranslations.previous}
            ofText={commonTranslations.of}
            pageText={commonTranslations.page}
            showingText={commonTranslations.showing}
            showText={commonTranslations.show}
        />
    )
}

export default MasterPagination
