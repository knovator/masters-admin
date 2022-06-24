declare const commonApi: ({ data, config, baseUrl, token, url, method, onError, }: BaseAPIProps) => Promise<any>;
declare const getApiType: ({ routes, action, module, id, }: {
    routes?: Routes_Input | undefined;
    action: ACTION_TYPES;
    module: string;
    id?: string | undefined;
}) => API_TYPE;
export default commonApi;
export { getApiType };
