const Employee = require("../models/employee");
const { Op } = require("sequelize");

class EmployeeRepository {
  async createEmployee(data) {
    await Employee.create(data);
    return data;
  }

  static async getAllEmployees() {
    const res = await Employee.findAll();
    return res;
  }

  async deleteEmployee(id) {
    const res = await Employee.destroy({
      where: {
        id: id,
      },
    });
    return res;
  }

  async getPaginatedEmployees(filters) {
    const where = filters.name
      ? { name: { [Op.like]: `%${filters.name}%` } }
      : {};

    const { rows, count } = await Employee.findAndCountAll({
      where: where,

      offset: (Number(filters.page) - 1) * Number(filters.perPage),
      limit: filters.perPage,
    });

    return {
      rows: rows,
      total: count,
    };
  }
}

module.exports = EmployeeRepository;
