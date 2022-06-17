import React from "react"
import ReactDOM from "react-dom/client"
import "./styles/index.css"

import Master from "components/Master"
import Provider from "context/ProviderContext"

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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTg1YjM0NjNhMTNmY2MzNGMxZDNjMSIsImVtYWlsIjoiYWRtaW5AbWFpbGluYXRvci5jb20iLCJpYXQiOjE2NTU0NDY4ODUsImV4cCI6MTY1NTUzMzI4NX0.kq9nyV5wg0L-OPO-w5ehZNWr50JFASHF5Vwr7GApcGg"
  // const formRef = useRef<HTMLFormElement>(null)
  return (
    <Provider
      baseUrl="https://api.orbitjobs.knovator.in"
      token={token}
      dataGetter={(response) => response.data.docs}
      paginationGetter={(response) => response.data}
      // eslint-disable-next-line no-console
      onError={(callbackcode, code, message) => console.error(callbackcode, code, message)}
    >
      <Master
        // routes={{
        //   UPDATE: ({ id }) => ({
        //     url: `abc/${id}`,
        //     method: "POST",
        //   }),
        // }}
        // loader={<p>Loading....</p>}
        // preConfirmDelete={({ row }) => {
        //   console.log(row)
        //   return Promise.resolve(true)
        // }}
        limits={[10, 15, 20, 25]}
        permissions={{
          list: true,
          add: true,
          destroy: true,
          partialUpdate: false,
          sequencing: false,
          update: true,
        }}
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

          {/* <Master.FormWrapper>
            {({ formState, open, onClose }) => {
              if (!open) return null
              else
                return (
                  <div>
                    <Master.Form ref={formRef} />
                    <Master.FormActions formRef={formRef} />
                  </div>
                )
            }}
          </Master.FormWrapper> */}
        </LayoutMaster>
      </Master>
    </Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root")!)

root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)
