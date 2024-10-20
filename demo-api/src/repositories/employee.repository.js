const Employee = require("../models/employee");

class EmployeeRepository {
  static async createEmployee(data) {
    await Employee.create(data);
    return data;
  }

  static async getAllEmployees() {
    const res = await Employee.findAll();
    return res;
  }
}

module.exports = EmployeeRepository;
