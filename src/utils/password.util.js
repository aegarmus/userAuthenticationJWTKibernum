import bcrypt from 'bcrypt'
import { env } from "../config/env.config.js";
import { Logger } from "./Logger.js";

const { auth: { saltRound }  } = env
const logger = new Logger('PASSWORD')

/**
 * Encripta una contraseña usando bcrypt
 * @param {string} password - La contraseña en texto plano 
 * @returns {Promise<string>} - contraseña encriptada
 */
export const hashPassword = async (password) => {
    try {
        logger.debug('Inicializando encriptación de contraseña')
        const hash = await bcrypt.hash(password, saltRound)
        logger.debug('Contraseña encriptada con éxito')
        return hash
    } catch (error) {
        logger.error(`Error al encriptar la contraseña ${error.message}`, error);
        throw new Error('Error al encriptar la contraseña')
    }
}

/**
 * Compara una constraseña en texto plano con una encriptada
 * @param {string} password - contraseña en texto plano
 * @param {string} hashedPassword - contraseña encriptada
 * @returns {Promise<boolean>} - devuelve un booleano dependiendo si coincide o no las contraseñas
 */
export const comparePassword = async (password, hashedPassword) => {
    try {
        logger.debug('Inicializando verificación de contraseña')
        const isMatch = await bcrypt.compare(password, hashedPassword) // Me va a deolver un booleano
        logger.debug(`Contraseña ${isMatch ? 'valida' : 'inválida'}`)
        return isMatch
    } catch (error) {
        logger.error(`Error al comparar contraseña ${error.message}`, error);
        throw new Error('Error al encriptar la contraseña')
    }
};