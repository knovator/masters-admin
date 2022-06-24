import React from "react"
import { render } from "@testing-library/react"
import SubMasterContextProvider from "../../../context/SubMasterContext"

import SubMasterFormWrapper from "./SubMasterFormWrapper"

describe("Testing SubMasterFormWrapper", () => {
    it("Should show null for not providing children as function", () => {
        const { container } = render(
            <SubMasterContextProvider
                closeForm={() => {}}
                formState={"ADD"}
                loading={false}
                onChangeFormState={() => {}}
                onDataSubmit={() => {}}
                updateData={{}}
            >
                {/* @ts-ignore */}
                <SubMasterFormWrapper />
            </SubMasterContextProvider>,
        )
        expect(container.firstChild).toBeFalsy()
    })
})
