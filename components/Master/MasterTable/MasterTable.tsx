import { useEffect, useState } from "react"

import Table from "components/Common/Table"
import DeleteIcon from "icons/deleteIcon"
import UpdateIcon from "icons/updateIcon"
import { useTableState } from "context/TableContext"

interface MasterTableProps {
  columns?: ColumnsSchema
  actions?: false | TableActionTypes
}

const MasterTable = ({ columns, actions }: MasterTableProps) => {
  const {
    onUpdate,
    sortable,
    sortConfig,
    setSortConfig,
    columns: defaultColumns,
    data,
    onChangeFormState,
  } = useTableState()
  const [tableColumns, setTableColumns] = useState<ColumnsSchema>([])

  useEffect(() => {
    verifyAndUpdateColumns()
  }, [columns, defaultColumns])

  function updateClosure(item: any, key: string) {
    return function (value: string) {
      if (onUpdate) {
        onUpdate(item.id, { [key]: value })
      }
    }
  }
  function verifyAndUpdateColumns() {
    let modifiedColumns = [...(columns ? columns : defaultColumns)]

    // Handling Table Actions
    let tableActions: TableActionTypes = {
      showDelete: true,
      showUpdate: true,
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
              {tableActions.showUpdate ? (
                <button onClick={() => onChangeFormState("UPDATE", row)}>
                  <UpdateIcon fill="#fff" />
                </button>
              ) : null}
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

  if (Array.isArray(data) && data.length > 0) {
    return (
      <Table
        columns={tableColumns}
        data={data}
        sortable={sortable}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
      />
    )
  }

  return null
}

export default MasterTable
