import { useApiService } from "../helpers/api-service";

export function useAplicationService() {
  const apiURL = import.meta.env.VITE_URL_API ?? "";
  const userUrl = "/api/aplication";
  const { post } = useApiService(apiURL);

  async function createAplication(data) {
    const endpoint = "/create";
    return post(`${userUrl}${endpoint}`, data);
  }

  return {
    createAplication,
  };
}
