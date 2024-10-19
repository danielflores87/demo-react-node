import axios, { AxiosInstance } from "axios";
import { ApiResponse, EResponseCodes } from "./api-response";
import { useContext } from "react";
import { AppContext } from "../app.context";


export function useApiService(apiURL: string) {
  const { authorization } = useContext(AppContext);

  async function get<T>(
    endpoint: string,
    params: Object = {}
  ): Promise<ApiResponse<T>> {
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

  async function post<T>(
    endpoint: string,
    data: Object = {},
    params: Object = {}
  ): Promise<ApiResponse<T>> {
    try {
      const api = instanceApi(apiURL);
      console.log(endpoint);
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

  async function put<T>(
    endpoint: string,
    data: Object = {},
    params: Object = {}
  ): Promise<ApiResponse<T>> {
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

  async function remove<T>(
    endpoint: string,
    params: Object = {}
  ): Promise<ApiResponse<T>> {
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

  function axiosError(error: any): ApiResponse<any> {
    const errorMessage = "Hubo un error al cominicarse con la api.";
    return new ApiResponse(
      {} as any,
      EResponseCodes.FAIL,
      String(error?.response?.request?.response).includes("html")
        ? errorMessage
        : JSON.parse(error?.response?.request?.response ?? "{}")?.operation
            ?.message ?? errorMessage
    );
  }

  function instanceApi(apiURL: string): AxiosInstance {
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
