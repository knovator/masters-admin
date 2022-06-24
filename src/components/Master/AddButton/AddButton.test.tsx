import React from "react"
import { fireEvent, render } from "@testing-library/react"
import MasterContextProvider from "../../../context/MasterContext"
import AddButton from "."

describe("Testing Addbutton component", () => {
    it("Should be empty when add permission is not provided", () => {
        const { container } = render(
            <MasterContextProvider
                formState={undefined}
                onDataSubmit={() => {}}
                onChangeFormState={() => {}}
                updateData={undefined}
                loading={false}
                canAdd={false}
            >
                <AddButton />
            </MasterContextProvider>,
        )
        expect(container.firstChild).toBeFalsy()
    })
    it("Should call onChangeFormState when button clicked", () => {
        let formState: FormActionTypes = ""
        const onChangeFormState = (state: FormActionTypes) => (formState = state)
        const { getByRole } = render(
            <MasterContextProvider
                closeForm={() => {}}
                formState={formState}
                onDataSubmit={() => {}}
                onChangeFormState={onChangeFormState}
                updateData={undefined}
                loading={false}
                canAdd={true}
            >
                <AddButton />
            </MasterContextProvider>,
        )
        let addButton = getByRole("button", { name: "Add Master" })
        fireEvent.click(addButton)
        expect(formState).toBe("ADD")
    })
})
