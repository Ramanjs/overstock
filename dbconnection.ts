import mysql from "mysql2/promise"

export default async function dbconnection(): Promise<mysql.Connection> {
  const dbconn: mysql.Connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  });

  return dbconn;
}
