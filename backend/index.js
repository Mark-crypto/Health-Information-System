import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";
dotenv.config();
import { getClientProfile } from "./controllers/clientsController.js";
import appRoutes from "./routes/index.route.js";

const app = express();
const PORT = process.env.PORT || 5000;
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 20,
  message: "Too many requests from this IP. Please try again later.",
});

app.use(cors());
app.use(express.json());
app.use("/api", appRoutes);

//Public API
app.get("/api/client/:id", limiter, getClientProfile);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
