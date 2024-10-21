const express = require("express");
const router = express.Router();
const AuthController = require("./controllers/auth.controller");
const EmployeeController = require("./controllers/employee.controller");
const EmployeeRepository = require("./repositories/employee.repository");
const UserRepository = require("./repositories/user.repository");
const ApplicationRepository = require("./repositories/application.repository");
const ApplicationController = require("./controllers/application.controller");
const { authMiddleware } = require("./middlewares/auth.middleware");

const userRepository = new UserRepository();
const authController = new AuthController(userRepository);

const applicationRepository = new ApplicationRepository();
const applicationController = new ApplicationController(applicationRepository);

const employeeRepository = new EmployeeRepository();
const employeeController = new EmployeeController(employeeRepository);




router.post("/auth/login", authController.login);
router.post("/auth/users/create", authController.createUser);

router.post("/employee/create", authMiddleware, employeeController.createEmployee);
router.delete("/employee/delete/:id", authMiddleware, employeeController.deleteEmployee);
router.post("/employee/get-paginated", authMiddleware,employeeController.getPaginatedEmployees);
router.get("/employee/get-all", authMiddleware, employeeController.getAllEmployees);
router.post("/application/create", authMiddleware, applicationController.createApplication);
router.delete("/application/delete/:id", authMiddleware,applicationController.deleteApplication);
router.post("/application/get-paginated", authMiddleware,applicationController.getPaginatedApplications);

module.exports = router;
