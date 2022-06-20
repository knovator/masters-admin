import { fireEvent, render } from "@testing-library/react"
import MasterContextProvider from "context/MasterContext"
import ProviderContextProvider from "context/ProviderContext"
import Lister from "."

describe("Testing Lister component", () => {
  it("Should render items with default item component", () => {
    let data = [
      {
        id: 1,
        name: "IT",
        code: "IT",
      },
      {
        id: 2,
        name: "Years of Experience",
        code: "YEARS_OF_EXPERIENCE",
      },
    ]
    const { container, getByTestId } = render(
      <ProviderContextProvider
        baseUrl="https://testapi.in"
        token="asdf"
        dataGetter={(data) => data.docs}
        paginationGetter={(data) => data}
      >
        <MasterContextProvider data={data} canList={true}>
          <Lister />
        </MasterContextProvider>
      </ProviderContextProvider>,
    )
    expect(getByTestId("kms_list-wrapper")).toBeDefined()
    expect(container.getElementsByClassName("kms_list-item").length).toBe(data.length)
  })
  it("Should render items with provided custom item renderer", () => {
    let data = [
      {
        id: 1,
        name: "IT",
        code: "IT",
      },
      {
        id: 2,
        name: "Years of Experience",
        code: "YEARS_OF_EXPERIENCE",
      },
    ]
    const { container, getByTestId } = render(
      <ProviderContextProvider
        baseUrl="https://testapi.in"
        token="asdf"
        dataGetter={(data) => data.docs}
        paginationGetter={(data) => data}
      >
        <MasterContextProvider data={data} canList={true}>
          <Lister
            render={({ row, onClick }) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
              <div className="custom-item" onClick={onClick} key={row.id}>{`${row.name} (${row.code})`}</div>
            )}
          />
        </MasterContextProvider>
      </ProviderContextProvider>,
    )
    expect(getByTestId("kms_list-wrapper")).toBeDefined()
    expect(container.getElementsByClassName("custom-item").length).toBe(data.length)
  })
  it("Should update MasterCode when clicking on item", () => {
    let data = [
      {
        id: 1,
        name: "IT",
        code: "IT",
      },
      {
        id: 2,
        name: "Years of Experience",
        code: "YEARS_OF_EXPERIENCE",
      },
    ]
    const { container } = render(
      <ProviderContextProvider
        baseUrl="https://testapi.in"
        token="asdf"
        dataGetter={(data) => data.docs}
        paginationGetter={(data) => data}
      >
        <MasterContextProvider data={data} canList={true}>
          <Lister />
        </MasterContextProvider>
      </ProviderContextProvider>,
    )
    let listItems = container.getElementsByClassName("kms_list-item")
    fireEvent.click(listItems[0])
    expect(listItems[0].className.split(" ")).toContain("selected")
    expect(listItems[1].className.split(" ")).not.toContain("selected")
  })
})
