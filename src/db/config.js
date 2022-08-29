import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const user = process.env.DB_USER || "root";
const password = process.env.DB_PASSWORD || "";
const host = process.env.DB_HOST || "localhost";
const database = process.env.DB_NAME || "ruh";
const port = process.env.DB_PORT || 3306;

const db = mysql.createPool({
  user,
  password,
  host,
  database,
  port,
  dateStrings: true,
  ssl: false
});

export default db;
