import React from "react"
import useMaster from "hook/useMaster"
import { Pagination, Form } from "components/Common"

import MasterTable from "../MasterTable"
import ToggleBtn from "widgets/toggle"

interface MasterProps extends React.PropsWithChildren {
  explicitForm?: boolean
  pagination?: (data: PaginationRendererProps) => JSX.Element
  form?: typeof Form
  table?: (data: TableRendererProps) => JSX.Element
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

const Master = ({ table, pagination }: MasterProps) => {
  const { list, partialUpdate, totalPages, currentPage, setCurrentPage, pageSize, setPageSize } = useMaster()

  const renderTable = () => {
    let tableComponent
    if (typeof table === "function") tableComponent = table({ columns, data: list })
    else tableComponent = <MasterTable columns={columns} data={list} />

    // Adding additional props
    tableComponent = React.cloneElement(tableComponent, { onUpdate: partialUpdate })
    return tableComponent
  }

  const renderPagination = () => {
    let paginationContent
    if (typeof pagination === "function")
      paginationContent = pagination({ currentPage, setCurrentPage, totalPages, pageSize, setPageSize })
    else
      paginationContent = (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      )
    return paginationContent
  }

  return (
    <div>
      {renderTable()}
      {renderPagination()}
    </div>
  )
}

export default Object.assign(Master, { Table: MasterTable, Pagination })
