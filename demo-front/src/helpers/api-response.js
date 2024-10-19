const EResponseCodes = {
  OK: "OK",
  WARN: "WARN",
  FAIL: "FAIL",
  ASK: "ASK",
};

class ApiResponse {
  constructor(data, code, message) {
    this.data = data;
    this.operation = { code, message };
  }
}

// Exportar las constantes y clases
export default {
  EResponseCodes,
  ApiResponse,
};
