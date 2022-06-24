import React from "react"
import { fireEvent, render } from "@testing-library/react"
import DeleteModal from "./DeleteModal"

describe("Testing DeleteModal component", () => {
    it("Should be visible when formState is 'DELETE' and should call onClose", () => {
        let functionCalled = false
        const onClose = () => (functionCalled = true)
        const { container, rerender, getByTestId } = render(
            <DeleteModal formState="ADD" itemData={{}} onClose={onClose} onConfirmDelete={() => {}} />,
        )
        expect(container.firstChild).toBeFalsy()
        rerender(<DeleteModal formState="DELETE" itemData={{}} onClose={onClose} onConfirmDelete={() => {}} />)
        expect(getByTestId("modal")).toBeTruthy()
        let closeButton = getByTestId("modal-close")
        fireEvent.click(closeButton)
        expect(functionCalled).toBeTruthy()
    })
    it("Should call confirmDelete when user types correct input", () => {
        let functionCalled = false
        const onConfirmDelete = () => (functionCalled = true)
        const onClose = () => {}
        const { container, getByRole } = render(
            <DeleteModal
                formState="DELETE"
                itemData={{ name: "John" }}
                onClose={onClose}
                onConfirmDelete={onConfirmDelete}
            />,
        )
        const button = getByRole("button", { name: "Confirm" }) as HTMLButtonElement
        expect(button?.disabled).toBeTruthy()

        const input = container.querySelector("input")
        fireEvent.change(input!, { target: { value: "John" } })
        expect(button?.disabled).toBeFalsy()

        fireEvent.click(button!)
        expect(functionCalled).toBeTruthy()
    })
})
