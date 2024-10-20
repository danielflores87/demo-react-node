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
    console.log(data)
    return res
      .status(EHttpStatusCodes.OK)
      .json(new ApiResponse(data, EResponseCodes.OK));
  } catch (error) {
    return res
      .status(EHttpStatusCodes.BAD_REQUEST)
      .json(new ApiResponse(null, EResponseCodes.FAIL, error.message));
  }
};

module.exports = { createEmployee, getAllEmployees };
