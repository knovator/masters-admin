import React, { useRef } from "react"
import ToggleBtn from "widgets/toggle"
import { Drawer, DeleteModal } from "components/Common"
import { DEFAULT_LIMIT, PAGE_LIMITS, DEFAULT_PERMISSIONS } from "constants/common"

import SubMasterTable from "../SubMasterTable"
import SubMasterPagination from "../SubMasterPagination"
import SubMasterSearch from "../SubMasterSearch"
import AddButton from "../AddButton"
import SubMasterForm from "../SubMasterForm"
import SubMasterFormActions from "../SubMasterFormActions"

// Context
import useSubMaster from "hook/useSubMaster"
import SubMasterContextProvider from "context/SubMasterContext"
import { useProviderState } from "context/ProviderContext"

interface SubMasterProps extends React.PropsWithChildren {
  sortable?: boolean
  defaultSort?: SortConfigType
  limits?: number[]
  routes?: Routes_Input
  loader?: JSX.Element
  explicitForm?: boolean
  permissions?: PermissionsObj
  preConfirmDelete?: (data: { row: any }) => Promise<boolean>
}

const columns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Code",
    accessor: "code",
  },
  {
    Header: "Active",
    accessor: "isActive",
    Cell({ row, onUpdate }: any) {
      return <ToggleBtn isChecked={row.isActive} onChange={onUpdate} />
    },
  },
]

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
}: SubMasterProps) => {
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

    onCofirmDeleteMaster,
  } = useSubMaster({
    defaultLimit: Array.isArray(limits) && limits.length > 0 ? limits[0] : DEFAULT_LIMIT,
    routes,
    defaultSort,
    preConfirmDelete,
  })

  return (
    <div>
      <SubMasterContextProvider
        // Form
        loading={loading}
        formState={formState}
        onChangeFormState={onChangeFormState}
        closeForm={onCloseForm}
        onDataSubmit={onDataSubmit}
        updateData={itemData}
        canAdd={permissions?.add && !!masterCode}
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
        getSubMastersList={getSubMastersList}
        canPartialUpdate={permissions?.partialUpdate}
      >
        {children ? (
          children
        ) : (
          <>
            <SubMasterSearch />
            <AddButton label="Add Sub Master" />
            <SubMasterTable />
            <SubMasterPagination />
          </>
        )}

        {!explicitForm && (
          <Drawer
            open={formState === "ADD" || formState === "UPDATE"}
            onClose={onCloseForm}
            title={formState === "ADD" ? "Add Sub Master" : "Edit Sub Master"}
            footerContent={
              <SubMasterFormActions addLabel="Add Sub Master" editLabel="Edit Sub Master" formRef={formRef} />
            }
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

export default Object.assign(SubMaster, {
  Table: SubMasterTable,
  Search: SubMasterSearch,
  Pagination: SubMasterPagination,
  AddButton,
  Form: SubMasterForm,
  Actions: SubMasterFormActions,
})
