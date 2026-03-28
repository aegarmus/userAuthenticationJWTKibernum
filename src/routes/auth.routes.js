import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller.js'

const router = Router()

router.post('/signUp', AuthController.register)

export default router