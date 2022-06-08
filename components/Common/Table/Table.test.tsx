import { render } from "@testing-library/react"
import Table from "./Table"

describe("Testing Table Component", () => {
  it("should render html table by default", () => {
    const { container } = render(<Table columns={[]} data={[]} />)
    let table = container.querySelector("table")
    let thead = container.querySelector("thead")
    let tbody = container.querySelector("tbody")

    expect(table).toBeDefined()
    expect(thead).toBeDefined()
    expect(tbody).toBeDefined()
    expect(thead?.innerHTML).toBeFalsy()
    expect(tbody?.innerHTML).toBeFalsy()
  })
  it("should show rows when passed column names and data", () => {
    const { container } = render(
      <Table columns={[{ Header: "Name", accessor: "name" }]} data={[{ name: "John" }, { name: "Karan" }]} />
    )
    let ths = container.querySelectorAll("th")
    expect(ths[0].innerHTML).toBe("Name")
    let tds = container.querySelectorAll("td")
    expect(tds[0].innerHTML).toBe("John")
  })
  it("should show customized column header and value when passed", () => {
    const { container } = render(
      <Table
        columns={[
          {
            Header: <b>Name</b>,
            accessor: "name",
            Cell: ({ row }) => {
              return <u>{row.original.name}</u>
            },
          },
        ]}
        data={[{ name: "John" }]}
      />
    )
    let ths = container.querySelectorAll("th")
    expect(ths[0].innerHTML).toBe("<b>Name</b>")
    let tds = container.querySelectorAll("td")
    expect(tds[0].innerHTML).toBe("<u>John</u>")
  })
})
