const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getInactiveEmployees
} = require("../models/userModel");
const bcrypt = require("bcrypt");

/**
 * Get all employees
 */
const getAllEmployeesController = async (req, res) => {
  try {
    const employees = await getAllEmployees();

    return res.status(200).json({
      success: true,
      data: employees,
    });

  } catch (error) {
    console.error("Error fetching employees:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllEmployeesByStatusController = async (req, res) => {
  try {
    const employees = await getAllEmployees();

    return res.status(200).json({
      success: true,
      data: employees,
    });

  } catch (error) {
    console.error("Error fetching employees:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


// Get In Active Employees
const getInactiveEmployeesController = async (req, res) => {
  try {
    const employees = await getInactiveEmployees();

    return res.status(200).json({
      success: true,
      data: employees,
    });

  } catch (error) {
    console.error("Error fetching employees:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * Get employee by ID
 */
const getEmployeeByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await getEmployeeById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: employee,
    });

  } catch (error) {
    console.error("Error fetching employee:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * Create new employee
 */
const createEmployeeController = async (req, res) => {
  try {
    const {
      user_name,
      email,
      password_hash,
      mobile_number,
      department,
      role,
      salary,
      date_of_joining,
      status
    } = req.body;
    const hashedPassword = await bcrypt.hash(password_hash, 10);
    const newEmployee = await createEmployee(
      user_name,
      email,
      hashedPassword,
      mobile_number,
      department,
      role,
      salary,
      date_of_joining,
      status
    );

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: newEmployee,
    });

  } catch (error) {
    console.error("Error creating employee:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error creating employee",
    });
  }
};

/**
 * Update employee
 */
const updateEmployeeController = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedEmployee = await updateEmployee(id, req.body);

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: updatedEmployee,
    });

  } catch (error) {
    console.error("Error updating employee:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * Delete employee (Mark as inactive)
 */
const deleteEmployeeController = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await userModel.deleteEmployee(id);

    if (!result.deleted) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee marked as inactive",
      deletedEmployee: result.deleted,
      remainingEmployees: result.remaining,
    });

  } catch (error) {
    console.error("Controller Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  getAllEmployeesController,
  getEmployeeByIdController,
  createEmployeeController,
  updateEmployeeController,
  deleteEmployeeController,
  getAllEmployeesByStatusController,
  getInactiveEmployeesController
};
