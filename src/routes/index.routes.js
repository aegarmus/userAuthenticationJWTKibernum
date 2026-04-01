import { Router } from "express";
import userRouter from "./user.routes.js";
import authRouter from "./auth.routes.js";
import fileRouter from "./file.routes.js"

const router = Router()

router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/files', fileRouter)

export default router