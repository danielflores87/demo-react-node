const Application = require("../models/application");
const { Op } = require("sequelize");

class ApplicationRepository {
  static async createApplication(data) {
    await Application.create(data);
    return data;
  }

  static async deleteApplication(id) {
    const res = await Application.destroy({
      where: {
        id: id,
      },
    });
    return res;
  }

  static async getPaginatedApplications(filters) {
    const where = filters.description
      ? { description: { [Op.like]: `%${filters.description}%` } }
      : {};

    const { rows, count } = await Application.findAndCountAll({
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

module.exports = ApplicationRepository;
