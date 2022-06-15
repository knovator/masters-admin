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

interface LayoutMasterProps extends React.PropsWithChildren {
  headerDetail: any
}

const LayoutMaster = ({ headerDetail, children }: LayoutMasterProps) => {
  return (
    <div className="max-h-screen overflow-auto">
      <div className="bg-slate-100 sticky top-0">{headerDetail}</div>
      <div>{children}</div>
    </div>
  )
}

function Main() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTg1YjM0NjNhMTNmY2MzNGMxZDNjMSIsImVtYWlsIjoiYWRtaW5AbWFpbGluYXRvci5jb20iLCJpYXQiOjE2NTUyNjc5NjMsImV4cCI6MTY1NTM1NDM2M30.qpaK8Ap-wmMz7pGx24h9bpRsJpjhJmdQHqbRzcWgUV4"

  return (
    <Provider
      baseUrl="https://api.orbitjobs.knovator.in"
      permissions={{}}
      token={token}
      dataGetter={(response) => response.data.docs}
      paginationGetter={(response) => response.data}
      onError={(callbackcode, code, message) => console.error(callbackcode, code, message)}
    >
      <Master
        // routes={{
        //   UPDATE: ({ id }) => ({
        //     url: `abc/${id}`,
        //     method: "POST",
        //   }),
        // }}
        limits={[10, 15, 20, 25]}
      >
        <LayoutMaster
          headerDetail={
            <>
              <Master.Search />
              <Master.AddButton />
            </>
          }
        >
          <Master.Table columns={newColumns} />
          <div className="bg-slate-200 sticky bottom-0">
            <Master.Pagination />
          </div>
        </LayoutMaster>
      </Master>
    </Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root")!)

root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
)
