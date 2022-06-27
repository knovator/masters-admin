import { SubMasterContextType } from "@knovator/masters-admin"
import React, { createContext, useContext } from "react"
import { PAGE_LIMITS, TRANSLATION_PAIRS_COMMON, TRANSLATION_PAIRS_SUBMASTERS } from "../constants/common"

interface MasterContextProviderProps extends React.PropsWithChildren, Partial<SubMasterContextType> {}

const SubMasterContext = createContext<SubMasterContextType | null>(null)

const SubMasterContextProvider = ({
    t = (key: string) =>
        ((
            {
                ...TRANSLATION_PAIRS_COMMON,
                ...TRANSLATION_PAIRS_SUBMASTERS,
            } as any
        )[key]),
    // Form
    formState = "",
    closeForm = () => {},
    loading = false,
    onChangeFormState = () => {},
    onDataSubmit = () => {},
    updateData = null,
    canAdd = false,
    canUpdate = false,
    onImageUpload = () => Promise.resolve({ fileId: "", fileUrl: "" }),
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
    getSubMastersList = () => Promise.resolve(),
    onUpdate = () => Promise.resolve(),
    setSortConfig = () => {},
    sortConfig = ["createdAt", -1],
    sortable = true,
    canDelete = false,
    canPartialUpdate = false,
    loader = undefined,
    onChangeSequence = () => Promise.resolve(),
    // other
    children,
}: MasterContextProviderProps) => {
    return (
        <SubMasterContext.Provider
            value={{
                t,
                // Form
                closeForm,
                formState,
                loading,
                onChangeFormState,
                onDataSubmit,
                updateData,
                canAdd,
                canUpdate,
                onImageUpload,
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
                getSubMastersList,
                onUpdate,
                setSortConfig,
                sortable,
                sortConfig,
                canDelete,
                canPartialUpdate,
                loader,
                onChangeSequence,
            }}
        >
            {children}
        </SubMasterContext.Provider>
    )
}

export function useSubMasterState() {
    const context = useContext(SubMasterContext)
    if (!context) throw new Error("SubMaster Context must be used within SubMasterContext.Provider")

    return context
}

export default SubMasterContextProvider
