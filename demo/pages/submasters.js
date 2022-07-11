import { SubMaster, Provider, Master } from "@knovator/masters-admin";

export default function Home() {
  return (
    <Provider
        baseUrl="http://localhost:8080"
        token="ABCD" // token={getToken()}
    >
        <Master>
            <Master.Lister />
            <SubMaster>
                <SubMaster.Table />
            </SubMaster>
        </Master>
    </Provider>
  )
}
