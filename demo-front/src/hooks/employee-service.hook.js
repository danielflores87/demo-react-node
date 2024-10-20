import { useApiService } from "../helpers/api-service";

export function useEmployeeService() {
  const apiURL = import.meta.env.VITE_URL_API ?? "";
  const userUrl = "/api/employee";
  const { post, get } = useApiService(apiURL);

  async function createEmployee(data) {
    const endpoint = "/create";
    return post(`${userUrl}${endpoint}`, data);
  }

  async function getAllEmployees() {
    const endpoint = "/get-all";
    return get(`${userUrl}${endpoint}`);
  }

  return {
    createEmployee,
    getAllEmployees,
  };
}
