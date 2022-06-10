import { render, fireEvent } from "@testing-library/react"
import { MasterContextProvider } from "context"
import MasterTable from "./MasterTable"

let columnsSchema: ColumnsSchema = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Active",
    accessor: "isActive",
    Cell: ({ row, onUpdate }) => {
      return (
        <input type="checkbox" className="chekcbox" checked={row.isActive} onChange={() => onUpdate(!row.isActive)} />
      )
    },
  },
]

let data = [
  {
    id: "1234",
    name: "John",
    isActive: true,
  },
]

describe("Testing MasterTable Component", () => {
  it("Should call onUpdate when rendered element gets changed", () => {
    let buttonClicked = false
    let onUpdate = async (id: string, data: any) => {
      buttonClicked = true
    }
    const { container } = render(
      <MasterContextProvider onUpdate={onUpdate} limits={[1, 2, 3]}>
        <MasterTable columns={columnsSchema} data={data} />
      </MasterContextProvider>
    )

    let activeCheckbox = container.querySelector("input[type=checkbox]")
    if (activeCheckbox) fireEvent.click(activeCheckbox)

    expect(buttonClicked).toBe(true)
  })
})
