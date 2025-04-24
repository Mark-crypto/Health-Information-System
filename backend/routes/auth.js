import { Router } from "express";
import {
  login,
  register,
  getAccessList,
  requestAccess,
} from "../controllers/authController.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/request-access", getAccessList);
router.post("/request-access", requestAccess);

export default router;
