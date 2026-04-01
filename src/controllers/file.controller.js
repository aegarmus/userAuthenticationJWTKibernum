import { FileService } from "../services/File.service.js"


export class FileController {
    static async upload(req, res) {
        try {
            const data = await FileService.upload(req.files.file)
            res.status(201).json({
                message: 'Archivo subido con éxito',
                statusCode: 201,
                data
            })
        } catch (error) {
            res.status(500).json({
                message: 'Error al subir el archivo',
                statusCode: 500,
                error: error.message
            })
        }
    }

    static async findAll(req, res) {
        try {
            const data = await FileService.findAll()
            res.status(200).json({
                message: 'Archivos encontrados',
                statusCode: 200,
                data
            })
        } catch (error) {
            res.status(500).json({
                message: 'Error al encontrar los archivos',
                statusCode: 500,
                error: error.message
            })
        }
    }
}