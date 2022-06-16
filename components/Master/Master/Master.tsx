import React, { useRef } from "react"
import { DEFAULT_LIMIT, PAGE_LIMITS } from "constants/common"

import ToggleBtn from "widgets/toggle"
import AddButton from "../AddButton"
import useMaster from "hook/useMaster"
import MasterForm from "../MasterForm"
import MasterTable from "../MasterTable"
import MasterSearch from "../MasterSearch"
import MasterPagination from "../MasterPagination"
import MasterFormWrapper from "../MasterFormWrapper"
import MasterFormActions from "../MasterFormActions"
import { Drawer } from "components/Common"

import TableContextProvider from "context/TableContext"
import MasterContextProvider from "context/MasterContext"
import PaginationContextProvider from "context/PaginationContext"
import FormContextProvider from "context/FormContext"

import DeleteModal from "../DeleteModal"

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
    permissions,
    preConfirmDelete,
  })

  return (
    <div>
      <MasterContextProvider getMastersList={getMastersList}>
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
      </MasterContextProvider>
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
