import axios, { AxiosInstance } from "axios";
import humps from 'humps';

class HttpService {
  axios: AxiosInstance;

  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });

    this.reponseInterceptor();
  }

  reponseInterceptor() {
    // Add a response interceptor
    this.axios.interceptors.response.use(
      // @ts-ignore
      response =>
        // Do something with response data
        humps.camelizeKeys(response.data),
      // @ts-ignore
      error =>
        // Do something with response error
        Promise.reject(error.response || error.message)
    );
  }

  fetch(url: string, params?: object, config = {}) {
    return this.axios.get(url, {
      params,
      ...config
    });
  }

  create(url: string, data: object, config = {}) {
    return this.axios.post(url, data, {
      ...config
    });
  }

  update(url: string, data: object, config = {}) {
    return this.axios.put(url, data, {
      ...config
    });
  }

  patch(url: string, data: object, config = {}) {
    return this.axios.patch(url, data, {
      ...config
    });
  }

  remove(url: string, params: string, config = {}) {
    return this.axios.delete(url, {
      params,
      ...config
    });
  }
}

export default HttpService;
