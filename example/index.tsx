import "react-app-polyfill/ie11"
import * as React from "react"
import ReactDOM from "react-dom/client"
import { Provider, Master, SubMaster } from "../."

const App = () => {
    return (
        <div>
            <Provider
                baseUrl="http://localhost:8080"
                token="ABCD" // token={getToken()}
            >
                <h2>Sub-Master</h2>
                <Master>
                    <Master.Lister />
                    <SubMaster>
                        <SubMaster.Search />
                        <SubMaster.AddButton />
                        <SubMaster.Table />
                        <SubMaster.Pagination />
                    </SubMaster>
                </Master>
            </Provider>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(<App />)
