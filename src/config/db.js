const { Pool } = require("pg");

const pool = new Pool({
  host: 'postgresql-205543-0.cloudclusters.net',
  port: 10025,
  database: 'Assignment',
  user: 'Employee-portal',
  password: 'Assignment@12345',
  ssl: {
    rejectUnauthorized: false
  }
});


module.exports = pool;