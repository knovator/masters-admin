import React from "react"
import { fireEvent, render } from "@testing-library/react"
import MasterContextProvider from "../../../context/MasterContext"
import MasterSearch from "./MasterSearch"

describe("Testing MasterSearch Component", () => {
    it("Should call getMastersList when Search Changes", async () => {
        let functionCalled = false
        const getMastersList = () => {
            functionCalled = true
            return Promise.resolve()
        }
        const { container } = render(
            <MasterContextProvider
                getMastersList={getMastersList}
                sortConfig={["createdAt", -1]}
                setSortConfig={() => {}}
                onUpdate={() => Promise.resolve()}
                sortable={false}
                columns={[]}
                data={[]}
                onChangeFormState={() => {}}
            >
                <MasterSearch />
            </MasterContextProvider>,
        )
        const searchInput = container.querySelector("input[type=search]")
        expect(searchInput).toBeDefined()
        fireEvent.change(searchInput!, { target: { value: "John" } })
        await new Promise((r) => setTimeout(r, 1000))
        expect(functionCalled).toBeTruthy()
    })
})
