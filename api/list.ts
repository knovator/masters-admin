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
    url: `admin/${module}/list`,
    method: "POST",
  }),
  UPDATE: ({ module, id }: API_INPUT_TYPE) => ({
    url: `admin/${module}/update/${id}`,
    method: "PUT",
  }),
  DELETE: ({ module, id }: API_INPUT_TYPE) => ({
    url: `admin/${module}/soft-delete`,
    method: "PUT",
  }),
}

export default apiList;
