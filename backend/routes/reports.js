import { Router } from "express";
import { getReports } from "../controllers/reportsController.js";

const router = Router();

router.get("/reports", getReports);

export default router;
