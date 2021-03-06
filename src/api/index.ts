import fetchUrl, { setAPIConfig } from "@knovator/api"

import apiList from "./list"

const handleError = (error: Error) => {
    console.log(error)
}

const commonApi = async ({
    data,
    config,

    baseUrl,
    token,

    url,
    method,

    onError = handleError,
}: BaseAPIProps) => {
    let apiToken = token
    if (typeof token === "function") {
        apiToken = await token()
    }
    setAPIConfig({
        baseUrl,
        tokenPrefix: "jwt",
        getToken: apiToken,
        onError,
    })
    return fetchUrl({
        type: method,
        url,
        data,
        config,
    })
}

const getApiType = ({
    routes,
    action,
    module,
    id,
}: {
    routes?: Routes_Input
    action: ACTION_TYPES
    module: string
    id?: string
}): API_TYPE => {
    let route: API_TYPE
    if (routes && routes[action]) {
        route = routes[action]!({ module, id })
    } else {
        route = apiList[action]({ module, id })
    }
    return route
}

export default commonApi
export { getApiType }
