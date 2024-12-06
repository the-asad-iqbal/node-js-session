import { Router } from "express";
import { createUser } from "../controller/userController.js";

const router = Router();

router.post("/new", createUser);

export default router;
