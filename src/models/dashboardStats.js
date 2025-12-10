const pool = require("../config/db.js"); 

const getDashboardStats = async (req, res) => {
  try {
    const query = `
      SELECT
        COUNT(*) AS total_employees,
        COUNT(DISTINCT department) AS total_departments,
        SUM(CASE 
              WHEN EXTRACT(YEAR FROM date_of_joining) = EXTRACT(YEAR FROM CURRENT_DATE)
               AND EXTRACT(MONTH FROM date_of_joining) = EXTRACT(MONTH FROM CURRENT_DATE)
              THEN 1 ELSE 0 
            END) AS new_this_month,
        SUM(CASE 
              WHEN EXTRACT(YEAR FROM date_of_joining) = EXTRACT(YEAR FROM CURRENT_DATE)
               AND EXTRACT(WEEK FROM date_of_joining) = EXTRACT(WEEK FROM CURRENT_DATE)
              THEN 1 ELSE 0
            END) AS new_employees_this_week,
        87 AS performance_index
      FROM employees;
    `;

    const { rows } = await pool.query(query);

    res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getDashboardStats,
};
