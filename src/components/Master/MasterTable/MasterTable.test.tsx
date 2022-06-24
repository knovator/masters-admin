import React from "react"
import { fireEvent, render } from "@testing-library/react"
import MasterContextProvider from "../../../context/MasterContext"
import MasterTable from "./MasterTable"

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
        id: "1234",
        name: "John",
        isActive: true,
    },
]

describe("Testing MasterTable Component", () => {
    it("Should call onUpdate when rendered element gets changed", () => {
        let buttonClicked = false
        let onUpdate = async () => {
            buttonClicked = true
        }
        const { container } = render(
            <MasterContextProvider
                onUpdate={onUpdate}
                data={data}
                sortConfig={["createdAt", 1]}
                setSortConfig={() => {}}
                sortable={true}
                columns={[]}
                onChangeFormState={() => onUpdate()}
                canPartialUpdate={true}
                canList={true}
                getMastersList={() => Promise.resolve()}
            >
                <MasterTable columns={columnsSchema} />
            </MasterContextProvider>,
        )

        let activeCheckbox = container.querySelector("input[type=checkbox]")
        if (activeCheckbox) fireEvent.click(activeCheckbox)

        expect(buttonClicked).toBe(true)
    })
})
