import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const isAuthenticatedUser = (req, res, next) => {
  try {
    const headers = req.headers["authorization"];
    const authToken = headers && headers.split(" ")[1];

    if (!authToken) {
      return res.status(401).json({
        error: true,
        message: "Access denied. Login to access.",
      });
    }
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({
        error: true,
        message: "Access denied. Login to access.",
      });
    }
    req.userInfo = decodedToken;
    next();
  } catch (error) {
    console.log("Error authenticating a user:", error);
    res.status(401).json({
      error: true,
      message: "Access denied. Login to access.",
    });
  }
};
