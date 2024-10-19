const User = require("../models/user");

class UserRepository {
  static async getUserByEmail(email) {
    const user = await User.findOne({ where: { USR_CORREO: email } });
    return user;
  }
}

module.exports = UserRepository;
