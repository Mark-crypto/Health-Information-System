import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const isAuthenticatedUser = (req, res, next) => {
  try {
    const authToken = req.cookies.accessToken;

    if (!authToken) {
      return res.status(401).json({
        error: true,
        message: "Access denied. Login to access.",
      });
    }
    const decodedToken = jwt.verify(authToken, process.env.JWT_ACCESS_TOKEN);
    if (!decodedToken) {
      return res.status(401).json({
        error: true,
        message: "Access denied. Login to access.",
      });
    }
    next();
  } catch (error) {
    console.log("Error authenticating a user:", error);
    res.status(401).json({
      error: true,
      message: "Access denied. Login to access.",
    });
  }
};
