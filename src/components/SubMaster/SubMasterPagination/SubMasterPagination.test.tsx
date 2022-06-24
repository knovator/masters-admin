import React from "react"
import { fireEvent, render } from "@testing-library/react"
import SubMasterContextProvider from "../../../context/SubMasterContext"
import Pagination from "./SubMasterPagination"

describe("Testing Pagination Component", () => {
    it("should render Pagination component when all parameters provided", () => {
        let limits = [10, 20, 30, 40, 50],
            pageSize = limits[0],
            totalPages = 7,
            currentPage = 1,
            totalRecords = 33
        let setPageSize = (size: number) => (pageSize = size)
        let setCurrentPage = (page: number) => (currentPage = page)

        const { container, getByRole } = render(
            <SubMasterContextProvider
                limits={limits}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalRecords={totalRecords}
                canList={true}
            >
                <Pagination />
            </SubMasterContextProvider>,
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
        let limits = [1, 2, 3, 4],
            pageSize = limits[0],
            totalPages = 7,
            currentPage = 1,
            totalRecords = 33
        let setPageSize = (size: number) => (pageSize = size)
        let setCurrentPage = (page: number) => (currentPage = page)

        const { container, rerender, getByRole } = render(
            <SubMasterContextProvider
                limits={limits}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalRecords={totalRecords}
                canList={true}
            >
                <Pagination />
            </SubMasterContextProvider>,
        )

        // Test Next button is working
        let nextButton = getByRole("button", { name: "Next" })
        fireEvent.click(nextButton)

        // Test Change limit is working
        let limiter = container.querySelector("select") as HTMLSelectElement
        fireEvent.change(limiter, { target: { value: 30 } })
        rerender(
            <SubMasterContextProvider
                limits={limits}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalRecords={totalRecords}
                canList={true}
            >
                <Pagination />
            </SubMasterContextProvider>,
        )
        expect((container.querySelector("input[type=number]") as HTMLInputElement).value).toBe(String(currentPage))
    })
})
