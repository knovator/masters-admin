import fetchUrl, { setAPIConfig } from "@knovator/api"

import apiList from "./list"

type ActionType = "list" | "create" | "update" | "partialUpdate" | "partialDefaultUpdate" | "delete" | "getList" | "getListById" | "partialUpdateId"

interface BaseAPIProps {
    parameters?: (string | number)[];
    module: string;
    data: any;
    config?: any;
    baseUrl: string;
    token: string;
}
interface CommonAPIProps extends BaseAPIProps {
  common: true;
  action: ActionType;
}
interface NonCommonAPIProps extends BaseAPIProps {
  common: false;
  action: "imgUpload";
}
interface APIType {
    url: (id?: string) => string;
    method: string;
}

const commonApi = async ({ parameters = [], action, module = "", data, config, common, baseUrl, token }: CommonAPIProps | NonCommonAPIProps) => {
  const api: APIType = common ? apiList.commonUrl(module)[action] : apiList[`${action}`]

  if (api) {
    setAPIConfig({
      baseUrl,
      tokenPrefix: "jwt",
      getToken: token,
      onError: (error: any) => console.log(error),
    });
    return fetchUrl({
      type: api.method,
      url: api.url(...parameters),
      data,
      config,
    })
  }
  return Promise.reject(new Error("Oops!, I guess its a wrong url."))
}

export default commonApi
