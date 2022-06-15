import { useTable } from "react-table"
import { SORT_ASCENDING, SORT_DESCENDING, EXCLUDE_SORT_COLUMNS } from "constants/common"
import { useCallback } from "react"

const Table = ({ data, columns, sortConfig, sortable = true, setSortConfig }: TableProps) => {
  const getSortConfigClassName = useCallback(
    (accessor: string, up = true) => {
      if (!sortConfig || accessor !== sortConfig[0]) return "kms_sort-inactive"
      else {
        if (up && sortConfig[1] === SORT_ASCENDING) return ""
        else if (!up && sortConfig[1] === SORT_DESCENDING) return ""
        else return "kms_sort-inactive"
      }
    },
    [sortConfig]
  )
  const sortConfigRenderer = useCallback(
    (accessor: string) => {
      if (!sortable || EXCLUDE_SORT_COLUMNS.includes(String(accessor).toLocaleLowerCase())) return null
      return (
        <div className="kms_sort-wrapper">
          <span data-testid className={getSortConfigClassName(accessor, true)}>
            &#9650;
          </span>
          <span className={getSortConfigClassName(accessor, false)}>&#9660;</span>
        </div>
      )
    },
    [getSortConfigClassName]
  )
  const onClickSort = useCallback(
    (id: string) => {
      if (setSortConfig && !EXCLUDE_SORT_COLUMNS.includes(String(id).toLocaleLowerCase())) {
        if (sortConfig && id === sortConfig[0])
          setSortConfig([id, sortConfig[1] === SORT_ASCENDING ? SORT_DESCENDING : SORT_ASCENDING])
        else setSortConfig([id, SORT_ASCENDING])
      }
    },
    [sortConfig]
  )
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable({
    // @ts-ignore
    columns,
    data,
  })

  return (
    <div className={`kms_table-container`} data-testid="table">
      <table className="kms_table" {...getTableProps()}>
        <thead className="kms_thead">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  onClick={() => onClickSort(column.id)}
                  className="cursor-pointer hover:bg-opacity-50"
                >
                  {column.render("Header")}
                  {sortConfigRenderer(column.id)}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="kms_tbody" {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
