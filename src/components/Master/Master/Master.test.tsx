import React from "react"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"

import Master from "./Master"
import Provider from "../../../context/ProviderContext"

const docs = [
    {
        id: "2123",
        name: "John",
        isActive: true,
    },
    {
        id: "1234",
        name: "Patrik",
        isActive: false,
        canDel: true,
    },
    {
        id: "3456",
        name: "Abcd",
        isActive: true,
        canDel: true,
    },
]
const data1 = {
    code: "SUCCESS",
    data: { docs },
    limit: 1,
    page: 1,
    totalDocs: docs.length,
    totalPages: docs.length / 1,
}

const restHandlers = [
    rest.get("https://testapi.com/getAll", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({ ...data1, data: { docs: [{ id: "2123", name: "Milan", isActive: true }] } }),
        )
    }),
    rest.post("https://testapi.com/admin/masters/list", (req, res, ctx) => {
        let body = req.body as any
        let bodyOptions = body.options
        let bodyDocs = [...docs]
        if (typeof body.search !== "undefined") {
            bodyDocs = bodyDocs.filter((doc) =>
                String(doc.name).toLowerCase().includes(String(body.search).toLowerCase()),
            )
        }
        if (typeof bodyOptions.sort !== "undefined") {
            let sortConfig = Object.entries(bodyOptions.sort)[0]
            bodyDocs = bodyDocs.sort((a, b) => {
                if (sortConfig[0] === "name")
                    if (sortConfig[1] == 1) return String(a.name).localeCompare(String(b.name))
                    else return String(b.name).localeCompare(String(a.name))
                else if (sortConfig[0] === "isActive")
                    if (sortConfig[1] == 1)
                        // @ts-ignore
                        return Boolean(a.isActive) - Boolean(b.isActive)
                    // @ts-ignore
                    else return Boolean(b) - Boolean(a.isActive)
                else return 0
            })
        }
        if (typeof bodyOptions.offset !== "undefined" && typeof bodyOptions.limit !== "undefined") {
            bodyDocs = bodyDocs.slice(
                Number(bodyOptions.offset),
                Number(bodyOptions.offset) + Number(bodyOptions.limit),
            )
        }
        return res(ctx.status(200), ctx.json({ ...data1, data: { docs: bodyDocs } }))
    }),
    rest.put("https://testapi.com/admin/masters/update/2123", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ code: "SUCCESS", isActive: false }))
    }),
]

const server = setupServer(...restHandlers)
// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "warn" }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())

let permissions = {
    list: true,
    update: true,
    partialUpdate: true,
    destroy: true,
    add: true,
    sequencing: true,
}

