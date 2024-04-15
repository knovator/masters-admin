import React, { createContext, useContext } from "react"
import { PAGE_LIMITS, TRANSLATION_PAIRS_MASTERS } from "../constants/common"

interface MasterContextProviderProps extends React.PropsWithChildren, Omit<MasterContextType, "masterTranslations"> {
    masterTranslations?: Partial<MasterTranslations>
}

const MasterContext = createContext<MasterContextType | null>(null)

const MasterContextProvider = ({
    // Form
    languages = [],
    formState = "",
    closeForm = () => {},
    loading = false,
    onChangeFormState = () => {},
    onDataSubmit = () => {},
    updateData = null,
    canAdd = false,
    canUpdate = false,
    // Pagination
    currentPage = 1,
    limits = PAGE_LIMITS,
    pageSize = PAGE_LIMITS[0],
    setCurrentPage = () => {},
    setPageSize = () => {},
    totalPages = 0,
    totalRecords = 0,
    canList = false,
    // Table
    columns = [],
    data = [],
    getMastersList = () => Promise.resolve(),
    onUpdate = () => Promise.resolve(),
    setSortConfig = () => {},
    sortConfig = ["createdAt", -1],
    sortable = true,
    canDelete = false,
    canPartialUpdate = false,
    loader = undefined,
    searchStr = "",
    masterTranslations,
    setSearchStr = () => {},
    // other
    children,
}: MasterContextProviderProps) => {
    return (
        <MasterContext.Provider
            value={{
                // Form
                languages,
                closeForm,
                formState,
                loading,
                onChangeFormState,
                onDataSubmit,
                updateData,
                canAdd,
                canUpdate,
                // Pagination
                currentPage,
                limits,
                pageSize,
                setCurrentPage,
                setPageSize,
                totalPages,
                totalRecords,
                canList,
                // Table
                columns,
                data,
                getMastersList,
                onUpdate,
                setSortConfig,
                sortable,
                sortConfig,
                canDelete,
                canPartialUpdate,
                loader,
                // pagination
                searchStr,
                setSearchStr,
                masterTranslations: {
                    ...TRANSLATION_PAIRS_MASTERS,
                    ...masterTranslations,
                },
            }}
        >
            {children}
        </MasterContext.Provider>
    )
}

export function useMasterState() {
    const context = useContext(MasterContext)
    if (!context) throw new Error("Master Context must be used within MasterContext.Provider")

    return context
}

export default MasterContextProvider
