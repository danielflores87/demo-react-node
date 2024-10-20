const {
  ApiResponse,
  EResponseCodes,
  EHttpStatusCodes,
} = require("../config/api.response");
const ApplicationRepository = require("../repositories/application.repository");

const createApplication = async (req, res) => {
  const application = req.body;
  try {
    const newApplication = await ApplicationRepository.createApplication(application);

    return res
      .status(EHttpStatusCodes.OK)
      .json(new ApiResponse(newApplication, EResponseCodes.OK));
  } catch (error) {
    return res
      .status(EHttpStatusCodes.BAD_REQUEST)
      .json(new ApiResponse(null, EResponseCodes.FAIL, error.message));
  }
};

module.exports = { createApplication };
