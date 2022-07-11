import React, { useCallback } from "react"
import { useTable } from "react-table"
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
import { EXCLUDE_SORT_COLUMNS, SORT_ASCENDING, SORT_DESCENDING } from "../../../constants/common"

const DNDTable = ({
    data,
    columns,
    sortConfig,
    sortable = true,
    setSortConfig,
    loader,
    loading,
    onMove,
}: TableProps) => {
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
    const handleDragEnd = (results: DropResult) => {
        if (!results.destination) return
        const temporaryData = [...data]
        const [selectedRow] = temporaryData.splice(results.source.index, 1)
        // const [row] = data.splice(results.destination.index, 1)
        const seq = results.destination.index + 1
        // temporaryData.splice(results.destination.index, 0, selectedRow)
        if (typeof onMove === "function") onMove(selectedRow.id || selectedRow._id, seq)
    }
    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable({
        // @ts-ignore
        columns,
        data,
    })

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
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
                            <Droppable droppableId="tbody">
                                {(provided) => (
                                    <tbody
                                        className="kms_tbody"
                                        ref={provided.innerRef}
                                        {...getTableBodyProps()}
                                        {...provided.droppableProps}
                                    >
                                        {rows.length > 0
                                            ? rows.map((row, i) => {
                                                prepareRow(row)
                                                return (
                                                    // @ts-ignore
                                                    <Draggable
                                                        draggableId={row.original.id || row.original._id || row.id}
                                                        key={row.original.id || row.original._id}
                                                        index={i}
                                                    >
                                                        {(provided) => (
                                                            <tr
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...row.getRowProps()}
                                                            >
                                                                {row.cells.map((cell, j) => (
                                                                    <td
                                                                        {...(cell.column.id === "sequence"
                                                                            ? provided.dragHandleProps
                                                                            : {})}
                                                                        {...cell.getCellProps()}
                                                                        key={j}
                                                                    >
                                                                        {cell.render("Cell")}
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        )}
                                                    </Draggable>
                                                )
                                            })
                                            : (<tr>
                                                <td colSpan={columns?.length || 0}>No data found</td>
                                            </tr>)
                                        }
                                    </tbody>
                                )}
                            </Droppable>
                        </table>
                    )}
                </div>
            </div>
        </DragDropContext>
    )
}

export default DNDTable
