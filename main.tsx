import React from "react"
import ReactDOM from "react-dom/client"
import "./styles/index.css"

import Provider from "context/ProviderContext"
import Master from "components/Master"
import SubMaster from "components/SubMaster"

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTg1YjM0NjNhMTNmY2MzNGMxZDNjMSIsImVtYWlsIjoiYWRtaW5AbWFpbGluYXRvci5jb20iLCJpYXQiOjE2NTU3OTk5NzgsImV4cCI6MTY1NTg4NjM3OH0.kGlBTHHm0J3GIAJ_vTLetjtzlgOA0ZbNULioWQkEfJ0"
const API_URL = "https://api.orbitjobs.knovator.in"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Main() {
  // const formRef = useRef<HTMLFormElement>(null)
  return (
    <Provider
      baseUrl={API_URL}
      token={token}
      dataGetter={(response) => response.data.docs}
      paginationGetter={(response) => response.data}
      // eslint-disable-next-line no-console
      onError={(callbackcode, code, message) => console.error(callbackcode, code, message)}
    >
      <h1>Masters</h1>
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
          partialUpdate: true,
          sequencing: false,
          update: true,
        }}
      >
        <Master.Search />
        <Master.Lister />
        <Master.Pagination />
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
      </Master>

      <h2>SubMasters</h2>
      <SubMaster
        permissions={{
          list: true,
          add: true,
          destroy: true,
          partialUpdate: true,
          sequencing: false,
          update: true,
        }}
      />
    </Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root")!)

root.render(
  // <React.StrictMode>
  <Main />,
  // </React.StrictMode>,
)
