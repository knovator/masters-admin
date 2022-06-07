const apiList = {
  // Image Upload API
  imgUpload: {
    url: () => "files/upload",
    method: "post",
  },
  commonUrl: (module: string) => ({
    list: {
      url: () => `admin/${module}/list`,
      method: "POST",
    },
    create: {
      url: () => `admin/${module}/create`,
      method: "POST",
    },
    update: {
      url: (id: string) => `admin/${module}/update/${id}`,
      method: "PUT",
    },
    partialUpdate: {
      url: (id: string) => `admin/${module}/partial-update/activate/${id}`,
      method: "PATCH",
    },
    partialDefaultUpdate: {
      url: (id: string) => `admin/${module}/partial-update/default/${id}`,
      method: "PATCH",
    },
    delete: {
      url: () => `admin/${module}/soft-delete`,
      method: "PUT",
    },
    getList: {
      url: () => `admin/${module}/getList`,
      method: "POST",
    },
    getListById: {
      url: (id: string) => `/admin/${module}/${id}`,
      method: "GET",
    },
    partialUpdateId: {
      url: (id: string) => `admin/${module}/partial-update/${id}`,
      method: "PATCH",
    }
  }),
};

export default apiList;
