import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../app.context";
import { EResponseCodes } from "./api-response";

class ApiResponse {
  constructor(data, code, message) {
    this.data = data;
    this.operation = { code, message };
  }
}

export function useApiService(apiURL) {
  const { authorization } = useContext(AppContext);

  async function get(endpoint, params) {
    try {
      const api = instanceApi(apiURL);
      return await api({
        method: "get",
        headers: {},
        url: `${endpoint}`,
        params: params,
      });
    } catch (error) {
      return axiosError(error);
    }
  }

  async function post(endpoint, data, params) {
    try {
      const api = instanceApi(apiURL);
      return await api({
        method: "post",
        url: `${endpoint}`,
        params: params,
        data: data,
      });
    } catch (error) {
      return axiosError(error);
    }
  }

  async function put(endpoint, data = {}, params = {}) {
    try {
      const api = instanceApi(apiURL);
      return await api({
        method: "put",
        url: `${endpoint}`,
        params: params,
        data: data,
      });
    } catch (error) {
      return axiosError(error);
    }
  }

  async function remove(endpoint, params = {}) {
    try {
      const api = instanceApi(apiURL);
      return await api({
        method: "delete",
        url: `${endpoint}`,
        params: params,
      });
    } catch (error) {
      return axiosError(error);
    }
  }

  function axiosError(error) {
    const errorMessage = "Hubo un error al cominicarse con la api.";
    return new ApiResponse(
      {},
      EResponseCodes.FAIL,
      String(error?.response?.request?.response).includes("html")
        ? errorMessage
        : JSON.parse(error?.response?.request?.response ?? "{}")?.operation
            ?.message ?? errorMessage
    );
  }

  function instanceApi() {
    const api = axios.create({
      baseURL: apiURL,
    });

    api.interceptors.request.use(
      (req) => {
        if (authorization.token) {
          req.headers["Content-Type"] = "application/json";
          req.headers.Accept = "application/json";
          req.headers.Authorization = `Bearer ${authorization.token}`;
        }
        return req;
      },
      (err) => {
        throw err;
      }
    );
    api.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        throw error;
      }
    );
    return api;
  }

  return {
    get,
    post,
    remove,
    put,
  };
}
