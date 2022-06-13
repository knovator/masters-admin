import React from "react"
import ReactDOM from "react-dom/client"
import "./styles/index.css"

import Master from "components/Master"
import { Provider } from "context"

let newColumns: ColumnsSchema = [
  {
    Header: <u className="text-lg text-gray-500">Header</u>,
    accessor: "name",
    sortable: false,
  },
  {
    Header: "Description",
    accessor: "desc",
  },
  {
    Header: "Active",
    accessor: "isActive",
    Cell: ({ row, onUpdate }) => (
      <select value={row.isActive} onChange={(e) => onUpdate(e.target.value)}>
        <option value={"false"}>FALSE</option>
        <option value={"true"}>TRUE</option>
      </select>
    ),
  },
]

function Main() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGE0NDgzNTI3YzI4MTA0OGFkNjcxMyIsImVtYWlsIjoiYWRtaW5AbWFpbGluYXRvci5jb20iLCJpYXQiOjE2NTUwOTQ0MTIsImV4cCI6MTY1NTE4MDgxMn0.IGUafegixHwhWTOk_2qfmb8YSYs8a5ouOIk2gzOjXQ4"

  return (
    <Provider
      baseUrl="https://api.orbitjobs.knovator.in"
      permissions={{}}
      token={token}
      dataGetter={(response) => response.data.docs}
      paginationGetter={(response) => response.data}
    >
      <div className="grid grid-cols-2">
        <Master />

        {/* Customized Master */}
        <div className="max-h-screen overflow-auto">
          <Master
            routes={{
              UPDATE: ({ id }) => ({
                url: `abc/${id}`,
                method: "POST",
              }),
            }}
            limits={[10, 15, 20, 25]}
          >
            <div className="bg-slate-700 text-right w-full p-1">
              <Master.Search />
            </div>
            {/* Table */}
            <Master.Table columns={newColumns} />

            {/* Pagination */}
            <div className="container bg-slate-200 sticky bottom-0">
              <Master.Pagination />
            </div>
          </Master>
        </div>
      </div>
    </Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root")!)

root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
)
