import { Router } from "express";
import {
  register,
  getAccessList,
  requestAccess,
  logout,
} from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/logout", logout);
router.get("/request-access", getAccessList);
router.post("/request-access", requestAccess);

export default router;
