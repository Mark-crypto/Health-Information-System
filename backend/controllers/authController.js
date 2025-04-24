import connection from "../database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await connection.execute(
      "SELECT * FROM users WHERE email=?",
      [email]
    );
    if (!user) {
      res.status(401).json({
        error: true,
        message: "Invalid email or password was provided.",
      });
    }
    const hash = user[0].password;
    const doPasswordsMatch = await bcrypt.compare(password, hash);
    if (doPasswordsMatch === false) {
      res.status(401).json({
        error: true,
        message: "Invalid email or password was provided.",
      });
    }
    const token = jwt.sign(user[0], process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      data: user[0],
      token,
      message: "You have logged in successfully.",
    });
  } catch (error) {
    console.log("An error logging in: ", error);
    res.status(500).json({
      error: true,
      message: "Something went wrong.Try again later.",
    });
  }
};
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const doesEmailExist = await connection.execute(
    "SELECT * FROM users WHERE email =?",
    [email]
  );
  if (doesEmailExist) {
    res.status(404).json({ error: true, message: "Email is already in use." });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const response = await connection.execute(
      "INSERT INTO users SET name=? email=? password=?",
      [name, email, hashedPassword]
    );
    if (!response) {
      res.status(500).json({
        error: true,
        message: "Something went wrong.Try again later.",
      });
    }
    res.status(201).json({ message: "User was created successfully." });
  } catch (error) {
    console.log("An error adding users to the database: ", error);
    res.status(500).json({
      error: true,
      message: "Something went wrong.Try again later.",
    });
  }
};
export const getAccessList = async (req, res) => {
  try {
    const [rows] = await connection.execute("SELECT * FROM request_access");
    res
      .status(200)
      .json({ data: rows, message: "Access list retrieved successfully" });
  } catch (error) {
    console.log("Error getting access list from database:", error);
    res.status(500).json({
      error: true,
      message: "Something went wrong.Try again later.",
    });
  }
};
export const requestAccess = async (req, res) => {
  const { name, email, phone, reason } = req.body;
  try {
    const response = await connection.execute(
      "INSERT INTO request_access SET name=? email=? phone=? reason=? ",
      [name, email, phone, reason]
    );
    if (!response) {
      res.status(500).json({
        error: true,
        message: "Something went wrong.Try again later.",
      });
    }
    res.status(201).json({ message: "Request was made successfully." });
  } catch (error) {
    console.log("Error making an access request:", error);
    res.status(500).json({
      error: true,
      message: "Something went wrong.Try again later.",
    });
  }
};
