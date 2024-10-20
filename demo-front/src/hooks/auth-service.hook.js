import { useApiService } from "../helpers/api-service";

export function useAuthService() {
  const apiURL = import.meta.env.VITE_URL_API ?? "";
  
  const basePath = "/api/auth";
  const { get, post } = useApiService(apiURL);

  async function login(data) {
    return await post(`${basePath}/login`, data);
  }

  async function getAuthorization(token) {
    const endpoint = `/authorization/get-by-token/${token}`;
    return await get(`${basePath}${endpoint}`);
  }

  async function validateTokenRecovery(data) {
    const endpoint = "/validateTokenRecovery";
    return await post(`${basePath}${endpoint}`, data);
  }

  return {
    login,
    getAuthorization,
    validateTokenRecovery,
  };
}

export default useAuthService;
