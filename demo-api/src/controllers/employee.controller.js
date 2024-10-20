const {
  ApiResponse,
  EResponseCodes,
  EHttpStatusCodes,
} = require("../config/api.response");
const EmployeeRepository = require("../repositories/employee.repository");

const createEmployee = async (req, res) => {
  const employee = req.body;
  try {
    const newEmployee = await EmployeeRepository.createEmployee(employee);

    return res
      .status(EHttpStatusCodes.OK)
      .json(new ApiResponse(newEmployee, EResponseCodes.OK));
  } catch (error) {
    return res
      .status(EHttpStatusCodes.BAD_REQUEST)
      .json(new ApiResponse(null, EResponseCodes.FAIL, error.message));
  }
};

const getAllEmployees = async (_req, res) => {
  try {
    const data = await EmployeeRepository.getAllEmployees();
    return res
      .status(EHttpStatusCodes.OK)
      .json(new ApiResponse(data, EResponseCodes.OK));
  } catch (error) {
    return res
      .status(EHttpStatusCodes.BAD_REQUEST)
      .json(new ApiResponse(null, EResponseCodes.FAIL, error.message));
  }
};

const getPaginatedEmployees = async (req, res) => {
  try {
    const filters = req.body;
    const data = await EmployeeRepository.getPaginatedEmployees(filters);

    return res
      .status(EHttpStatusCodes.OK)
      .json(new ApiResponse(data, EResponseCodes.OK));
  } catch (error) {
    return res
      .status(EHttpStatusCodes.BAD_REQUEST)
      .json(new ApiResponse(null, EResponseCodes.FAIL, error.message));
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    await EmployeeRepository.deleteEmployee(id);

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
  createEmployee,
  getAllEmployees,
  getPaginatedEmployees,
  deleteEmployee,
};
