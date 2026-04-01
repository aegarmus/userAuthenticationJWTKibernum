import { Router } from 'express'
import { FileController } from '../controllers/file.controller.js'
import { fileUploadMiddleware, validateFile } from '../middlewares/file.middleware.js'
import { verifyToken } from '../middlewares/auth.midleware.js'

const router = Router()

router.post('/', verifyToken, fileUploadMiddleware, validateFile, FileController.upload)
router.get('/', verifyToken, FileController.findAll)

export default router