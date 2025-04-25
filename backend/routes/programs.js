import { Router } from "express";
import {
  getPrograms,
  getSingleProgram,
  createProgram,
  updateProgram,
  deleteProgram,
  searchProgram,
  getClientsForProgram,
} from "../controllers/programsController.js";

const router = Router();

router.get("/programs", getPrograms);
router.get("/programs/:id", getSingleProgram);
router.get("/programs/:id/search", searchProgram);
router.get("/programs/:id/users", getClientsForProgram);
router.post("/programs", createProgram);
router.put("/programs/:id", updateProgram);
router.delete("/programs/:id", deleteProgram);

export default router;
