import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
dotenv.config();
import { getClientProfile } from "./controllers/clientsController.js";
import {
  login,
  refreshToken,
  requestAccess,
} from "./controllers/authController.js";
import appRoutes from "./routes/index.route.js";
import { isAuthenticatedUser } from "./middlewares/isAuthenticatedUser.js";

const app = express();
const PORT = process.env.PORT || 5000;
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 20,
  message: "Too many requests from this IP. Please try again later.",
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
//Public routes
app.post("/api/request-access", requestAccess);
app.get("/api/clients/:id", limiter, getClientProfile);
app.post("/api/refresh", refreshToken);
app.post("/api/login", login);

app.use("/api", isAuthenticatedUser, appRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
