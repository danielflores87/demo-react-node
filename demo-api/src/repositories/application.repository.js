const Application = require("../models/application");

class ApplicationRepository {
  static async createApplication(data) {
    await Application.create(data);
    return data;
  }
}

module.exports = ApplicationRepository;
