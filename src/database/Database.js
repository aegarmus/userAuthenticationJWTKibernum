import { dbConfig } from "../config/db.config.js"
import { Logger } from "../utils/Logger.js"


export class DB {
    static logger = new Logger('DATABASE')

    static async init() {
        try {
            this.logger.info('Inicializando base de datos')

            this.logger.debug('Autenticando en Base de datos')
            await dbConfig.authenticate()
            this.logger.debug('Autenticado con éxito en la DB')

            this.logger.info('Sincronizando con la Base de datos')
            await dbConfig.sync()
            this.logger.info('Sincronización completa')
        } catch (error) {
            this.logger.error('No pudimos conectarnos a la base de datos')
            process.exit(1)
        }
    }
}