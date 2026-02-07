const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "education_management_system",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
