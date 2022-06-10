import { useTable } from "react-table"
import { SORT_ASCENDING, SORT_DESCENDING, EXCLUDE_SORT_COLUMNS } from "constants/common"

const Table = ({ data, columns, sortConfig, sortable = true, setSortConfig }: TableProps) => {
  const sortConfigRenderer = (accessor: string) => {
    if (!sortable || !sortConfig) return null
    if (accessor === sortConfig[0]) {
      return (
        <div className="text-xs ml-2 inline-block">
          {sortConfig[1] === SORT_ASCENDING ? <>&#9650;</> : <>&#9660;</>}
        </div>
      )
    } else return null
  }
  const onClickSort = (id: string) => {
    if (setSortConfig && !EXCLUDE_SORT_COLUMNS.includes(String(id).toLocaleLowerCase())) {
      if (sortConfig && id === sortConfig[0])
        setSortConfig([id, sortConfig[1] === SORT_ASCENDING ? SORT_DESCENDING : SORT_ASCENDING])
      else setSortConfig([id, SORT_ASCENDING])
    }
  }
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
