import React from "react"
import { DEFAULT_LIMIT, PAGE_LIMITS } from "constants/common"

import ToggleBtn from "widgets/toggle"
import useMaster from "hook/useMaster"
import MasterTable from "../MasterTable"
import MasterPagination from "../MasterPagination"

import MasterContextProvider from "context/MasterContext"

interface MasterProps extends React.PropsWithChildren {
  explicitForm?: boolean
  pagination?: (data: PaginationRendererProps) => JSX.Element
  form?: JSX.Element
  table?: (data: TableRendererProps) => JSX.Element
  limits?: number[]
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

const Master = ({ table, pagination, limits = PAGE_LIMITS }: MasterProps) => {
  const { list, partialUpdate, totalPages, totalRecords, currentPage, setCurrentPage, pageSize, setPageSize } =
    useMaster({ defaultLimit: Array.isArray(limits) && limits.length > 0 ? limits[0] : DEFAULT_LIMIT })

  const renderTable = () => {
    let tableComponent
    if (typeof table === "function") tableComponent = table({ columns, data: list })
    else tableComponent = <MasterTable columns={columns} data={list} />

    return tableComponent
  }

  const renderPagination = () => {
    let paginationContent
    if (typeof pagination === "function")
      paginationContent = pagination({
        currentPage,
        setCurrentPage,
        totalPages,
        pageSize,
        setPageSize,
        totalRecords,
      })
    else
      paginationContent = (
        <MasterPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalRecords={totalRecords}
        />
      )

    return paginationContent
  }

  return (
    <div>
      <MasterContextProvider onUpdate={partialUpdate} limits={limits ? limits : PAGE_LIMITS}>
        {renderTable()}
        {renderPagination()}
      </MasterContextProvider>
    </div>
  )
}

export default Object.assign(Master, { Table: MasterTable, Pagination: MasterPagination })
