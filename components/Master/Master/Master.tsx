import React, { useRef } from "react"
import useMaster from "hook/useMaster"
import ToggleBtn from "widgets/toggle"
import { Drawer, DeleteModal } from "components/Common"
import MasterContextProvider from "context/MasterContext"
import { DEFAULT_LIMIT, PAGE_LIMITS, DEFAULT_PERMISSIONS } from "constants/common"

import AddButton from "../AddButton"
import MasterForm from "../MasterForm"
import Lister from "../Lister"
import MasterFormActions from "../MasterFormActions"
import MasterFormWrapper from "../MasterFormWrapper"
import MasterPagination from "../MasterPagination"
import MasterSearch from "../MasterSearch"
import MasterTable from "../MasterTable"

interface MasterProps extends React.PropsWithChildren {
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

const Master = ({
  sortable = true,
  defaultSort,
  routes,
  limits = PAGE_LIMITS,
  explicitForm = false,
  children,
  preConfirmDelete,
  loader,
  permissions = DEFAULT_PERMISSIONS,
}: MasterProps) => {
  const formRef = useRef<HTMLFormElement | null>(null)
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
            title={formState === "ADD" ? "Add Master" : formState === "UPDATE" ? "Edit Master" : ""}
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

export default Object.assign(Master, {
  Table: MasterTable,
  Pagination: MasterPagination,
  Search: MasterSearch,
  AddButton,
  Lister,
  Form: MasterForm,
  FormActions: MasterFormActions,
  FormWrapper: MasterFormWrapper,
})
