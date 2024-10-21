const jwt = require("jsonwebtoken");
const {
  EHttpStatusCodes,
  ApiResponse,
  EResponseCodes,
} = require("../config/api.response");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(EHttpStatusCodes.UNAUTHORIZED)
      .json(new ApiResponse(null, EResponseCodes.FAIL, "Acceso no autorizado"));
  }

  // Verificar el token
  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err) {
      return res
        .status(EHttpStatusCodes.FORBIDDEN)
        .json(new ApiResponse(null, EResponseCodes.FAIL, "Token no valido"));
    }


    req.user = user;
    next(); 
  });
};

module.exports = { authMiddleware };
