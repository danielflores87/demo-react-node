const express = require("express");
const router = express.Router();
const authController = require("./controllers/auth.controller");
const applicationController = require("./controllers/application.controller");
const employeeController = require("./controllers/employee.controller");

router.post("/auth/login", authController.login);
router.post("/auth/users/create", authController.createUser);

router.post("/employee/create", employeeController.createEmployee);
router.delete("/employee/delete/:id", employeeController.deleteEmployee);
router.post("/employee/get-paginated", employeeController.getPaginatedEmployees);
router.get("/employee/get-all", employeeController.getAllEmployees);
router.post("/aplication/create", applicationController.createApplication);

module.exports = router;
