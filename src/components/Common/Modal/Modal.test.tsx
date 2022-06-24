import React from "react"
import { fireEvent, render } from "@testing-library/react"
import Modal from "."

describe("Testing Modal component", () => {
    it("Should be visible show and should call onClose", () => {
        let functionCalled = false
        const onClose = () => (functionCalled = true)
        const { container, rerender, getByTestId } = render(<Modal open={false} onClose={onClose} />)
        expect(container.firstChild).toBeFalsy()
        rerender(<Modal open={true} onClose={onClose} />)
        expect(getByTestId("modal")).toBeTruthy()
        let closeButton = getByTestId("modal-close")
        fireEvent.click(closeButton)
        expect(functionCalled).toBeTruthy()
    })
})
