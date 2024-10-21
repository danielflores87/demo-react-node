const AuthController = require("../src/controllers/auth.controller");
const UserRepositoryFake = require("./user.repository.fake");
const { ApiResponse } = require("../src/config/api.response");
const {
  EResponseCodes,
  EHttpStatusCodes,
} = require("../src/config/api.response");
require("dotenv").config();

// Controller con mock
const repository = new UserRepositoryFake();
const controller = new AuthController(repository);

describe("test AuthController", () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("test metodo login", () => {
    it("Si se envia un correo inexistente debe retornar NOT_FOUND ", async () => {
      const req = {
        body: {
          email: "noExiste",
          password: "123456",
        },
      };

      await controller.login(req, res);

      expect(res.status).toHaveBeenCalledWith(EHttpStatusCodes.NOT_FOUND);
      expect(res.json).toHaveBeenCalledWith(expect.any(ApiResponse));
      expect(res.json).toHaveBeenCalledWith(
        new ApiResponse(
          null,
          EResponseCodes.WARN,
          "No existe un usuario con el correo indicado"
        )
      );
    });

    it("Si se envia una contraseña incorrecta debe retornar FORBIDDEN ", async () => {
      const req = {
        body: {
          email: "test@gmail.com",
          password: "12345678",
        },
      };

      await controller.login(req, res);

      expect(res.status).toHaveBeenCalledWith(EHttpStatusCodes.FORBIDDEN);
      expect(res.json).toHaveBeenCalledWith(expect.any(ApiResponse));
      expect(res.json).toHaveBeenCalledWith(
        new ApiResponse(null, EResponseCodes.WARN, "Contraseña invalida")
      );
    });

    it("Si se envia todo bien debe retornar OK con un token ", async () => {
      const req = {
        body: {
          email: "test@gmail.com",
          password: "123456",
        },
      };

      await controller.login(req, res);
      expect(res.status).toHaveBeenCalledWith(EHttpStatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(expect.any(ApiResponse));
    });

    it("Debe devolver BAD_REQUEST cuando se produce un error", async () => {
      const req = {
        body: {
          email: "test@gmail.com",
          password: "123456",
        },
      };

      jest
        .spyOn(repository, "getUserByEmail")
        .mockRejectedValue(new Error("Error no controlado"));

      await controller.login(req, res);

      expect(res.status).toHaveBeenCalledWith(EHttpStatusCodes.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith(
        new ApiResponse(null, EResponseCodes.FAIL, "Error no controlado")
      );
    });
  });
});
