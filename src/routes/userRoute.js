import { Router } from "express";
import {
  signupUser,
  loginUser,
  allUsers,
  logoutUser,
} from "../controller/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/all", authMiddleware, allUsers);
router.get("/logout", logoutUser);

export default router;

// default export => flexible => name import
