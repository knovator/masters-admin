import React, { useCallback, useEffect, useState } from "react"
import { useSubMasterState } from "../../../context/SubMasterContext"
import { DNDTable } from "../../../components/Common"
import DeleteIcon from "../../../icons/deleteIcon"
import UpdateIcon, { UpdateSVG } from "../../../icons/updateIcon"
import { CheckSVG } from "../../../icons/checkIcon"
import { XSVG } from "../../../icons/xIcon"
import MoveIcon from "../../../icons/moveIcon"
import classNames from "classnames"

const SubMasterTable = ({ columns, actions }: TableWrapperProps) => {
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
        sequencing,
        setSequencing,
        onConfirmSequence,
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
    const onUpdateSequenceClick = () => {
        setSequencing(true)
    }
    const onCancelClick = () => {
        setSequencing(false)
    }
    const updateSequence = useCallback((sourceIndex: number, destinationIndex: number) => {
        onChangeSequence(sourceIndex, destinationIndex)
    }, [])

    const verifyAndUpdateColumns = useCallback(() => {
        let len = Array.isArray(data) ? data.length : 0
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
                Header: () => (
                    <div className="text-center">
                        {sequencing ? (
                            <>
                                <button
                                    className="kms_btn kms_btn-sm kms_text-success kms_sequence-action"
                                    title="Save"
                                    onClick={onConfirmSequence}
                                >
                                    <CheckSVG />
                                </button>
                                <button
                                    className="kms_btn kms_btn-sm kms_text-cancel kms_sequence-action"
                                    onClick={onCancelClick}
                                    title="Cancel"
                                >
                                    <XSVG />
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className="kms_btn kms_btn-sm kms_text-info kms_sequence-action"
                                    title="Update Sequence"
                                    onClick={onUpdateSequenceClick}
                                    disabled={!(len > 0)}
                                >
                                    <UpdateSVG />
                                </button>
                            </>
                        )}
                    </div>
                ),
                Cell: () => (
                    <div
                        className={classNames("text-center cursor-pointer", {
                            "cursor-move": sequencing,
                            "cursor-not-allowed": !sequencing,
                        })}
                    >
                        <MoveIcon className="inline-block" />
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
        data,
    ])

    useEffect(() => {
        verifyAndUpdateColumns()
    }, [columns, defaultColumns, verifyAndUpdateColumns])

    if (Array.isArray(data) && canList) {
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
                dragEnable={sequencing}
            />
        )
    }

    return null
}

export default SubMasterTable
