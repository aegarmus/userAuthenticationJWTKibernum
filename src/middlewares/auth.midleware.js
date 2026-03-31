import jwt from "jsonwebtoken";
import { env } from "../config/env.config.js";
import { Logger } from "../utils/Logger.js";

const logger = new Logger('AUTH')
const { auth: { secret } } = env

export const verifyToken = (req, res, next) => {
    try {
        logger.info('Inicializando verificación de usuario')

        const authHeader = req.headers.authorization

        if(!authHeader) {
            logger.error('Token no proporcionado')
            res.status(401).json({
                message: 'Token no proporcionado',
                statusCode: 401
            })
            return
        }

        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

        if(!token) {
            logger.error('Token no proporcionado o malformado')
            res.status(401).json({
                message: 'Token no proporcionado o malformado',
                statusCode: 401
            })
            return
        }

        const decoded = jwt.verify(token, secret)

        logger.info('Payload decodificado: ', decoded)
        req.user = decoded

        logger.info(`Usuario autenticado: ${decoded.email}`)
        next()
    } catch (error) {
        logger.error(`Token inválido: ${error.message}`)
        return res.status(401).json({ 
            message: 'Token inválido o expirado', 
            statusCode: 401
        })
    }
}