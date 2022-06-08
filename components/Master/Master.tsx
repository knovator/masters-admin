import React from "react"
import Pagination from "components/Common/Pagination"
import Form from "components/Common/Form"
import useMaster from "hook/useMaster"

import MasterTable from "./MasterTable"
import ToggleBtn from "widgets/toggle"
import DrawerWrapper from "components/Common/Drawer"

interface TableRendererProps {
  columns: ColumnsSchema
  data: any[]
}

interface MasterProps extends React.PropsWithChildren {
  explicitForm?: boolean
  pagination?: typeof Pagination
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

const Master = ({ table }: MasterProps) => {
  const { list, partialUpdate } = useMaster()

  const renderTable = () => {
    let tableComponent
    if (typeof table === "function") tableComponent = table({ columns, data: list })
    tableComponent = <MasterTable columns={columns} data={list} />

    // Adding additional props
    tableComponent = React.cloneElement(tableComponent, { onUpdate: partialUpdate })
    return tableComponent
  }
  return <div>{renderTable()}</div>
}

export default Object.assign(Master, { Table: MasterTable })
