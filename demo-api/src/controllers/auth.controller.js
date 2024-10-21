const {
  ApiResponse,
  EResponseCodes,
  EHttpStatusCodes,
  ERoles,
} = require("../config/api.response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { hashPassword } = require("../config/hash");

class AuthController {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  createUser = async (req, res) => {
    const user = req.body;
    try {
      if (![ERoles.ADMIN, ERoles.EMPLOYEE].includes(user.role))
        return res
          .status(EHttpStatusCodes.BAD_REQUEST)
          .json(
            new ApiResponse(
              null,
              EResponseCodes.WARN,
              `El Rol del usuario solo puede ser ${ERoles.ADMIN} o ${ERoles.EMPLOYEE}`
            )
          );

      const password = await hashPassword(user.documentNumber);
      const newUser = await this.userRepository.createUser({
        ...user,
        password,
      });

      if (!newUser)
        return res
          .status(EHttpStatusCodes.BAD_REQUEST)
          .json(
            new ApiResponse(
              null,
              EResponseCodes.FAIL,
              "Error al crear el usuario"
            )
          );

      return res
        .status(EHttpStatusCodes.OK)
        .json(
          new ApiResponse(
            newUser,
            EResponseCodes.OK,
            `Se ha creado el usuario: "${user.email}" con contraseña: "${user.documentNumber}"`
          )
        );
    } catch (error) {
      return res
        .status(EHttpStatusCodes.BAD_REQUEST)
        .json(new ApiResponse(null, EResponseCodes.FAIL, error.message));
    }
  };

  login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await this.userRepository.getUserByEmail(email);

      if (!user)
        return res
          .status(EHttpStatusCodes.NOT_FOUND)
          .json(
            new ApiResponse(
              null,
              EResponseCodes.WARN,
              "No existe un usuario con el correo indicado"
            )
          );

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid)
        return res
          .status(EHttpStatusCodes.FORBIDDEN)
          .json(
            new ApiResponse(null, EResponseCodes.WARN, "Contraseña invalida")
          );

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.TOKEN_KEY ?? "",
        {
          expiresIn: "5h",
        }
      );

      return res
        .status(EHttpStatusCodes.OK)
        .json(new ApiResponse({ ...user, token }, EResponseCodes.OK));
    } catch (error) {
      return res
        .status(EHttpStatusCodes.BAD_REQUEST)
        .json(new ApiResponse(null, EResponseCodes.FAIL, error.message));
    }
  };
}

module.exports = AuthController;
