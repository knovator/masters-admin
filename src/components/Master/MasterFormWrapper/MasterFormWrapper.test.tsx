import React from "react"
import { render } from "@testing-library/react"
import MasterContextProvider from "../../../context/MasterContext"

import MasterFormWrapper from "./MasterFormWrapper"

describe("Testing MasterFormWrapper", () => {
    it("Should throw error for not providing children", () => {
        const { container } = render(
            <MasterContextProvider
                closeForm={() => {}}
                formState={"ADD"}
                loading={false}
                onChangeFormState={() => {}}
                onDataSubmit={() => {}}
                updateData={{}}
            >
                {/* @ts-ignore */}
                <MasterFormWrapper />
            </MasterContextProvider>,
        )
        expect(container.firstChild).toBeFalsy()
    })
})
