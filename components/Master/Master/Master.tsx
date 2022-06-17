import React, { useRef } from "react"
import useMaster from "hook/useMaster"
import ToggleBtn from "widgets/toggle"
import { Drawer } from "components/Common"
import FormContextProvider from "context/FormContext"
import TableContextProvider from "context/TableContext"
import { DEFAULT_LIMIT, PAGE_LIMITS } from "constants/common"
import PaginationContextProvider from "context/PaginationContext"

import AddButton from "../AddButton"
import DeleteModal from "../DeleteModal"
import MasterForm from "../MasterForm"
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
  permissions: PermissionsObj
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
  permissions,
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
      <FormContextProvider
        loading={loading}
        formState={formState}
        onChangeFormState={onChangeFormState}
        closeForm={onCloseForm}
        onDataSubmit={onDataSubmit}
        updateData={itemData}
        canAdd={permissions?.add}
        canUpdate={permissions?.update}
      >
        <PaginationContextProvider
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalRecords={totalRecords}
          limits={limits ? limits : PAGE_LIMITS}
          canList={permissions?.list}
        >
          <TableContextProvider
            onUpdate={partialUpdate}
            onChangeFormState={onChangeFormState}
            data={list}
            sortable={sortable}
            sortConfig={sortConfig}
            setSortConfig={setSortConfig}
            columns={columns}
            loader={loader}
            loading={loading}
            canDelete={permissions?.destroy}
            canList={permissions?.list}
            canUpdate={permissions?.update}
            getMastersList={getMastersList}
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
                title={formState === "ADD" ? "Add Master" : "Edit Master"}
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
          </TableContextProvider>
        </PaginationContextProvider>
      </FormContextProvider>
    </div>
  )
}

export default Object.assign(Master, {
  Table: MasterTable,
  Pagination: MasterPagination,
  Search: MasterSearch,
  AddButton,
  Form: MasterForm,
  FormActions: MasterFormActions,
  FormWrapper: MasterFormWrapper,
})
