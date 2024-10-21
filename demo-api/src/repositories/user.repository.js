const User = require("../models/user");

class UserRepository {
  async getUserByEmail(email) {
    const user = await User.findOne({ where: { USR_CORREO: email } });

    return user?.dataValues;
  }

  async createUser(user) {
    await User.create(user);
    return user;
  }
}

module.exports = UserRepository;
