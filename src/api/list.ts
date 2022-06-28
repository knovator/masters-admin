const apiList = {
    // Image Upload API
    IMAGE_UPLOAD: () => ({
        url: "files/upload",
        method: "post",
    }),
    LIST: ({ module }: API_INPUT_TYPE) => ({
        url: `admin/${module}/list`,
        method: "POST",
    }),
    CREATE: ({ module }: API_INPUT_TYPE) => ({
        url: `admin/${module}/create`,
        method: "POST",
    }),
    UPDATE: ({ module, id }: API_INPUT_TYPE) => ({
        url: `admin/${module}/update/${id}`,
        method: "PUT",
    }),
    DELETE: ({ module }: API_INPUT_TYPE) => ({
        url: `admin/${module}/soft-delete`,
        method: "PUT",
    }),
    SEQUENCE: ({ module, id }: API_INPUT_TYPE) => ({
        url: `admin/${module}/partial-update/sequence/${id}`,
        method: "PATCH",
    }),
}

export default apiList
