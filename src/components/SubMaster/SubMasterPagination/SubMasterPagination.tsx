import React from "react"
import { Pagination } from "../../../components/Common"
import { useSubMasterState } from "../../../context/SubMasterContext"
import { useProviderState } from "../../../context/ProviderContext"

const SubMasterPagination = () => {
    const { commonTranslations } = useProviderState()
    const {
        limits,
        currentPage,
        pageSize,
        setCurrentPage,
        setPageSize,
        totalPages,
        totalRecords,
        canList,
        sequencing,
    } = useSubMasterState()

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
            disabledPagination={sequencing}
            nextContent={commonTranslations.next}
            ofText={commonTranslations.of}
            pageText={commonTranslations.page}
            previousContent={commonTranslations.previous}
            showingText={commonTranslations.showing}
            showText={commonTranslations.show}
        />
    )
}

export default SubMasterPagination
