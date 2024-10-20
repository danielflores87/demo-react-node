import { useApiService } from "../helpers/api-service";

export function useApplicationService() {
  const apiURL = import.meta.env.VITE_URL_API ?? "";
  const userUrl = "/api/application";
  const { post, remove } = useApiService(apiURL);

  async function createApplication(data) {
    const endpoint = "/create";
    return post(`${userUrl}${endpoint}`, data);
  }

  async function deleteApplication(id) {
    const endpoint = "/delete";
    return remove(`${userUrl}${endpoint}/${id}`);
  }

  async function getPaginatedApplications(filters) {
    const endpoint = "/get-paginated";
    return post(`${userUrl}${endpoint}`, filters);
  }

  return {
    createApplication,
    deleteApplication,
    getPaginatedApplications,
  };
}
