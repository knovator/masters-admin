import { fireEvent, render } from "@testing-library/react"
import FormContextProvider from "context/FormContext"
import AddButton from "."

describe("Testing Addbutton component", () => {
  it("Should be empty when add permission is not provided", () => {
    const { container } = render(
      <FormContextProvider
        closeForm={() => {}}
        formState={undefined}
        onDataSubmit={() => {}}
        onChangeFormState={() => {}}
        updateData={undefined}
        loading={false}
        canAdd={false}
      >
        <AddButton />
      </FormContextProvider>,
    )
    expect(container.firstChild).toBeFalsy()
  })
  it("Should call onChangeFormState when button clicked", () => {
    let formState: FormActionTypes = ""
    const onChangeFormState = (state: FormActionTypes) => (formState = state)
    const { getByRole } = render(
      <FormContextProvider
        closeForm={() => {}}
        formState={formState}
        onDataSubmit={() => {}}
        onChangeFormState={onChangeFormState}
        updateData={undefined}
        loading={false}
        canAdd={true}
      >
        <AddButton />
      </FormContextProvider>,
    )
    let addButton = getByRole("button", { name: "Add Master" })
    fireEvent.click(addButton)
    expect(formState).toBe("ADD")
  })
})
