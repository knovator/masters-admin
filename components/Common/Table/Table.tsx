import { usePagination, useRowSelect, useTable } from "react-table"

const Table = ({ data, columns }: TableProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable(
    {
      // @ts-ignore
      columns,
      data,
    },
    usePagination,
    useRowSelect
  )

  return (
    <div className={`kms_table-container`} data-testid="table">
      <table className="kms_table" {...getTableProps()}>
        <thead className="kms_thead">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
