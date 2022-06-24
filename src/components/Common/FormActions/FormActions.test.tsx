import React from "react"
import { fireEvent, render } from "@testing-library/react"
import FormActions from "."

describe("Testing FormActions component", () => {
    it("Should call onClick when click on Primary & Secondary Button", () => {
        let primaryClicked = false,
            secondaryClicked = false
        const onPrimaryButtonClick = () => (primaryClicked = true)
        const onSecondaryButtonClick = () => (secondaryClicked = true)

        const { getByRole } = render(
            <FormActions onPrimaryButtonClick={onPrimaryButtonClick} onSecondaryButtonClick={onSecondaryButtonClick} />,
        )

        let primaryButton = getByRole("button", { name: "Submit" })
        fireEvent.click(primaryButton!)
        expect(primaryClicked).toBeTruthy()

        let secondaryButton = getByRole("button", { name: "Cancel" })
        fireEvent.click(secondaryButton!)
        expect(secondaryClicked).toBeTruthy()
    })
    it("Should be disabled when loading is passed", () => {
        const onPrimaryButtonClick = () => {}
        const onSecondaryButtonClick = () => {}

        const { getByRole } = render(
            <FormActions
                onPrimaryButtonClick={onPrimaryButtonClick}
                loading={true}
                onSecondaryButtonClick={onSecondaryButtonClick}
            />,
        )
        let primaryButton = getByRole("button", { name: "Submit" })
        expect((primaryButton as HTMLButtonElement).disabled).toBeTruthy()

        let secondaryButton = getByRole("button", { name: "Cancel" })
        expect((secondaryButton as HTMLButtonElement).disabled).toBeTruthy()
    })
    it("Should show different labels when passed", () => {
        const onPrimaryButtonClick = () => {}
        const onSecondaryButtonClick = () => {}

        const { getByRole } = render(
            <FormActions
                onPrimaryButtonClick={onPrimaryButtonClick}
                loading={true}
                primaryLabel="Add"
                secondaryLabel="Subtract"
                onSecondaryButtonClick={onSecondaryButtonClick}
            />,
        )

        let primaryButton = getByRole("button", { name: "Add" })
        expect(primaryButton).toBeTruthy()

        let secondaryButton = getByRole("button", { name: "Subtract" })
        expect(secondaryButton).toBeTruthy()
    })
})
