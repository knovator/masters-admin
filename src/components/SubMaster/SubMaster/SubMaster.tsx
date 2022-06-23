import React, { useRef } from "react"

import ToggleBtn from "../../../widgets/toggle"
import useSubMaster from "../../../hook/useSubMaster"
import { Drawer, DeleteModal } from "../../../components/Common"
import SubMasterContextProvider from "../../../context/SubMasterContext"
import { useProviderState } from "../../../context/ProviderContext"
import { createTranslation } from "../../../utils/util"
import {
    DEFAULT_LIMIT,
    PAGE_LIMITS,
    DEFAULT_PERMISSIONS,
    TRANSLATION_PAIRS_SUBMASTERS,
    TRANSLATION_PAIRS_COMMON,
} from "../../../constants/common"

import AddButton from "../AddButton"
import SubMasterForm from "../SubMasterForm"
import SubMasterTable from "../SubMasterTable"
import SubMasterSearch from "../SubMasterSearch"
import SubMasterPagination from "../SubMasterPagination"
import SubMasterFormWrapper from "../SubMasterFormWrapper"
import SubMasterFormActions from "../SubMasterFormActions"

interface SubMasterProps extends React.PropsWithChildren {
    sortable?: boolean
    defaultSort?: SortConfigType
    limits?: number[]
    routes?: Routes_Input
    loader?: JSX.Element
    explicitForm?: boolean
    t?: TFunc
    permissions?: PermissionsObj
    preConfirmDelete?: (data: { row: any }) => Promise<boolean>
}

const SubMaster = ({
    sortable = true,
    defaultSort,
    routes,
    limits = PAGE_LIMITS,
    preConfirmDelete,
    loader,
    children,
    permissions = DEFAULT_PERMISSIONS,
    explicitForm,
    t,
}: SubMasterProps) => {
    const derivedT = createTranslation(t, { ...TRANSLATION_PAIRS_SUBMASTERS, ...TRANSLATION_PAIRS_COMMON })
    const columns = [
        {
            Header: derivedT("sequence"),
            accessor: "seq",
        },
        {
            Header: derivedT("name"),
            accessor: "name",
        },
        {
            Header: derivedT("code"),
            accessor: "code",
        },
        {
            Header: derivedT("active"),
            accessor: "isActive",
            Cell({ row, onUpdate }: any) {
                return <ToggleBtn isChecked={row.isActive} onChange={onUpdate} />
            },
        },
    ]
    const { masterCode } = useProviderState()
    const formRef = useRef<HTMLFormElement>(null)
    const {
        list,
        loading,
        partialUpdate,
        totalPages,
        totalRecords,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        sortConfig,
        setSortConfig,
        getSubMastersList,
        // Form
        formState,
        itemData,
        onChangeFormState,
        onCloseForm,
        onDataSubmit,
        onChangeSequence,
        onCofirmDeleteMaster,
        onImageUpload,
    } = useSubMaster({
        defaultLimit: Array.isArray(limits) && limits.length > 0 ? limits[0] : DEFAULT_LIMIT,
        routes,
        defaultSort,
        preConfirmDelete,
    })

    return (
        <div>
            <SubMasterContextProvider
                // Translation
                t={derivedT}
                // Form
                loading={loading}
                formState={formState}
                onChangeFormState={onChangeFormState}
                closeForm={onCloseForm}
                onDataSubmit={onDataSubmit}
                updateData={itemData}
                canAdd={permissions?.add && !!masterCode}
                canUpdate={permissions?.update}
                onImageUpload={onImageUpload}
                // Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalRecords={totalRecords}
                limits={limits ? limits : PAGE_LIMITS}
                canList={permissions?.list}
                // Table
                onUpdate={partialUpdate}
                data={list}
                sortable={sortable}
                sortConfig={sortConfig}
                setSortConfig={setSortConfig}
                columns={columns}
                loader={loader}
                canDelete={permissions?.destroy}
                getSubMastersList={getSubMastersList}
                canPartialUpdate={permissions?.partialUpdate}
                onChangeSequence={onChangeSequence}
            >
                {children ? (
                    children
                ) : (
                    <>
                        <SubMasterSearch />
                        <AddButton />
                        <SubMasterTable />
                        <SubMasterPagination />
                    </>
                )}

                {!explicitForm && (
                    <Drawer
                        open={formState === "ADD" || formState === "UPDATE"}
                        onClose={onCloseForm}
                        title={formState === "ADD" ? derivedT("addSubMaster") : derivedT("updateSubMaster")}
                        footerContent={<SubMasterFormActions formRef={formRef} />}
                    >
                        <SubMasterForm ref={formRef} />
                    </Drawer>
                )}

                <DeleteModal
                    formState={formState}
                    itemData={itemData}
                    onClose={onCloseForm}
                    onConfirmDelete={onCofirmDeleteMaster}
                />
            </SubMasterContextProvider>
        </div>
    )
}

export default Object.assign<
    typeof SubMaster,
    {
        Table: typeof SubMasterTable
        Search: typeof SubMasterSearch
        Pagination: typeof SubMasterPagination
        AddButton: typeof AddButton
        Form: typeof SubMasterForm
        Actions: typeof SubMasterFormActions
        FormWrapper: typeof SubMasterFormWrapper
    }
>(SubMaster, {
    Table: SubMasterTable,
    Search: SubMasterSearch,
    Pagination: SubMasterPagination,
    AddButton,
    Form: SubMasterForm,
    Actions: SubMasterFormActions,
    FormWrapper: SubMasterFormWrapper,
})
