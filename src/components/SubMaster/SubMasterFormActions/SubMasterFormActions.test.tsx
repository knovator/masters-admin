import React from "react"
import { fireEvent, render } from "@testing-library/react"
import SubMasterContextProvider from "../../../context/SubMasterContext"
import ProviderContextProvider from "../../../context/ProviderContext"
import SubMasterFormActions from "."

describe("Testing SubMasterFormActions component", () => {
    it("Should call onClose when secondary and onSubmit when primary button clicked", () => {
        let submitClicked = false,
            closeClicked = false
        const onClose = () => (closeClicked = true)

        const ref = { current: { dispatchEvent: () => (submitClicked = true) } } as any
        const { getByRole } = render(
            <ProviderContextProvider baseUrl="https://testapi.com" token={"abcd"}>
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
                </SubMasterContextProvider>
            </ProviderContextProvider>,
        )
        let submitButton = getByRole("button", { name: "Add Sub Master" })
        let cancelButton = getByRole("button", { name: "Cancel" })
        fireEvent.click(submitButton)
        fireEvent.click(cancelButton)

        expect(submitClicked).toBeTruthy()
        expect(closeClicked).toBeTruthy()
    })
})
