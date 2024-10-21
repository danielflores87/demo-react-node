const ApplicationController = require("../src/controllers/application.controller");
const ApplicationRepositoryFake = require("./application.repository.fake");
const { ApiResponse } = require("../src/config/api.response");
const {
  EResponseCodes,
  EHttpStatusCodes,
} = require("../src/config/api.response");

// Controller con mock
const repository = new ApplicationRepositoryFake();
const controller = new ApplicationController(repository);

describe("test ApplicationController", () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("test metodo createApplication", () => {
    it("Si se envia todos los datos correctos debe devolver exitoso con el tipo OK", async () => {
      const req = {
        body: {
          refenceCode: "Codigo de Referecia",
          description: "Descripcion",
          summary: "Resumen",
          employeeId: 1,
        },
      };

      await controller.createApplication(req, res);

      expect(res.status).toHaveBeenCalledWith(EHttpStatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(expect.any(ApiResponse));
      expect(res.json).toHaveBeenCalledWith(
        new ApiResponse({ ...req.body, id: 1 }, EResponseCodes.OK)
      );
    });

    it("Si no se envia los datos correctos debe retornar error y el tipo FAIL", async () => {
      const req = {
        body: null, // datos no validos
      };

      jest
        .spyOn(repository, "createApplication")
        .mockRejectedValue(new Error("Database error"));

      await controller.createApplication(req, res);

      expect(res.status).toHaveBeenCalledWith(EHttpStatusCodes.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith(
        new ApiResponse(null, EResponseCodes.FAIL, "Database error")
      );
    });
  });

  describe("test metodo getPaginatedApplications", () => {
    it("Debe devolver OK cuando se envian los datos correctos", async () => {
      const req = {
        body: { page: 1, perPage: 10 },
      };

      await controller.getPaginatedApplications(req, res);

      expect(res.status).toHaveBeenCalledWith(EHttpStatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(expect.any(ApiResponse));
      expect(res.json).toHaveBeenCalledWith(
        new ApiResponse({ rows: [], total: 1 }, EResponseCodes.OK)
      );
    });

    it("Debe devolver BAD_REQUEST cuando se produce un error", async () => {
      const req = {
        body: { page: 1, perPage: 10 },
      };
      jest
        .spyOn(repository, "getPaginatedApplications")
        .mockRejectedValue(new Error("Pagination error"));

      await controller.getPaginatedApplications(req, res);

      expect(res.status).toHaveBeenCalledWith(EHttpStatusCodes.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith(
        new ApiResponse(null, EResponseCodes.FAIL, "Pagination error")
      );
    });
  });

  describe("test metodo deleteApplication", () => {
    it("Debe devolver OK cuando se envian los datos correctos ", async () => {
      const req = {
        params: { id: 1 },
      };

      await controller.deleteApplication(req, res);

      expect(res.status).toHaveBeenCalledWith(EHttpStatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(
        new ApiResponse(true, EResponseCodes.OK)
      );
    });

    it("Debe devolver BAD_REQUEST cuando se produce un error", async () => {
      const req = {
        params: { id: 1 },
      };
      jest
        .spyOn(repository, "deleteApplication")
        .mockRejectedValue(new Error("Deletion error"));

      await controller.deleteApplication(req, res);

      expect(res.status).toHaveBeenCalledWith(EHttpStatusCodes.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith(
        new ApiResponse(null, EResponseCodes.FAIL, "Deletion error")
      );
    });
  });
});
