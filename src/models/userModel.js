const pool = require("../config/db");

/**
 * Find employee by email
 */
const findUserByEmail = async (email) => {
  try {
    const query = `
      SELECT * FROM employees 
      WHERE email = $1
    `;
    const { rows } = await pool.query(query, [email]);
    return rows[0] || null;
  } catch (error) {
    throw new Error("Error finding user by email: " + error.message);
  }
};

/**
 * Create new employee
 */
const createEmployee = async (
  user_name,
  email,
  password,
  mobile_number,
  department,
  role,
  salary,
  date_of_joining,
  status
) => {
  try {
    // 1. Generate a salt
    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 2. Prepare SQL query with hashed password
    const query = `
      INSERT INTO employees 
      (user_name, email, password_hash, mobile_number, department, role, salary, date_of_joining, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;

    const values = [
      user_name,
      email,
      password, // store hashed password
      mobile_number,
      department,
      role,
      salary,
      date_of_joining,
      status
    ];

    // 3. Execute the query
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw new Error("Error creating employee: " + error.message);
  }
};

/**
 * Get all employees (Controller format)
 */
const getAllEmployees = async () => {
  const query = `
    SELECT * FROM employees 
    WHERE status != 'inactive' OR status IS NULL
    ORDER BY employee_id DESC
  `;
  const { rows } = await pool.query(query);
  return rows;
};

const getInactiveEmployees = async () => {
  const query = `
    SELECT * FROM employees
    WHERE status = 'inactive'
    ORDER BY employee_id DESC
  `;
  const { rows } = await pool.query(query);
  return rows;
};
/**
 * Get employee by ID
 */
const getEmployeeById = async (id) => {
  try {
    const query = `
      SELECT * FROM employees 
      WHERE id = $1
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  } catch (error) {
    throw new Error("Error fetching employee by ID: " + error.message);
  }
};

/**
 * Update employee
 */
const updateEmployee = async (
  id,
  { user_name, email, mobile_number, department, role, salary, date_of_joining }
) => {
  try {
    const query = `
      UPDATE employees
      SET user_name = $1,
          email = $2,
          mobile_number = $3,
          department = $4,
          role = $5,
          salary = $6,
          date_of_joining = $7
      WHERE employee_id = $8
      RETURNING *
    `;

    const values = [
      user_name,
      email,
      mobile_number,
      department,
      role,
      salary,
      date_of_joining,
      id,
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw new Error("Error updating employee: " + error.message);
  }
};

/**
 * Delete employee
 */
const deleteEmployee = async (id) => {
  try {
    // Step 1: Mark employee inactive
    const deleteQuery = `
      UPDATE employees
      SET status = 'inactive'
      WHERE employee_id = $1
      RETURNING *;
    `;

    const { rows: deletedRows } = await pool.query(deleteQuery, [id]);

    if (!deletedRows[0]) {
      return { deleted: null, remaining: [] };
    }

    // Step 2: Fetch remaining active employees
    const fetchQuery = `
      SELECT * FROM employees 
      WHERE status != 'inactive'
      ORDER BY employee_id DESC;
    `;

    const { rows: remainingRows } = await pool.query(fetchQuery);

    return {
      deleted: deletedRows[0],
      remaining: remainingRows,
    };

  } catch (error) {
    console.error("Error in deleteEmployee:", error);
    throw new Error("Error deleting employee: " + error.message);
  }
};



module.exports = {
  findUserByEmail,
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getInactiveEmployees
};
