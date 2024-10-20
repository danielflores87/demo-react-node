import { useApiService } from "../helpers/api-service";

export function useEmployeeService() {
  const apiURL = import.meta.env.VITE_URL_API ?? "";
  const userUrl = "/api/employee";
  const { post, get, remove } = useApiService(apiURL);

  async function createEmployee(data) {
    const endpoint = "/create";
    return post(`${userUrl}${endpoint}`, data);
  }

  async function deleteEmployee(id) {
    const endpoint = "/delete";
    return remove(`${userUrl}${endpoint}/${id}`);
  }

  async function getAllEmployees() {
    const endpoint = "/get-all";
    return get(`${userUrl}${endpoint}`);
  }

  async function getPaginatedEmployees(filters) {
    const endpoint = "/get-paginated";
    return post(`${userUrl}${endpoint}`, filters);
  }

  return {
    createEmployee,
    getAllEmployees,
    getPaginatedEmployees,
    deleteEmployee,
  };
}
