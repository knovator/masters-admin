import fetchUrl, { setAPIConfig } from "@knovator/api"

import apiList from "./list"

const commonApi = async ({
  data,
  config,

  baseUrl,
  token,

  url,
  method,
}: BaseAPIProps) => {
  setAPIConfig({
    baseUrl,
    tokenPrefix: "jwt",
    getToken: token,
    onError: (error: any) => console.log(error),
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
