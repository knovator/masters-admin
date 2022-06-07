import { useEffect, useState } from "react"
import Table from "components/Common/Table"
import DeleteIcon from "icons/deleteIcon"
import EditIcon from "icons/editIcon"

interface MasterTableProps {
  columns: SchemaType
  data: any[]
  actions?: false | TableActionTypes
}

const MasterTable = ({ columns, data, actions }: MasterTableProps) => {
  const [tableColumns, setTableColumns] = useState<SchemaType>([])

  useEffect(() => {
    verifyAndUpdateColumns()
  }, [columns])

  function updateClosure(item: any, key: string) {
    return function (value: string) {
      console.log("Updating", item.id, key, value)
    }
  }
  function verifyAndUpdateColumns() {
    // Applying onUpdate to Cell
    let modifiedColumns = columns.map((column) => {
      return {
        ...column,
        Cell: ({ row }: any) => {
          if (column.Cell)
            return column.Cell({ row: row.original, onUpdate: updateClosure(row.original, column.accessor) })
          else return String(row.original[column.accessor] || "")
        },
      }
    })

    // Handling Table Actions
    let tableActions: TableActionTypes = {
      showDelete: true,
      showEdit: true,
    }
    if (!!actions) {
      tableActions = {
        ...tableActions,
        ...actions,
      }
    }
    // Appending Table Actions, if actions not specified or actions object is provided
    if (typeof actions === "undefined" || !!actions) {
      modifiedColumns.push({
        Header: "Actions",
        accessor: "actions",
        Cell({ row }: any) {
          return (
            <div className="flex items-center gap-3">
              {tableActions.showEdit ? <EditIcon fill="#fff" /> : null}
              {row.original.canDel && tableActions.showDelete ? <DeleteIcon /> : null}
            </div>
          )
        },
      })
    }
    setTableColumns(modifiedColumns)
  }

  return <Table columns={tableColumns} data={data} />
}

export default MasterTable
