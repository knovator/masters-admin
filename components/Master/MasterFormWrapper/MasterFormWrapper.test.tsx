import { render } from "@testing-library/react"
import FormContextProvider from "context/FormContext"

import MasterFormWrapper from "./MasterFormWrapper"

describe("Testing MasterFormWrapper", () => {
  it("Should throw error for not providing children", () => {
    expect(() =>
      render(
        <FormContextProvider
          closeForm={() => {}}
          formState={"ADD"}
          loading={false}
          onChangeFormState={() => {}}
          onDataSubmit={() => {}}
          updateData={{}}
        >
          {/* @ts-ignore */}
          <MasterFormWrapper />
        </FormContextProvider>,
      ),
    ).toThrow("Children should be passed as function, i.e. {({ formState, closeForm, open }) => {...}}")
  })
})
