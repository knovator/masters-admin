import { fireEvent, render, screen } from "@testing-library/react"
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
    expect(ths[0].innerHTML).toContain("Name")
    let tds = container.querySelectorAll("td")
    expect(tds[0].innerHTML).toContain("John")
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
    expect(ths[0].innerHTML).toContain("<b>Name</b>")
    let tds = container.querySelectorAll("td")
    expect(tds[0].innerHTML).toContain("<u>John</u>")
  })
  it("Should show sort marks when clicked on ield header", () => {
    let sortConfig: SortConfigType = ["createdAt", 1]
    const setSortConfig = (data: SortConfigType) => (sortConfig = data)

    const { rerender, getByRole } = render(
      <Table
        columns={[{ Header: "Name", accessor: "name" }]}
        data={[{ name: "John" }, { name: "Karan" }]}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
      />
    )
    // Checking No sort icons exists
    expect(screen.queryByText("&#9650")).not.toBeTruthy() // Ascending
    expect(screen.queryByText("&#9660;")).not.toBeTruthy() // Descending

    // Sorting Name field in Ascending order
    let nameHeader = getByRole("columnheader", { name: "Name" })
    fireEvent.click(nameHeader)
    expect(JSON.stringify(sortConfig)).toBe(JSON.stringify(["name", 1]))
    rerender(
      <Table
        columns={[{ Header: "Name", accessor: "name" }]}
        data={[{ name: "John" }, { name: "Karan" }]}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
      />
    )
    nameHeader = getByRole("columnheader", { name: "Name ▲" })
    expect(nameHeader).toBeTruthy()

    // Sorting Name Field in Descending order
    fireEvent.click(nameHeader)
    expect(JSON.stringify(sortConfig)).toBe(JSON.stringify(["name", -1]))
    rerender(
      <Table
        columns={[{ Header: "Name", accessor: "name" }]}
        data={[{ name: "John" }, { name: "Karan" }]}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
      />
    )
    expect(getByRole("columnheader", { name: "Name ▼" })).toBeTruthy()
  })
})
