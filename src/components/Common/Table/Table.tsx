import React, { useCallback } from "react"
import { useTable } from "react-table"
import { EXCLUDE_SORT_COLUMNS, SORT_ASCENDING, SORT_DESCENDING } from "../../../constants/common"

const Table = ({ data, columns, sortConfig, sortable = true, setSortConfig, loader, loading }: TableProps) => {
    const getSortConfigClassName = useCallback(
        (accessor: string, up = true) => {
            if (!sortConfig || accessor !== sortConfig[0]) return "kms_sort-inactive"
            else {
                if (up && sortConfig[1] === SORT_ASCENDING) return ""
                else if (!up && sortConfig[1] === SORT_DESCENDING) return ""
                else return "kms_sort-inactive"
            }
        },
        [sortConfig],
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
        [getSortConfigClassName, sortable],
    )
    const onClickSort = useCallback(
        (id: string) => {
            if (setSortConfig && !EXCLUDE_SORT_COLUMNS.includes(String(id).toLocaleLowerCase())) {
                if (sortConfig && id === sortConfig[0])
                    setSortConfig([id, sortConfig[1] === SORT_ASCENDING ? SORT_DESCENDING : SORT_ASCENDING])
                else setSortConfig([id, SORT_ASCENDING])
            }
        },
        [setSortConfig, sortConfig],
    )
    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable({
        // @ts-ignore
        columns,
        data,
    })

    return (
        <div className={`kms_table-container`} data-testid="table">
            <div className={`kms_table-height`}>
                {loading && loader ? (
                    <div className="kms_table-height">{loader}</div>
                ) : (
                    <table className="kms_table" {...getTableProps()}>
                        <thead className="kms_thead">
                            {headerGroups.map((headerGroup, i) => (
                                <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                                    {headerGroup.headers.map((column, j) => (
                                        <th
                                            {...column.getHeaderProps()}
                                            key={j}
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
                            {rows.length > 0
                                ? rows.map((row, i) => {
                                    prepareRow(row)
                                    return (
                                        <tr {...row.getRowProps()} key={i}>
                                            {row.cells.map((cell, j) => (
                                                <td {...cell.getCellProps()} key={j}>
                                                    {cell.render("Cell")}
                                                </td>
                                            ))}
                                        </tr>
                                    )
                                }) 
                                : (<tr>
                                    <td colSpan={columns?.length || 0}>No data found</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default Table
