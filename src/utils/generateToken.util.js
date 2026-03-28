import jwt from 'jsonwebtoken'
import { Logger } from "./Logger.js"
import { env } from '../config/env.config.js'


const logger = new Logger('AUTH')
const { auth: { secret, expiresIn } } = env 

export const generateToken = (user) => {
    try {
        logger.info('Generando token de autenticación')

        logger.info('Creando payload')

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email
        }

        logger.debug('firmando token de autenticación')
        const token = jwt.sign(payload, secret, { expiresIn })
        logger.debug('Token generado con éxito')

        return token
    } catch (error) {
        logger.error(`Error al generar el token: ${error.message}`);
        throw new Error('Error al generar el token')
    }
}