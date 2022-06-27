import React from "react"
import { MutableRefObject } from "react"
import { render } from "@testing-library/react"
import { SchemaType } from "@knovator/masters-admin"
import SubMasterContextProvider from "../../../context/SubMasterContext"

import SubMasteForm from "."

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
            </SubMasterContextProvider>,
        )
        let inputs = container.querySelectorAll(".kms_input")
        expect(inputs.length).toBe(2)
    })
})
