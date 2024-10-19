const {
  ApiResponse,
  EResponseCodes,
  EHttpStatusCodes,
} = require("../config/api.response");
const UserRepository = require("../repositories/user.repository");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserRepository.getUserByEmail(email);

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

    return res
      .status(EHttpStatusCodes.OK)
      .json(new ApiResponse(null, EResponseCodes.OK));
  } catch (error) {
    return res
      .status(EHttpStatusCodes.BAD_REQUEST)
      .json(new ApiResponse(null, EResponseCodes.FAIL, error.message));
  }
};

module.exports = { login };
