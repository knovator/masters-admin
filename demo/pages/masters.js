import { Master, Provider } from "@knovator/masters-admin";

export default function Home() {
  return (
    <Provider
        baseUrl="http://localhost:8080"
        token="ABCD" // token={getToken()}
    >
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
    </Provider>
  )
}
