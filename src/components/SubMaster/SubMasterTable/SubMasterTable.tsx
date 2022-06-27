import React, { useCallback, useEffect, useState } from "react"
import { useSubMasterState } from "../../../context/SubMasterContext"
import { DNDTable } from "../../../components/Common"
import DeleteIcon from "../../../icons/deleteIcon"
import UpdateIcon from "../../../icons/updateIcon"
import MoveIcon from "../../../icons/moveIcon"
import { ColumnsSchema, TableActionTypes, ColumnSchemaType } from "@knovator/masters-admin"

interface MasterTableProps {
    columns?: ColumnsSchema
    actions?: false | TableActionTypes
}

const SubMasterTable = ({ columns, actions }: MasterTableProps) => {
    const {
        onUpdate,
        sortable,
        sortConfig,
        setSortConfig,
        columns: defaultColumns,
        data,
        onChangeFormState,
        loading,
        loader,
        canDelete,
        canList,
        canUpdate,
        canPartialUpdate,
        onChangeSequence,
        t,
    } = useSubMasterState()
    const [tableColumns, setTableColumns] = useState<ColumnsSchema>([])

    const updateClosure = useCallback(
        (item: any, key: string) => {
            return function (value: string) {
                if (onUpdate && canPartialUpdate) {
                    onUpdate(item.id, { [key]: value })
                }
            }
        },
        [canPartialUpdate, onUpdate],
    )

    const updateSequence = useCallback(
        (id: string, seq: number) => {
            onChangeSequence(id, seq)
        },
        [onUpdate, setSortConfig],
    )

    const verifyAndUpdateColumns = useCallback(() => {
        let modifiedColumns = [...(columns ? columns : defaultColumns)]

        // Handling Table Actions
        let tableActions: TableActionTypes = {
            showDelete: true,
            showUpdate: true,
        }
        if (actions) {
            tableActions = {
                ...tableActions,
                ...actions,
            }
        }
        // Appending Table Actions, if actions not specified or actions object is provided
        if (typeof actions === "undefined" || !!actions) {
            let modification: ColumnSchemaType = {
                Header: t("common:actions"),
                accessor: "actions",
                Cell({ row }) {
                    return (
                        <div className="kms_actions">
                            {tableActions.showUpdate && canUpdate ? (
                                <button onClick={() => onChangeFormState("UPDATE", row)}>
                                    <UpdateIcon fill="#fff" />
                                </button>
                            ) : null}
                            {row.canDel && tableActions.showDelete && canDelete ? (
                                <button onClick={() => onChangeFormState("DELETE", row)}>
                                    <DeleteIcon />
                                </button>
                            ) : null}
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
                        return column.Cell({
                            row: row.original,
                            onUpdate: updateClosure(row.original, column.accessor),
                        })
                    else return String(row.original[column.accessor] || "")
                },
            }
        })

        if (sortable && canPartialUpdate)
            modifiedColumns.push({
                id: "sequence",
                accessor: "sequence",
                Header: () => {
                    return <div />
                },
                Cell: () => (
                    <div className="cursor-pointer">
                        {" "}
                        <MoveIcon />
                    </div>
                ),
            })

        setTableColumns(modifiedColumns)
    }, [
        actions,
        canDelete,
        canPartialUpdate,
        canUpdate,
        columns,
        defaultColumns,
        onChangeFormState,
        sortable,
        updateClosure,
    ])

    useEffect(() => {
        verifyAndUpdateColumns()
    }, [columns, defaultColumns, verifyAndUpdateColumns])

    if (Array.isArray(data) && data.length > 0 && canList) {
        return (
            <DNDTable
                columns={tableColumns}
                data={data}
                sortable={sortable}
                sortConfig={sortConfig}
                setSortConfig={setSortConfig}
                loader={loader}
                loading={loading}
                onMove={updateSequence}
            />
        )
    }

    return null
}

export default SubMasterTable
