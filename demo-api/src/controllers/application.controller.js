const {
  ApiResponse,
  EResponseCodes,
  EHttpStatusCodes,
} = require("../config/api.response");

class ApplicationController {
  constructor(applicationRepository) {
    this.applicationRepository = applicationRepository;
  }

  createApplication = async (req, res) => {
    const application = req.body;
    try {
      const newApplication = await this.applicationRepository.createApplication(
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

  getPaginatedApplications = async (req, res) => {
    try {
      const filters = req.body;
      const data = await this.applicationRepository.getPaginatedApplications(
        filters
      );

      return res
        .status(EHttpStatusCodes.OK)
        .json(new ApiResponse(data, EResponseCodes.OK));
    } catch (error) {
      return res
        .status(EHttpStatusCodes.BAD_REQUEST)
        .json(new ApiResponse(null, EResponseCodes.FAIL, error.message));
    }
  };

  deleteApplication = async (req, res) => {
    const { id } = req.params;
    try {
      await this.applicationRepository.deleteApplication(id);

      return res
        .status(EHttpStatusCodes.OK)
        .json(new ApiResponse(true, EResponseCodes.OK));
    } catch (error) {
      return res
        .status(EHttpStatusCodes.BAD_REQUEST)
        .json(new ApiResponse(null, EResponseCodes.FAIL, error.message));
    }
  };
}

module.exports = ApplicationController;
