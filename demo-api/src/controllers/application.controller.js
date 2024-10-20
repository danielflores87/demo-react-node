const {
  ApiResponse,
  EResponseCodes,
  EHttpStatusCodes,
} = require("../config/api.response");
const ApplicationRepository = require("../repositories/application.repository");

const createApplication = async (req, res) => {
  const application = req.body;
  try {
    const newApplication = await ApplicationRepository.createApplication(
      application
    );

    return res
      .status(EHttpStatusCodes.OK)
      .json(new ApiResponse(newApplication, EResponseCodes.OK));
  } catch (error) {
    return res
      .status(EHttpStatusCodes.BAD_REQUEST)
      .json(new ApiResponse(null, EResponseCodes.FAIL, error.message));
  }
};

const getPaginatedApplications = async (req, res) => {
  try {
    const filters = req.body;
    const data = await ApplicationRepository.getPaginatedApplications(filters);

    return res
      .status(EHttpStatusCodes.OK)
      .json(new ApiResponse(data, EResponseCodes.OK));
  } catch (error) {
    return res
      .status(EHttpStatusCodes.BAD_REQUEST)
      .json(new ApiResponse(null, EResponseCodes.FAIL, error.message));
  }
};

const deleteApplication = async (req, res) => {
  const { id } = req.params;
  try {
    await ApplicationRepository.deleteApplication(id);

    return res
      .status(EHttpStatusCodes.OK)
      .json(new ApiResponse(true, EResponseCodes.OK));
  } catch (error) {
    return res
      .status(EHttpStatusCodes.BAD_REQUEST)
      .json(new ApiResponse(null, EResponseCodes.FAIL, error.message));
  }
};

module.exports = {
  createApplication,
  deleteApplication,
  getPaginatedApplications,
};
