import "react-app-polyfill/ie11"
import "../dist/style.css"
import * as React from "react"
import ReactDOM from "react-dom/client"
import { Provider, Master, SubMaster } from "../."

const App = () => {
    const [view, setView] = React.useState("master")

    return (
        <div>
            <label htmlFor="master">
                <input
                    type="radio"
                    name="view"
                    value="master"
                    id="master"
                    defaultChecked={view === "master"}
                    onClick={(e) => setView("master")}
                />{" "}
                Master
            </label>
            <label htmlFor="submaster">
                <input
                    type="radio"
                    name="view"
                    value="submaster"
                    id="submaster"
                    defaultChecked={view === "submaster"}
                    onClick={(e) => setView("submaster")}
                />{" "}
                SubMaster
            </label>
            <Provider
                baseUrl="http://localhost:8080"
                token="ABCD" // token={getToken()}
            >
                {view === "submaster" ? (
                    <Master limits={[1, 2, 3, 4, 5]}>
                        <Master.Lister />
                        <SubMaster limits={[1, 2, 3, 4, 5]}>
                            <SubMaster.Search />
                            <SubMaster.AddButton />
                            <SubMaster.Table />
                            <SubMaster.Pagination />
                        </SubMaster>
                    </Master>
                ) : (
                    <Master limits={[1, 2, 3]} />
                )}
            </Provider>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(<App />)
