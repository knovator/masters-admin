import React from "react"
import { fireEvent, render } from "@testing-library/react"
import MasterContextProvider from "../../../context/MasterContext"
import ProviderContextProvider from "../../../context/ProviderContext"
import MasterFormActions from "."

describe("Testing MasterFormActions component", () => {
    it("Should call onClose when secondary and onSubmit when primary button clicked", () => {
        let submitClicked = false,
            closeClicked = false
        const onClose = () => (closeClicked = true)

        const ref = { current: { dispatchEvent: () => (submitClicked = true) } } as any
        const { getByRole } = render(
            <ProviderContextProvider baseUrl="https://testapi.com" token={"abcd"}>
                <MasterContextProvider
                    closeForm={onClose}
                    formState={"ADD"}
                    onDataSubmit={() => {}}
                    onChangeFormState={() => {}}
                    updateData={undefined}
                    loading={false}
                    canAdd={true}
                    canUpdate={true}
                >
                    <MasterFormActions formRef={ref} />
                </MasterContextProvider>
            </ProviderContextProvider>,
        )
        let submitButton = getByRole("button", { name: "Add Master" })
        let cancelButton = getByRole("button", { name: "Cancel" })
        fireEvent.click(submitButton)
        fireEvent.click(cancelButton)

        expect(submitClicked).toBeTruthy()
        expect(closeClicked).toBeTruthy()
    })
})
