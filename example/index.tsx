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
                <h2>Master</h2>
                <Master
                    explicitForm
                    permissions={{ add: false, list: true, update: true, destroy: true }}
                    limits={[1, 2, 3]}
                >
                    <Master.Search />
                    <Master.AddButton />
                    <Master.Table />
                    <Master.Pagination />

                    {/* <Master.FormWrapper>
						{(data) => (
							data.open ? <p onClick={data.onClose}>Drawer</p> : null
						)}
					</Master.FormWrapper> */}
                </Master>

				<h2>Sub-Master</h2>
				<Master>
					<Master.Lister />
					<SubMaster>
						<SubMaster.Table />
					</SubMaster>
				</Master>
            </Provider>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(<App />)
