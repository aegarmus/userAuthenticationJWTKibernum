import fileUpload from "express-fileupload";
import path from 'node:path'
import { Logger } from "../utils/Logger.js";

const logger = new Logger('FILE_UPLOAD_MIDDLEWARE')

const ALLOWED_MIMETYPES = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp',
    'audio/wav',
    'video/mp4',
    'application/zip'
]

const ALLOWED_EXTENSIONS = [
    '.pdf', '.jpeg', '.png', '.webp', '.wav', '.mp4', '.zip'
]

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export const fileUploadMiddleware = fileUpload({
    limits: { fileSize: MAX_FILE_SIZE },
    abortOnLimit: true,
    limitHandler: (req, res) => {
        logger.warn('Archivo excede los limites de tamaño permitido (10MB)')
        return res.status(413).json({
            message: 'El arcihvo excede el tamaño máximo permitido (10MB)',
            statusCode: 413
        })
    },
    useTempFiles: true,
    tempFileDir: path.resolve('tmp/')
})


export const validateFile = (req, res, next) => {
    try {
        logger.info('Validando archivo enviado')

        if(!req.files || !req.files.file) {
            logger.warn('No se proporciono ningún archivo')
            return res.status(400).json({
                message: 'No se proporciono ningun archivo',
                statusCode: 400
            })
        }

        const file = req.files.file

        logger.debug('Asegurando tipo de archivo')
        if(!ALLOWED_MIMETYPES.includes(file.mimetype)) {
            logger.warn(`Tipo de archivo no permitido: ${file.mimetype}`)
            return res.status(400).json({
                message: `Tipo de archivo no permitido: ${file.mimetype}`,
                statusCode: 400
            })
        }

        logger.debug('Formato de archivo válido')

        logger.debug('Asegurando extensión del archivo')
        const extension = path.extname(file.name).toLowerCase()
        if(!ALLOWED_EXTENSIONS.includes(extension)) {
            logger.warn(`Tipo de extensión no permitida: ${extension}`)
            return res.status(400).json({
                message: `Tipo de extensión no permitida: ${extension}`,
                statusCode: 400
            })
        }

        logger.info(`Archivo válido: ${file.name}`)
        next()
    } catch (error) {
        logger.error(`Error al validar el archivo: ${error.message}`)
        return res.status(500).json({
            message: 'Error al validar el archivo',
            statusCode: 500
        })
    }
}