import { Router } from "express";
import {
  addClient,
  deleteClient,
  getClients,
  searchClient,
  updateClient,
} from "../controllers/clientsController.js";

const router = Router();

router.get("/clients", getClients);
router.get("/search", searchClient);
router.post("/clients", addClient);
router.put("/clients/:id", updateClient);
router.delete("/clients/:id", deleteClient);

export default router;
