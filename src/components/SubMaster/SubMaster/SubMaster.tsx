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

const SubMaster = ({
    sortable = true,
    defaultSort,
    routes,
    limits = PAGE_LIMITS,
    preConfirmDelete,
    loader,
    children,
    imageBaseUrl,
    permissions = DEFAULT_PERMISSIONS,
    explicitForm,
    t,
}: SubMasterProps) => {
    const { switchClass } = useProviderState()
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
                return <ToggleBtn isChecked={row.isActive} onChange={onUpdate} switchClass={switchClass} />
            },
        },
    ]
    const { selectedMaster } = useProviderState()
    const formRef = useRef<HTMLFormElement>(null)
    const {
        list,
        getSubMastersList,
        loading,
        partialUpdate,
        onChangeSequence,
        sequencing,
        setSequencing,
        onConfirmSequence,
        // Pagination
        pageSize,
        totalPages,
        currentPage,
        totalRecords,
        setCurrentPage,
        setPageSize,
        // Sorting
        sortConfig,
        setSortConfig,
        // Form
        formState,
        itemData,
        onChangeFormState,
        onCloseForm,
        onDataSubmit,
        onCofirmDeleteMaster,
        onImageUpload,
        onImageRemove,
        // pagination
        searchStr,
        setSearchStr,
    } = useSubMaster({
        defaultLimit: Array.isArray(limits) && limits.length > 0 ? limits[0] : DEFAULT_LIMIT,
        routes,
        defaultSort,
        imageBaseUrl,
        preConfirmDelete,
    })

    return (
        <div>
            <SubMasterContextProvider
                // Translation
                t={derivedT}
                // Form
                imageBaseUrl={imageBaseUrl}
                loading={loading}
                formState={formState}
                onChangeFormState={onChangeFormState}
                closeForm={onCloseForm}
                onDataSubmit={onDataSubmit}
                updateData={itemData}
                canAdd={permissions?.add && !!selectedMaster}
                canUpdate={permissions?.update}
                onImageUpload={onImageUpload}
                onImageRemove={onImageRemove}
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
                sequencing={sequencing}
                setSequencing={setSequencing}
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
                onConfirmSequence={onConfirmSequence}
                // Pagination
                searchStr={searchStr}
                setSearchStr={setSearchStr}
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

SubMaster.Table = SubMasterTable
SubMaster.Pagination = SubMasterPagination
SubMaster.Search = SubMasterSearch
SubMaster.AddButton = AddButton
SubMaster.Form = SubMasterForm
SubMaster.FormActions = SubMasterFormActions
SubMaster.FormWrapper = SubMasterFormWrapper

export default SubMaster