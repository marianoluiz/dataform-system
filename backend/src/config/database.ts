import { Connection } from "mysql";
import dotenv from "dotenv";
const mysql = require("mysql");

dotenv.config();

// use typeof for types imported
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// changed to pool instead of createConnection

// Connect to MySQL, this runns automatically
pool.getConnection((err: Error, connection: Connection) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("\n\nConnected to MySQL as ID " + connection.threadId);
});



export { pool };