const Pool = require("pg").Pool;

const pool = new Pool({
  user: "shujaat",
  password: "admin@123",
  database: "helpme",
  host: "localhost",
  port: 5432,
});

module.exports = pool;
