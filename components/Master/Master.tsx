import Pagination from "components/Common/Pagination"
import Form from "components/Common/Form"
import useMaster from "hook/useMaster"

import MasterTable from "./MasterTable"
import ToggleBtn from "widgets/toggle"

interface TableRendererProps {
  columns: SchemaType
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
  const { list } = useMaster()
  const renderTable = () => {
    if (typeof table === "function") return table({ columns, data: list })
    return <MasterTable columns={columns} data={list} />
  }
  return <div>{renderTable()}</div>
}

export default Object.assign(Master, { Table: MasterTable })
