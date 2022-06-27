import React from "react"
import { fireEvent, render } from "@testing-library/react"
import SubMasterContextProvider from "../../../context/SubMasterContext"
import { ColumnsSchema } from "@knovator/masters-admin"
import SubMasterTable from "./SubMasterTable"

let columnsSchema: ColumnsSchema = [
    {
        Header: "Name",
        accessor: "name",
    },
    {
        Header: "Active",
        accessor: "isActive",
        Cell: ({ row, onUpdate }) => {
            return (
                <input
                    type="checkbox"
                    className="chekcbox"
                    checked={row.isActive}
                    onChange={() => onUpdate(!row.isActive)}
                />
            )
        },
    },
]

let data = [
    {
        original: {
            id: "1234",
        },
        id: "1234",
        name: "John",
        isActive: true,
    },
]

describe("Testing SubMasterTable Component", () => {
    it("Should call onUpdate when rendered element gets changed", () => {
        let buttonClicked = false
        let onUpdate = async () => {
            buttonClicked = true
        }
        const { container } = render(
            <SubMasterContextProvider
                onUpdate={onUpdate}
                data={data}
                sortConfig={["createdAt", 1]}
                setSortConfig={() => {}}
                sortable={true}
                columns={[]}
                onChangeFormState={() => onUpdate()}
                canPartialUpdate={true}
                canList={true}
                getSubMastersList={() => Promise.resolve()}
            >
                <SubMasterTable columns={columnsSchema} />
            </SubMasterContextProvider>,
        )

        let activeCheckbox = container.querySelector("input[type=checkbox]")
        if (activeCheckbox) fireEvent.click(activeCheckbox)

        expect(buttonClicked).toBe(true)
    })
})
