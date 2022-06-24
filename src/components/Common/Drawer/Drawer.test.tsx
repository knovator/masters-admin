import React from "react"
import { fireEvent, render } from "@testing-library/react"
import Drawer from "."

describe("Testing Drawer component", () => {
    it("Should be visible on open and should call onClose", () => {
        let functionCalled = false
        const onClose = () => (functionCalled = true)
        const { container, rerender, getByTestId } = render(<Drawer open={false} onClose={onClose} />)
        expect(container.firstChild).toBeFalsy()
        rerender(<Drawer open={true} onClose={onClose} />)
        expect(getByTestId("drawer")).toBeTruthy()
        let closeButton = getByTestId("drawer-close")
        fireEvent.click(closeButton)
        expect(functionCalled).toBeTruthy()
    })
})
