import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const connection = mysql.createPool({
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  user: process.env.USER,
  waitForConnections: true,
  connectionLimit: 10,
});

const connectToDB = async () => {
  try {
    const connect = await connection.getConnection();
    console.log("Connected to database");
    connect.release();
  } catch (error) {
    console.log("Error connecting to the database: ", error);
  }
};

connectToDB();

export default connection;
