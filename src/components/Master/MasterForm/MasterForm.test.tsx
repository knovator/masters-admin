import React from "react"
import { MutableRefObject } from "react"
import { render } from "@testing-library/react"
import MasterContextProvider from "../../../context/MasterContext"

import MasteForm from "."

describe("Testing MasterForm component", () => {
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
            <MasterContextProvider
                closeForm={() => {}}
                formState={"ADD"}
                onDataSubmit={() => {}}
                onChangeFormState={() => {}}
                updateData={undefined}
                loading={false}
                canAdd={true}
                canUpdate={true}
            >
                <MasteForm ref={ref} schema={customSchema} />
            </MasterContextProvider>,
        )
        let inputs = container.querySelectorAll(".kms_input")
        expect(inputs.length).toBe(2)
    })
})
