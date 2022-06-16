import { render, fireEvent } from "@testing-library/react"
import MasterSearch from "./MasterSearch"
import MasterContextProvider from "context/MasterContext"

describe("Testing MasterSearch Component", () => {
  it("Should call getMastersList when Search Changes", async () => {
    let functionCalled = false
    const getMastersList = (search?: string) => {
      functionCalled = true
      return Promise.resolve()
    }
    const { container } = render(
      <MasterContextProvider getMastersList={getMastersList}>
        <MasterSearch />
      </MasterContextProvider>
    )
    const searchInput = container.querySelector("input[type=search]")
    expect(searchInput).toBeDefined()
    fireEvent.change(searchInput!, { target: { value: "John" } })
    await new Promise((r) => setTimeout(r, 1000))
    expect(functionCalled).toBeTruthy()
  })
})
