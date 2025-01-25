const Pool = require('mysql')
const { Connection } = require("mysql");

const mysql = require("mysql");
require("dotenv").config();

// use typeof for types imported
const pool: typeof Pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// changed to pool instead of createConnection

// Connect to MySQL, this runns automatically
pool.getConnection((err: Error, connection: typeof Connection) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as ID " + connection.threadId);
});



module.exports = pool;
