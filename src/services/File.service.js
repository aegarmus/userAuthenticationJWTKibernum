import fs from 'node:fs'
import path from 'node:path'
import { Logger } from '../utils/Logger.js'

export class FileService {
    static logger = new Logger('FILE_SERVICE')
    static UPLOAD_DIR = path.resolve('src/uploads')

    static ensureUploadDir() {
        if(!fs.existsSync(this.UPLOAD_DIR)) {
            fs.mkdir(this.UPLOAD_DIR, { recursive: true }, (error) => this.logger.error(`Error al crear la ruta ${error}`))
            this.logger.info(`Directorio de subida de archivos creado en ${this.UPLOAD_DIR}`)
        }
    }

    static async upload(file) {
        try {
            this.logger.info(`Inicializando subida del archivo ${file.name}`)
            this.ensureUploadDir()

            this.logger.info(`Sanitizando nombre y ubicación del archivo`)
            const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
            const timeStamp = Date.now()
            const fileName = `${timeStamp}_${sanitizedName}`
            const filePath = path.join(this.UPLOAD_DIR, fileName)

            this.logger.info('Moviendo archivo')
            await file.mv(filePath)

            this.logger.info('Archivo subido de forma exitosa')
            return {
                originalName: file.name,
                fileName,
                size: file.size,
                mimeType: file.mimeType
            }
        } catch (error) {
            this.logger.error(`Error al subir el archivo: ${error.message}`)
            throw new Error('Error al subir el archivo')
        }
    }

    static async findAll() {
        try {
            this.logger.info('Inicializando lista de archivos')

            this.ensureUploadDir()

            const files = fs.readdirSync(this.UPLOAD_DIR) // Este método siempre devuelve un Array

            const fileList = files.map(file => {
                const filePath = path.join(this.UPLOAD_DIR, file)
                const stats = fs.statSync(filePath) // Me devuelve los metadatos del archivo

                return {
                    fileName: file,
                    size: stats.size,
                    createdAt: stats.birthtime,
                    updatedAt: stats.mtime
                }
            })

            this.logger.info(`Se encontraron ${fileList.length} archivos`)
            return fileList
        } catch (error) {
            this.logger.error(`Error al leer los archivos: ${error.message}`)
            throw new Error('Error al leer los archivo')
        }
    }
}