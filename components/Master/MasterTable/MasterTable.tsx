import { useEffect, useState } from "react"
import Table from "components/Common/Table"
import DeleteIcon from "icons/deleteIcon"
import EditIcon from "icons/editIcon"

interface MasterTableProps {
  columns: ColumnsSchema
  data: any[]
  actions?: false | TableActionTypes
  onUpdate?: (id: string, data: any) => void
}

const MasterTable = ({ columns, data, actions, onUpdate }: MasterTableProps) => {
  const [tableColumns, setTableColumns] = useState<ColumnsSchema>([])

  useEffect(() => {
    verifyAndUpdateColumns()
  }, [columns])

  function updateClosure(item: any, key: string) {
    return function (value: string) {
      if (onUpdate) {
        onUpdate(item.id, { [key]: value })
      }
    }
  }
  function verifyAndUpdateColumns() {
    let modifiedColumns = [...columns]

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
      let modification: ColumnSchemaType = {
        Header: "Actions",
        accessor: "actions",
        Cell({ row, onUpdate }) {
          return (
            <div className="kms_actions">
              {tableActions.showEdit ? <EditIcon fill="#fff" /> : null}
              {row.canDel && tableActions.showDelete ? <DeleteIcon /> : null}
            </div>
          )
        },
      }
      if (actions && actions.atFirst) {
        modifiedColumns.unshift(modification)
      } else {
        modifiedColumns.push(modification)
      }
    }

    // Applying onUpdate to Cell, keep at last
    modifiedColumns = modifiedColumns.map((column) => {
      return {
        ...column,
        Cell: ({ row }: any) => {
          if (column.Cell)
            return column.Cell({ row: row.original, onUpdate: updateClosure(row.original, column.accessor) })
          else return String(row.original[column.accessor] || "")
        },
      }
    })

    setTableColumns(modifiedColumns)
  }

  if (Array.isArray(data) && data.length > 0) return <Table columns={tableColumns} data={data} />

  return null
}

export default MasterTable