describe("Testing MasterTable Component", () => {
    it("Should show table with actions and active checkbox", async () => {
        const { container } = render(
            <Provider
                baseUrl="https://testapi.com"
                token={"abcd"}
                dataGetter={(response) => response.data.docs}
                paginationGetter={(response) => response.data}
            >
                <Master permissions={permissions} />
            </Provider>,
        )
        // Wait for Table to render fully
        await waitFor(() => {
            expect(screen.getByTestId("table")).toBeTruthy()
        })
        // Test switches and actions count
        let switches = container.getElementsByClassName("kms_switch")
        expect(switches.length).toBe(docs.length)
        let actionItems = container.getElementsByClassName("kms_actions")
        expect(actionItems.length).toBe(docs.length)
        // test edit actions count (Should be equal to length of records)
        let editActions = container.getElementsByClassName("kms_actions-update")
        expect(editActions.length).toBe(docs.length)
        // test delete actions count (Should be equal to length of records having canDel = true)
        let deleteActions = container.getElementsByClassName("kms_actions-delete")
        expect(deleteActions.length).toBe(docs.filter((doc) => doc.canDel).length)
    })
    it("Should call edit API when active data is updated", async () => {
        const { container } = render(
            <Provider
                baseUrl="https://testapi.com"
                token={"abcd"}
                dataGetter={(response) => response.data.docs}
                paginationGetter={(response) => response.data}
            >
                <Master permissions={permissions} />
            </Provider>,
        )
        // Test switches and actions count
        await waitFor(() => {
            expect(screen.getByTestId("table")).toBeTruthy()
        })
        let toggleSwitch: HTMLInputElement | null = container.querySelector(".kms_switch input")
        expect(toggleSwitch!.checked).toBeTruthy()
        fireEvent.click(toggleSwitch!)
    })
    it("Should Show Pagination Actions", async () => {
        let limits = [1, 3, 5],
            defaultLimits = limits[0]
        const { container, getByRole } = render(
            <Provider
                baseUrl="https://testapi.com"
                token={"abcd"}
                dataGetter={(response) => response.data.docs}
                paginationGetter={(response) => response.data}
            >
                <Master limits={[1, 2]} permissions={permissions} />
            </Provider>,
        )
        // Wait for Table to render fully
        await waitFor(() => {
            expect(screen.getByTestId("table")).toBeTruthy()
        })

        // By default first Record Name should be existed in DOM
        expect(screen.queryByText("John")).toBeTruthy()
        expect(screen.queryByText("Patrik")).not.toBeTruthy()

        // Should Take first limit as default limit
        // Test select to have value of pageSize
        let limiter = container.querySelector("select") as HTMLSelectElement
        expect(limiter).toBeTruthy()
        expect(limiter.value).toBe(String(defaultLimits))

        // Next button Should show next set of data
        let nextButton = getByRole("button", { name: "Next" })
        expect(nextButton).toBeDefined()
        fireEvent.click(nextButton)
        await waitFor(() => {
            expect(screen.queryByText("Patrik")).toBeTruthy()
        })
        expect(screen.queryByText("John")).not.toBeTruthy()
    })
    it("Should Sort table", async () => {
        const { container, getByRole } = render(
            <Provider
                baseUrl="https://testapi.com"
                token={"abcd"}
                dataGetter={(response) => response.data.docs}
                paginationGetter={(response) => response.data}
            >
                <Master limits={[1, 2]} permissions={permissions} />
            </Provider>,
        )
        // Wait for Table to render fully
        await waitFor(() => {
            expect(screen.getByTestId("table")).toBeTruthy()
        })

        // Sorting Name field in Ascending order
        let nameHeader = getByRole("columnheader", { name: "Name ▲ ▼" })
        fireEvent.click(nameHeader)

        // Wait for API respose to repaint data
        await waitFor(() => {
            expect(container.querySelector("td")?.innerHTML).toBe("Abcd")
        })
    })
    it("Should consider custom routes when provided", async () => {
        const { container } = render(
            <Provider
                baseUrl="https://testapi.com"
                token={"abcd"}
                dataGetter={(response) => response.data.docs}
                paginationGetter={(response) => response.data}
            >
                <Master
                    routes={{
                        LIST: () => ({
                            url: "getAll",
                            method: "GET",
                        }),
                    }}
                    permissions={permissions}
                />
            </Provider>,
        )
        // Wait for Table to render fully
        await waitFor(() => {
            expect(screen.getByTestId("table")).toBeTruthy()
        })
        // check first row contains data returned by custom API
        expect(container.querySelector("td")?.innerHTML).toBe("Milan")
    })
    it("Should search masters when search input changes", async () => {
        const { container } = render(
            <Provider
                baseUrl="https://testapi.com"
                token={"abcd"}
                dataGetter={(response) => response.data.docs}
                paginationGetter={(response) => response.data}
            >
                <Master permissions={permissions} />
            </Provider>,
        )
        // Wait for Table to render fully
        await waitFor(() => {
            expect(screen.getByTestId("table")).toBeTruthy()
        })
        // Check all data are in tbody
        expect(container.querySelectorAll(".kms_tbody > tr").length).toBe(docs.length)

        // Change search input to "John"
        let searchInput = container.querySelector("input[type=search]")
        expect(searchInput).toBeTruthy()
        fireEvent.change(searchInput!, { target: { value: "John" } })

        // Wait to show only johns(1) record in tbody
        await waitFor(() => {
            expect(container.querySelectorAll(".kms_tbody > tr").length).toBe(1)
        })
    })
})
