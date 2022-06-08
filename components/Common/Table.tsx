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
    <div className={`overflow-hidden bg-white border rounded-lg border-light-gray`}>
      <div className={`table-height`}>
        <table className="w-full text-sm" {...getTableProps()}>
          <thead className="bg-thead">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className="px-4 py-3 text-left" {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td className="px-4 py-3" {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
