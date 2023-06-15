import React, { useCallback, useEffect, useState } from "react"
import { useMasterState } from "../../../context/MasterContext"
import Table from "../../../components/Common/Table"
import DeleteIcon from "../../../icons/deleteIcon"
import UpdateIcon from "../../../icons/updateIcon"

const MasterTable = ({ columns, actions }: TableWrapperProps) => {
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
        languages,
        t,
    } = useMasterState()
    const [tableColumns, setTableColumns] = useState<ColumnsSchema>([])

    const updateClosure = useCallback(
        (item: any, key: string) => {
            return function (value: string) {
                if (onUpdate && canPartialUpdate) {
                    onUpdate(item._id, { [key]: value })
                }
            }
        },
        [canPartialUpdate, onUpdate],
    )

    const verifyAndUpdateColumns = useCallback(() => {
        let modifiedColumns = [...(columns ? columns : defaultColumns)]
        if (Array.isArray(languages) && languages.length > 0 && columns && columns?.length === 0) {
            let nameColumnIndex = modifiedColumns.findIndex((column) => column.accessor === "name")
            if (nameColumnIndex !== -1) {
                let newColumns = []
                for (let language of languages) {
                    newColumns.push({
                        ...modifiedColumns[nameColumnIndex],
                        accessor: `names.${language.code}`,
                        Header: `Display (${language.name})`,
                        Cell: ({ row }: any) => {
                            return String(row.names?.[language.code] || "")
                        },
                    })
                }
                modifiedColumns.splice(nameColumnIndex + 1, 0, ...newColumns)
            }
        }

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
        if ((tableActions.showDelete && canUpdate) || (tableActions.showUpdate && canDelete)) {
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

        if (!canPartialUpdate) {
            modifiedColumns = modifiedColumns.filter((column) => column.accessor !== "isActive")
        }

        setTableColumns(modifiedColumns)
    }, [actions, canDelete, canUpdate, columns, defaultColumns, onChangeFormState, updateClosure, languages])

    useEffect(() => {
        verifyAndUpdateColumns()
    }, [columns, defaultColumns, verifyAndUpdateColumns, languages])

    if (Array.isArray(data) && canList) {
        return (
            <Table
                columns={tableColumns}
                data={data}
                sortable={sortable}
                sortConfig={sortConfig}
                setSortConfig={setSortConfig}
                loader={loader}
                loading={loading}
                noDataText={t("master:noDataText")}
            />
        )
    }

    return null
}

export default MasterTable
