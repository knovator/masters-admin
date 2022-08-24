import React from "react"
import { fireEvent, render } from "@testing-library/react"
import Pagination from "./Pagination"

describe("Testing Pagination Component", () => {
    it("should render Pagination component when all parameters provided", () => {
        let pageSize = 10,
            totalPages = 7,
            currentPage = 1,
            totalRecords = 33,
            limits = [5, 10, 15, 20]
        let setPageSize = (size: number) => (pageSize = size)
        let setCurrentPage = (page: number) => (currentPage = page)

        const { container, getByRole } = render(
            <Pagination
                currentPage={currentPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                totalRecords={totalRecords}
                limits={limits}
            />,
        )
        expect(container.querySelector(".kms_pagination")).toBeTruthy()
        expect(container.querySelector(".kms_pagination-pager")).toBeTruthy()
        expect(container.querySelectorAll(".kms_input").length).toBe(2)
        expect(container.querySelectorAll(".kms_btn.kms_btn-primary").length).toBe(2)
        expect((getByRole("button", { name: "Previous" }) as HTMLButtonElement).disabled).toBeTruthy()

        // Test limit input to have value currentPage
        let pager = container.querySelector("input[type=number]") as HTMLInputElement
        expect(pager).toBeTruthy()
        expect(pager.value).toBe(String(currentPage))

        // Test select to have value of pageSize
        let limiter = container.querySelector("select") as HTMLSelectElement
        expect(limiter).toBeTruthy()
        expect(limiter.value).toBe(String(pageSize))
    })

    it("Should handle actions without crossing boundaries", () => {
        let pageSize = 20,
            totalPages = 7,
            currentPage = 1,
            totalRecords = 33,
            limits = [5, 10, 15, 20]
        let setPageSize = (size: number) => (pageSize = size)
        let setCurrentPage = (page: number) => (currentPage = page)

        const { container, rerender, getByRole } = render(
            <Pagination
                currentPage={currentPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                totalRecords={totalRecords}
                limits={limits}
            />,
        )

        // Test Next button is working
        let nextButton = getByRole("button", { name: "Next" })
        fireEvent.click(nextButton)

        // Test Change limit is working
        let limiter = container.querySelector("select") as HTMLSelectElement
        fireEvent.change(limiter, { target: { value: 30 } })
        rerender(
            <Pagination
                currentPage={currentPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                totalRecords={totalRecords}
                limits={limits}
            />,
        )
        expect((container.querySelector("input[type=number]") as HTMLInputElement).value).toBe(String(currentPage))

        // Test Next button gets disabled when user reaches last page
        rerender(
            <Pagination
                currentPage={totalPages}
                pageSize={pageSize}
                setPageSize={setPageSize}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                totalRecords={totalRecords}
                limits={limits}
            />,
        )
        expect((getByRole("button", { name: "Next" }) as HTMLButtonElement).disabled).toBeTruthy()
    })
})
