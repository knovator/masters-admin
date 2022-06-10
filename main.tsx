import React from 'react';
import ReactDOM from "react-dom/client"
import "./styles/index.css"

import Master from "components/Master"
import { Provider } from "context"

let newColumns: ColumnsSchema = [
  {
    Header: <u className="text-lg text-gray-500">Header</u>,
    accessor: "name",
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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGE0NDgzNTI3YzI4MTA0OGFkNjcxMyIsImVtYWlsIjoiYWRtaW5AbWFpbGluYXRvci5jb20iLCJpYXQiOjE2NTQ4Mzk1NzksImV4cCI6MTY1NDkyNTk3OX0.aJkmAo6GCkss_zTBpiZuMHAatnVK0PE5ita3DdqqsZw"

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

        <Master
          limits={[1, 4, 6, 7, 10]}
          table={({ data }) => (
            <Master.Table columns={newColumns} data={data} actions={{ showEdit: false, atFirst: true }} />
          )}
          pagination={({ currentPage, setCurrentPage, totalPages, pageSize, setPageSize, totalRecords }) => (
            <div className="container bg-slate-200">
              <Master.Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalRecords={totalRecords}
              />
            </div>
          )}
        />
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
