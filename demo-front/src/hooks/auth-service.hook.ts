import { useApiService } from "../helpers/api-service";

export function useAuthService() {
  const apiURL = import.meta.env.URL_API ?? "";
  const basePath = "/api/auth";
  const { get, post } = useApiService(apiURL);

  async function signIn(data) {
    return await post(`${basePath}/sign-in`, data);
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
    signIn,
    getAuthorization,
    validateTokenRecovery,
  };
}

export default useAuthService;
