import express, { urlencoded } from 'express'
import { env } from '../config/env.config.js'
import { httpLogger } from '../middlewares/logger.middleware.js'
import { Logger } from '../utils/Logger.js'


const { server: { port, environment } } = env
const app = express()
const logger = new Logger('SERVER')

export const bootstrap = (config = {}) => {
    environment === 'PROD' 
        ? logger.info('Servidor inicializado en modo Producción')
        : logger.info('Servidor inicializado en modo desarrollo')
        
    app.use(express.json())
    if(config.multiFormat) {
        logger.info('Inicializando form format en el servidor')
        app.use(urlencoded({ extended: true }))
    }

    if(config.loggerPerformance) {
        logger.info('Inicializando logger de performance')
        app.use(httpLogger)
    }

    try {
        
        app.listen(port, () => {
            logger.info(`Servidor inicializado en el puerto ${port}`)
        })
    } catch (error) {
        logger.error(`Error al inicializar el servidor ${error.message}`, error)
        process.exit(1)
    }

}