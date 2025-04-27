import { Router } from "express";
import {
  getPrograms,
  getSingleProgram,
  createProgram,
  updateProgram,
  deleteProgram,
  searchClientsInProgram,
  getClientsForProgram,
  registerExistingClient,
  deleteClientInProgram,
} from "../controllers/programsController.js";

const router = Router();

router.get("/programs", getPrograms);
router.get("/programs/:id", getSingleProgram);
router.get("/programs/:id/search", searchClientsInProgram);
router.get("/programs/:id/users", getClientsForProgram);
router.post("/programs/:id/users", registerExistingClient);
router.post("/programs", createProgram);
router.put("/programs/:id", updateProgram);
router.delete("/programs/:id", deleteProgram);
router.delete("/programs/:id/users/:clientId", deleteClientInProgram);

export default router;
