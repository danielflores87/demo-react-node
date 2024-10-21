const express = require("express");
const router = express.Router();
const AuthController = require("./controllers/auth.controller");
const applicationController = require("./controllers/application.controller");
const employeeController = require("./controllers/employee.controller");
const UserRepository = require("./repositories/user.repository");



const userRepository = new UserRepository();
const authController = new AuthController(userRepository);


router.post("/auth/login", authController.login);
router.post("/auth/users/create", authController.createUser);

router.post("/employee/create", employeeController.createEmployee);
router.delete("/employee/delete/:id", employeeController.deleteEmployee);
router.post(
  "/employee/get-paginated",
  employeeController.getPaginatedEmployees
);
router.get("/employee/get-all", employeeController.getAllEmployees);
router.post("/application/create", applicationController.createApplication);
router.delete(
  "/application/delete/:id",
  applicationController.deleteApplication
);
router.post(
  "/application/get-paginated",
  applicationController.getPaginatedApplications
);

module.exports = router;
