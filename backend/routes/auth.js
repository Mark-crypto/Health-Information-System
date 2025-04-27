import { Router } from "express";
import {
  register,
  getAccessList,
  logout,
} from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/logout", logout);
router.get("/request-access", getAccessList);

export default router;
