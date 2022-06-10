import { afterAll, afterEach, beforeAll } from "vitest"
import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import { setupServer } from "msw/node"
import { rest } from "msw"

import { Provider } from "context"
import Master from "./Master"

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
    name: "Known",
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
  rest.post("https://testapi.com/admin/masters/list", (req, res, ctx) => {
    let bodyOptions = (req.body as any).options
    let bodyDocs = [...docs]
    if (typeof bodyOptions.offset !== "undefined" && typeof bodyOptions.limit !== "undefined") {
      bodyDocs = bodyDocs.slice(Number(bodyOptions.offset), Number(bodyOptions.offset) + Number(bodyOptions.limit))
    }
    return res(ctx.status(200), ctx.json({ ...data1, data: { docs: bodyDocs } }))
  }),
  rest.patch("https://testapi.com/admin/masters/partial-update/activate/2123", (req, res, ctx) => {
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

describe("Testing MasterTable Component", () => {
  it("Should show table with actions and active checkbox", async () => {
    const { container } = render(
      <Provider
        baseUrl="https://testapi.com"
        permissions={{}}
        token={"abcd"}
        dataGetter={(response) => response.data.docs}
        paginationGetter={(response) => response.data}
      >
        <Master />
      </Provider>
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
    let editActions = container.getElementsByClassName("kms_actions-edit")
    expect(editActions.length).toBe(docs.length)
    // test delete actions count (Should be equal to length of records having canDel = true)
    let deleteActions = container.getElementsByClassName("kms_actions-delete")
    expect(deleteActions.length).toBe(docs.filter((doc) => doc.canDel).length)
  })
  it("Should call edit API when active data is updated", async () => {
    const { container } = render(
      <Provider
        baseUrl="https://testapi.com"
        permissions={{}}
        token={"abcd"}
        dataGetter={(response) => response.data.docs}
        paginationGetter={(response) => response.data}
      >
        <Master />
      </Provider>
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
        permissions={{}}
        token={"abcd"}
        dataGetter={(response) => response.data.docs}
        paginationGetter={(response) => response.data}
      >
        <Master limits={[1, 2]} />
      </Provider>
    )
    // Wait for Table to render fully
    await waitFor(() => {
      expect(screen.getByTestId("table")).toBeTruthy()
    })

    // screen.debug()
    // By default first Record Name should be existed in DOM
    expect(screen.queryByText("John")).toBeTruthy()
    expect(screen.queryByText("Patrik")).not.toBeTruthy()
    // console.log(johnTd, patrikTd)
    // expect(getByText("John")).toBeTruthy()
    // expect(getByText("Patrik")).toThrowError()
    // expect(getByText("Patrik")).toBeTruthy()

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
})
