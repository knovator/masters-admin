import { fireEvent, render } from "@testing-library/react"
import FormContextProvider from "context/FormContext"
import MasterFormActions from "."

describe("Testing MasterFormActions component", () => {
  it("Should call onClose when secondary and onSubmit when primary button clicked", () => {
    let submitClicked = false,
      closeClicked = false
    const onClose = () => (closeClicked = true)

    const ref = { current: { dispatchEvent: () => (submitClicked = true) } } as any
    const { getByRole } = render(
      <FormContextProvider
        closeForm={onClose}
        formState={"ADD"}
        onDataSubmit={(data: any) => {}}
        onChangeFormState={(status: FormActionTypes, data?: any) => {}}
        updateData={undefined}
        loading={false}
        canAdd={true}
        canUpdate={true}
      >
        <MasterFormActions formRef={ref} />
      </FormContextProvider>
    )
    let submitButton = getByRole("button", { name: "Add Master" })
    let cancelButton = getByRole("button", { name: "Cancel" })
    fireEvent.click(submitButton)
    fireEvent.click(cancelButton)

    expect(submitClicked).toBeTruthy()
    expect(closeClicked).toBeTruthy()
  })
})
