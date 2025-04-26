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
      return res.status(401).json({
        error: true,
        message: "Invalid email or password was provided.",
      });
    }
    const hash = user[0].password;
    const doPasswordsMatch = await bcrypt.compare(password, hash);
    if (doPasswordsMatch === false) {
      return res.status(401).json({
        error: true,
        message: "Invalid email or password was provided.",
      });
    }
    const accessToken = jwt.sign(
      { name: user[0].name },
      process.env.JWT_ACCESS_TOKEN,
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = jwt.sign(
      { name: user[0].name },
      process.env.JWT_REFRESH_TOKEN,
      { expiresIn: "7d" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      data: {
        userId: user[0].id,
        name: user[0].name,
        email: user[0].email,
        role: user[0].role,
      },
      message: "You have logged in successfully.",
    });
  } catch (error) {
    console.log("An error logging in: ", error);
    res.status(401).json({
      error: true,
      message: "Something went wrong.Try again later.",
    });
  }
};
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const [doesEmailExist] = await connection.execute(
    "SELECT * FROM users WHERE email =?",
    [email]
  );
  console.log(doesEmailExist);
  if (doesEmailExist[0]) {
    return res
      .status(404)
      .json({ error: true, message: "Email is already in use." });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const response = await connection.execute(
      `INSERT INTO users(name, email, password)
       VALUES (?,?,?)`,
      [name, email, hashedPassword]
    );
    if (!response) {
      return res.status(500).json({
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

export const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  try {
    if (!refreshToken) {
      res
        .status(401)
        .json({ error: true, message: "Access denied. Login to access" });
    }
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN
    );
    if (!decodedToken) {
      res
        .status(401)
        .json({ error: true, message: "Access denied. Login to access" });
    }
    const newAccessToken = jwt.sign(
      { name: decodedToken.name },
      process.env.JWT_ACCESS_TOKEN,
      { expiresIn: "15m" }
    );
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.log("An error refreshing token:", error);
    res
      .status(401)
      .json({ error: true, message: "Access denied. Login to access" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logout successful" });
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
      return res.status(500).json({
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
