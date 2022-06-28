import React from "react"
import { MutableRefObject } from "react"
import { render } from "@testing-library/react"
import SubMasterContextProvider from "../../../context/SubMasterContext"

import SubMasteForm from "."
import Provider from "../../../context/ProviderContext"

describe("Testing SubMasterForm component", () => {
    it("Should use custom schema when provided", () => {
        const ref = { current: {} } as MutableRefObject<HTMLFormElement | null>
        const customSchema: SchemaType[] = [
            {
                label: "Name*",
                accessor: "name",
                type: "text",
                placeholder: "Enter Name",
            },
            {
                label: "Code*",
                accessor: "code",
                type: "text",
                editable: false,
                placeholder: "Enter Code",
            },
        ]
        const { container } = render(
            <Provider baseUrl="http://test-api.com" token="">
                <SubMasterContextProvider
                    closeForm={() => {}}
                    formState={"ADD"}
                    onDataSubmit={() => {}}
                    onChangeFormState={() => {}}
                    updateData={undefined}
                    loading={false}
                    canAdd={true}
                    canUpdate={true}
                >
                    <SubMasteForm ref={ref} schema={customSchema} />
                </SubMasterContextProvider>
            </Provider>,
        )
        let inputs = container.querySelectorAll(".kms_input")
        expect(inputs.length).toBe(2)
    })
})
