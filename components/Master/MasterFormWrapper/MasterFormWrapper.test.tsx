import { render } from "@testing-library/react"
import MasterFormWrapper from "./MasterFormWrapper"
import FormContextProvider from "context/FormContext"

describe("Testing MasterFormWrapper", () => {
  it("Should throw error for not providing children", () => {
    expect(() =>
      render(
        <FormContextProvider
          closeForm={() => {}}
          formState={"ADD"}
          loading={false}
          onChangeFormState={(state) => {}}
          onDataSubmit={(data) => {}}
          updateData={{}}
        >
          {/* @ts-ignore */}
          <MasterFormWrapper />
        </FormContextProvider>
      )
    ).toThrow("Children should be passed as function, i.e. {({ formState, closeForm, open }) => {...}}")
  })
})
