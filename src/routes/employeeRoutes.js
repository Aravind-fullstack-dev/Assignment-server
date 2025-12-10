const express = require('express');
const router = express.Router();
const {
  getAllEmployeesController,
  getEmployeeByIdController,
  createEmployeeController,
  updateEmployeeController,
  deleteEmployeeController,
  getAllEmployeesByStatusController,
  getInactiveEmployeesController
} = require('../controllers/employeeController');
const { getDashboardStats } = require('../models/dashboardStats');
const { verifyToken } = require('../middleware/authMiddleware');
// Dashboard stats route
router.get('/dashboard-stats',verifyToken, getDashboardStats);

//  Employee routes
router.get('/all-employees-data', getAllEmployeesController);
router.get('/get-employee-data/:id', getEmployeeByIdController);
router.post('/create-employee', createEmployeeController);
router.put('/update-employee/:id', updateEmployeeController);
router.get('/active-employees', getAllEmployeesByStatusController)
router.get('/inactive-employees', getInactiveEmployeesController)
router.delete('/delete-employee/:id', deleteEmployeeController);

module.exports = router;