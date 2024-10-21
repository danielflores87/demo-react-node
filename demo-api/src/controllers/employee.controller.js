const {
  ApiResponse,
  EResponseCodes,
  EHttpStatusCodes,
} = require("../config/api.response");

class EmployeeController {
  constructor(employeeRepository) {
    this.employeeRepository = employeeRepository;
  }
  createEmployee = async (req, res) => {
    const employee = req.body;
    try {
      const newEmployee = await this.employeeRepository.createEmployee(
        employee
      );

      return res
        .status(EHttpStatusCodes.OK)
        .json(new ApiResponse(newEmployee, EResponseCodes.OK));
    } catch (error) {
      return res
        .status(EHttpStatusCodes.BAD_REQUEST)
        .json(new ApiResponse(null, EResponseCodes.FAIL, error.message));
    }
  };

  getAllEmployees = async (_req, res) => {
    try {
      const data = await this.employeeRepository.getAllEmployees();
      return res
        .status(EHttpStatusCodes.OK)
        .json(new ApiResponse(data, EResponseCodes.OK));
    } catch (error) {
      return res
        .status(EHttpStatusCodes.BAD_REQUEST)
        .json(new ApiResponse(null, EResponseCodes.FAIL, error.message));
    }
  };

  getPaginatedEmployees = async (req, res) => {
    try {
      const filters = req.body;
      const data = await this.employeeRepository.getPaginatedEmployees(filters);

      return res
        .status(EHttpStatusCodes.OK)
        .json(new ApiResponse(data, EResponseCodes.OK));
    } catch (error) {
      return res
        .status(EHttpStatusCodes.BAD_REQUEST)
        .json(new ApiResponse(null, EResponseCodes.FAIL, error.message));
    }
  };

  deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
      await this.employeeRepository.deleteEmployee(id);

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

module.exports = EmployeeController;
