import React from "react"
import { fireEvent, render } from "@testing-library/react"
import SubMasterContextProvider from "../../../context/SubMasterContext"
import SubMasterSearch from "./SubMasterSearch"

describe("Testing SubMasterSearch Component", () => {
    it("Should call getSubMastersList when Search Changes", async () => {
        let functionCalled = false
        const getSubMastersList = () => {
            functionCalled = true
            return Promise.resolve()
        }
        const { container } = render(
            <SubMasterContextProvider
                getSubMastersList={getSubMastersList}
                sortConfig={["createdAt", -1]}
                setSortConfig={() => {}}
                onUpdate={() => Promise.resolve()}
                sortable={false}
                columns={[]}
                data={[]}
                onChangeFormState={() => {}}
            >
                <SubMasterSearch />
            </SubMasterContextProvider>,
        )
        const searchInput = container.querySelector("input[type=search]")
        expect(searchInput).toBeDefined()
        fireEvent.change(searchInput!, { target: { value: "John" } })
        await new Promise((r) => setTimeout(r, 1000))
        expect(functionCalled).toBeTruthy()
    })
})
