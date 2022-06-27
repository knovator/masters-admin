import React, { useRef } from "react"

import ToggleBtn from "../../../widgets/toggle"
import useMaster from "../../../hook/useMaster"
import { MasterProps } from "@knovator/masters-admin"
import { createTranslation } from "../../../utils/util"
import { Drawer, DeleteModal } from "../../../components/Common"
import MasterContextProvider from "../../../context/MasterContext"
import {
    DEFAULT_LIMIT,
    PAGE_LIMITS,
    DEFAULT_PERMISSIONS,
    TRANSLATION_PAIRS_MASTERS,
    TRANSLATION_PAIRS_COMMON,
} from "../../../constants/common"

import Lister from "../Lister"
import AddButton from "../AddButton"
import MasterForm from "../MasterForm"
import MasterTable from "../MasterTable"
import MasterFormActions from "../MasterFormActions"
import MasterFormWrapper from "../MasterFormWrapper"
import MasterPagination from "../MasterPagination"
import MasterSearch from "../MasterSearch"

const Master = ({
    sortable = true,
    defaultSort,
    routes,
    limits = PAGE_LIMITS,
    explicitForm = false,
    children,
    preConfirmDelete,
    loader,
    t = undefined,
    permissions = DEFAULT_PERMISSIONS,
}: MasterProps) => {
    const derivedT = createTranslation(t, { ...TRANSLATION_PAIRS_MASTERS, ...TRANSLATION_PAIRS_COMMON })
    const formRef = useRef<HTMLFormElement | null>(null)
    const columns = [
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
        getMastersList,
        // Form
        formState,
        itemData,
        onChangeFormState,
        onCloseForm,
        onDataSubmit,
        onCofirmDeleteMaster,
    } = useMaster({
        defaultLimit: Array.isArray(limits) && limits.length > 0 ? limits[0] : DEFAULT_LIMIT,
        routes,
        defaultSort,
        preConfirmDelete,
    })

    return (
        <div>
            <MasterContextProvider
                t={derivedT}
                // Form
                loading={loading}
                formState={formState}
                onChangeFormState={onChangeFormState}
                closeForm={onCloseForm}
                onDataSubmit={onDataSubmit}
                updateData={itemData}
                canAdd={permissions?.add}
                canUpdate={permissions?.update}
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
                getMastersList={getMastersList}
                canPartialUpdate={permissions?.partialUpdate}
            >
                {children ? (
                    children
                ) : (
                    <>
                        <MasterSearch />
                        <AddButton />
                        <MasterTable />
                        <MasterPagination />
                    </>
                )}

                {!explicitForm && (
                    <Drawer
                        open={formState === "ADD" || formState === "UPDATE"}
                        onClose={onCloseForm}
                        title={
                            formState === "ADD"
                                ? derivedT("addMaster")
                                : formState === "UPDATE"
                                ? derivedT("updateMaster")
                                : ""
                        }
                        footerContent={<MasterFormActions formRef={formRef} />}
                    >
                        <MasterForm ref={formRef} />
                    </Drawer>
                )}

                <DeleteModal
                    formState={formState}
                    itemData={itemData}
                    onClose={onCloseForm}
                    onConfirmDelete={onCofirmDeleteMaster}
                />
            </MasterContextProvider>
        </div>
    )
}

export default Object.assign<
    typeof Master,
    {
        Table: typeof MasterTable
        Pagination: typeof MasterPagination
        Search: typeof MasterSearch
        AddButton: typeof AddButton
        Form: typeof MasterForm
        Lister: typeof Lister
        FormActions: typeof MasterFormActions
        FormWrapper: typeof MasterFormWrapper
    }
>(Master, {
    Table: MasterTable,
    Pagination: MasterPagination,
    Search: MasterSearch,
    AddButton,
    Lister,
    Form: MasterForm,
    FormActions: MasterFormActions,
    FormWrapper: MasterFormWrapper,
})
