import React from "react"
import { fireEvent, render } from "@testing-library/react"
import SubMasterContextProvider from "../../../context/SubMasterContext"
import SubMasterFormActions from "."

describe("Testing SubMasterFormActions component", () => {
    it("Should call onClose when secondary and onSubmit when primary button clicked", () => {
        let submitClicked = false,
            closeClicked = false
        const onClose = () => (closeClicked = true)

        const ref = { current: { dispatchEvent: () => (submitClicked = true) } } as any
        const { getByRole } = render(
            <SubMasterContextProvider
                closeForm={onClose}
                formState={"ADD"}
                onDataSubmit={() => {}}
                onChangeFormState={() => {}}
                updateData={undefined}
                loading={false}
                canAdd={true}
                canUpdate={true}
            >
                <SubMasterFormActions formRef={ref} />
            </SubMasterContextProvider>,
        )
        let submitButton = getByRole("button", { name: "Add Sub Master" })
        let cancelButton = getByRole("button", { name: "Cancel" })
        fireEvent.click(submitButton)
        fireEvent.click(cancelButton)

        expect(submitClicked).toBeTruthy()
        expect(closeClicked).toBeTruthy()
    })
})
