import React from "react"
import { fireEvent, render } from "@testing-library/react"
import SubMasterContextProvider from "../../../context/SubMasterContext"
import AddButton from "."

describe("Testing Addbutton component", () => {
    it("Should be empty when add permission is not provided", () => {
        const { getByRole } = render(
            <SubMasterContextProvider
                closeForm={() => {}}
                formState={undefined}
                onDataSubmit={() => {}}
                onChangeFormState={() => {}}
                updateData={undefined}
                loading={false}
                canAdd={false}
            >
                <AddButton />
            </SubMasterContextProvider>,
        )
        let addButton = getByRole("button", { name: "Add Sub Master" })
        expect(addButton).toHaveAttribute("disabled")
    })
    it("Should call onChangeFormState when button clicked", () => {
        let formState: FormActionTypes = ""
        const onChangeFormState = (state: FormActionTypes) => (formState = state)
        const { getByRole } = render(
            <SubMasterContextProvider
                closeForm={() => {}}
                formState={formState}
                onDataSubmit={() => {}}
                onChangeFormState={onChangeFormState}
                updateData={undefined}
                loading={false}
                canAdd={true}
            >
                <AddButton />
            </SubMasterContextProvider>,
        )
        let addButton = getByRole("button", { name: "Add Sub Master" })
        fireEvent.click(addButton)
        expect(formState).toBe("ADD")
    })
})
