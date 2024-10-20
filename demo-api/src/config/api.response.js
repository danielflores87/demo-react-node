const EResponseCodes = {
  OK: "OK",
  WARN: "WARN",
  FAIL: "FAIL",
};

const ERoles = {
  ADMIN: "Administrador",
  EMPLOYEE: "Empleado",
};

const EHttpStatusCodes = {
  OK: 200, // Success
  CREATED: 201, // Resource created
  ACCEPTED: 202, // Request accepted, but not yet processed
  NO_CONTENT: 204, // No content to send for this request
  MOVED_PERMANENTLY: 301, // Resource moved permanently
  FOUND: 302, // Resource found, but temporarily located elsewhere
  NOT_MODIFIED: 304, // Resource not modified since last request
  BAD_REQUEST: 400, // Client error: bad request
  UNAUTHORIZED: 401, // Client error: authentication required
  FORBIDDEN: 403, // Client error: access denied
  NOT_FOUND: 404, // Client error: resource not found
  METHOD_NOT_ALLOWED: 405, // Client error: request method not supported
  CONFLICT: 409, // Client error: conflict with current state
  INTERNAL_SERVER_ERROR: 500, // Server error: unexpected condition
  NOT_IMPLEMENTED: 501, // Server error: request method not supported
  BAD_GATEWAY: 502, // Server error: invalid response from upstream server
  SERVICE_UNAVAILABLE: 503, // Server error: service temporarily unavailable
};

class ApiResponse {
  constructor(data, code, message) {
    this.data = data;
    this.operation = { code, message: message || "Operación Exitosa" };
  }
}

module.exports = { EResponseCodes, EHttpStatusCodes, ApiResponse, ERoles };
