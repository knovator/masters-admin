import React from "react"
import { fireEvent, render } from "@testing-library/react"
import Button from "."

describe("Testing Button component", () => {
    it("Should applied various classes when variations & size changes", () => {
        const { getByRole, rerender } = render(<Button label="Submit" />)
        let button = getByRole("button", { name: "Submit" })

        // // checking default class
        expect(button.className.split(" ")).toContain("kms_btn")
        // // checking primary (default) variation
        expect(button.className.split(" ")).toContain("kms_btn-primary")

        rerender(<Button label="Submit" size="sm" variant="secondary" />)
        button = getByRole("button", { name: "Submit" }) as HTMLButtonElement
        expect(button.className.split(" ")).toContain("kms_btn-secondary")
        expect(button.className.split(" ")).toContain("kms_btn-sm")
    })
    it("Should be disabled when disabled prop passed", () => {
        const { getByRole } = render(<Button label="Submit" size="sm" variant="secondary" disabled />)
        let button = getByRole("button", { name: "Submit" }) as HTMLButtonElement

        expect((button as HTMLButtonElement).disabled).toBeTruthy()
    })
    it("Should call onClick when clicked", () => {
        let clicked = false
        const onClick = () => (clicked = true)
        const { getByRole } = render(<Button label="Submit" size="sm" variant="secondary" onClick={onClick} />)
        let button = getByRole("button", { name: "Submit" }) as HTMLButtonElement
        fireEvent.click(button)
        expect(clicked).toBeTruthy()
    })
})
