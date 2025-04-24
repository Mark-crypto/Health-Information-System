import { Router } from "express";
import programsRouter from "./programs.js";
import clientsRouter from "./clients.js";
import reportsRouter from "./reports.js";
import authRouter from "./auth.js";

const router = Router();

router.use(programsRouter);
router.use(clientsRouter);
router.use(reportsRouter);
router.use(authRouter);

export default router;
