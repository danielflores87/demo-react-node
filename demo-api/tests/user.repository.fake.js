const { ERoles } = require("../src/config/api.response");
const { hashPassword } = require("../src/config/hash");

class UserRepositoryFake {
  constructor() {
    this.user = {
      id: 1,
      documentNumber: "797955",
      name: "User Test",
      email: "test@gmail.com",
      password: "",
      role: ERoles.ADMIN,
    };
  }

  async getUserByEmail(email) {
    const password = await hashPassword("123456");

    if (this.user.email == email) return { ...this.user, password };
    else return null;
  }
}

module.exports = UserRepositoryFake;
