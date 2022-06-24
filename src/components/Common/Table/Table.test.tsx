import React from "react"
import { fireEvent, render } from "@testing-library/react"
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
            <Table columns={[{ Header: "Name", accessor: "name" }]} data={[{ name: "John" }, { name: "Karan" }]} />,
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
            />,
        )
        let ths = container.querySelectorAll("th")
        expect(ths[0].innerHTML).toContain("<b>Name</b>")
        let tds = container.querySelectorAll("td")
        expect(tds[0].innerHTML).toContain("<u>John</u>")
    })
    it("Should show sort marks when clicked on ield header", () => {
        let sortConfig: SortConfigType = ["createdAt", 1]
        const setSortConfig = (data: SortConfigType) => (sortConfig = data)
        const columns = [
            { Header: "Name", accessor: "name" },
            { Header: "Active", accessor: "isActive" },
        ]
        const data = [
            { name: "John", isActive: true },
            { name: "Karan", isActive: false },
        ]

        const { rerender, getByRole, getAllByText } = render(
            <Table columns={columns} data={data} sortConfig={sortConfig} setSortConfig={setSortConfig} />,
        )
        // checking if all columns has up & down arrows
        expect(getAllByText("▲").length).toBe(columns.length)
        expect(getAllByText("▼").length).toBe(columns.length)

        let nameHeader = getByRole("columnheader", { name: "Name ▲ ▼" })

        // Sorting Name field in Ascending order
        fireEvent.click(nameHeader)
        expect(JSON.stringify(sortConfig)).toBe(JSON.stringify(["name", 1]))
        rerender(<Table columns={columns} data={data} sortConfig={sortConfig} setSortConfig={setSortConfig} />)
        let nameUpArrow = getAllByText("▲")
        let nameDownArrow = getAllByText("▼")
        expect(nameUpArrow[0].classList.contains("kms_sort-inactive")).toBeFalsy()
        expect(nameDownArrow[0].classList.contains("kms_sort-inactive")).toBeTruthy()

        // Sorting Name Field in Descending order
        fireEvent.click(nameHeader)
        expect(JSON.stringify(sortConfig)).toBe(JSON.stringify(["name", -1]))
        rerender(<Table columns={columns} data={data} sortConfig={sortConfig} setSortConfig={setSortConfig} />)
        nameUpArrow = getAllByText("▲")
        nameDownArrow = getAllByText("▼")
        expect(nameUpArrow[0].classList.contains("kms_sort-inactive")).toBeTruthy()
        expect(nameDownArrow[0].classList.contains("kms_sort-inactive")).toBeFalsy()
    })
})
