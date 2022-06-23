declare const apiList: {
    IMAGE_UPLOAD: () => {
        url: string;
        method: string;
    };
    LIST: ({ module }: API_INPUT_TYPE) => {
        url: string;
        method: string;
    };
    CREATE: ({ module }: API_INPUT_TYPE) => {
        url: string;
        method: string;
    };
    UPDATE: ({ module, id }: API_INPUT_TYPE) => {
        url: string;
        method: string;
    };
    DELETE: ({ module }: API_INPUT_TYPE) => {
        url: string;
        method: string;
    };
    SEQUENCE: ({ module, id }: API_INPUT_TYPE) => {
        url: string;
        method: string;
    };
};
export default apiList;
