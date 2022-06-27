import React from "react"
import { fireEvent, render } from "@testing-library/react"
import SubMasterContextProvider from "../../../context/SubMasterContext"
import { FormActionTypes } from "@knovator/masters-admin"
import AddButton from "."

describe("Testing Addbutton component", () => {
    it("Should be empty when add permission is not provided", () => {
        const { container } = render(
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
        expect(container.firstChild).toBeFalsy()
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
