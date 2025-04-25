import { Router } from "express";
import {
  addClient,
  deleteClient,
  getClients,
  searchClient,
  updateClient,
} from "../controllers/clientsController.js";

import { isAuthenticatedUser } from "../middlewares/isAuthenticatedUser.js";

const router = Router();

router.get("/clients", isAuthenticatedUser, getClients);
router.get("/clients/search", searchClient);
router.post("/clients", addClient);
router.put("/clients/:id", updateClient);
router.delete("/clients/:id", deleteClient);

export default router;
