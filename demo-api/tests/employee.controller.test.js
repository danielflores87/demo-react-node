const EmployeeController = require("../src/controllers/employee.controller");
const EmployeeRepositoryFake = require("./employee.repository.fake");
const {
  ApiResponse,
  EResponseCodes,
  EHttpStatusCodes,
} = require("../src/config/api.response");

const repository = new EmployeeRepositoryFake();
const controller = new EmployeeController(repository);

describe("test EmployeeController", () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("test metodo createEmployee", () => {
    it("Debe retornar Ok si el crear es exitoso", async () => {
      const req = {
        body: {
          name: "Usuario Prueba",
          entryDate: "01/01/2000",
          salary: 1000000,
        },
      };

      await controller.createEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(EHttpStatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(expect.any(ApiResponse));
    });

    it("Debe retornar BAD_REQUEST  si hay un error en la ejecucion", async () => {
      const req = {
        body: { name: "John Doe", position: "Developer" },
      };

      // Mock de error
      jest
        .spyOn(repository, "createEmployee")
        .mockRejectedValue(new Error("Database error"));

      await controller.createEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(EHttpStatusCodes.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith(
        new ApiResponse(null, EResponseCodes.FAIL, "Database error")
      );
    });
  });

  describe("test metodo getAllEmployees", () => {
    it("should return all employees successfully", async () => {
      const req = {};

      const employees = [
        { id: 1, name: "John Doe", position: "Developer" },
        { id: 2, name: "Jane Doe", position: "Designer" },
      ];

      // Mock de la función getAllEmployees
      jest.spyOn(repository, "getAllEmployees").mockResolvedValue(employees);

      await controller.getAllEmployees(req, res);

      expect(res.status).toHaveBeenCalledWith(EHttpStatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(expect.any(ApiResponse));
    });

    it("Debe retornar BAD_REQUEST  si hay un error en la ejecucion", async () => {
      const req = {};

      // Mock de error
      jest
        .spyOn(repository, "getAllEmployees")
        .mockRejectedValue(new Error("Database error"));

      await controller.getAllEmployees(req, res);

      expect(res.status).toHaveBeenCalledWith(EHttpStatusCodes.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith(
        new ApiResponse(null, EResponseCodes.FAIL, "Database error")
      );
    });
  });

  describe("test metodo getPaginatedEmployees", () => {
    it("should return paginated employees successfully", async () => {
      const req = {
        body: { page: 1, perPage: 10, name: "John" },
      };

      const paginatedData = {
        rows: [
          { id: 1, name: "John Doe", position: "Developer" },
          { id: 2, name: "Jane Doe", position: "Designer" },
        ],
        total: 2,
      };

      // Mock de la función getPaginatedEmployees
      jest
        .spyOn(repository, "getPaginatedEmployees")
        .mockResolvedValue(paginatedData);

      await controller.getPaginatedEmployees(req, res);

      expect(res.status).toHaveBeenCalledWith(EHttpStatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(expect.any(ApiResponse));
    });

    it("Debe retornar BAD_REQUEST  si hay un error en la ejecucion", async () => {
      const req = {
        body: { page: 1, perPage: 10, name: "John" },
      };

      // Mock de error
      jest
        .spyOn(repository, "getPaginatedEmployees")
        .mockRejectedValue(new Error("Database error"));

      await controller.getPaginatedEmployees(req, res);

      expect(res.status).toHaveBeenCalledWith(EHttpStatusCodes.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith(
        new ApiResponse(null, EResponseCodes.FAIL, "Database error")
      );
    });
  });

  describe("test metodo deleteEmployee", () => {
    it("should delete an employee successfully", async () => {
      const req = {
        params: { id: 1 },
      };

      // Mock de la función deleteEmployee
      jest.spyOn(repository, "deleteEmployee").mockResolvedValue(true);

      await controller.deleteEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(EHttpStatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(
        new ApiResponse(true, EResponseCodes.OK)
      );
    });

    it("Debe retornar BAD_REQUEST  si hay un error en la ejecucion", async () => {
      const req = {
        params: { id: 1 },
      };

      // Mock de error
      jest
        .spyOn(repository, "deleteEmployee")
        .mockRejectedValue(new Error("Database error"));

      await controller.deleteEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(EHttpStatusCodes.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith(
        new ApiResponse(null, EResponseCodes.FAIL, "Database error")
      );
    });
  });
});
