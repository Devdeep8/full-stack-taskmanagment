import api from "./api";

export const apiService = {
  get: (url, params = {}, config = {}) =>
    api.get(url, { params, ...config }),

  post: (url, data = {}, config = {}) =>
    api.post(url, data, config),

  put: (url, data = {}, config = {}) =>
    api.put(url, data, config),

  patch: (url, data = {}, config = {}) =>
    api.patch(url, data, config),

  delete: (url, data = {}, config = {}) =>
    api.delete(url, { data, ...config }),
};
