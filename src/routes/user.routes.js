import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.midleware.js";

const router = Router()

router.get('/', verifyToken, UserController.findAll)

export default router