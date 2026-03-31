import { UserService } from "../services/User.service.js";

export class UserController {

    static async findAll(req, res) {
        try {
            const data = await UserService.findAll()
            res.status(200).json({
                message: "Usuarios encontrados con éxito",
                statusCode: 200,
                data
            })
        } catch (error) {
            res.status(500).json({
                message: "Error al encontrar los usuarios",
                statusCode: 500,
                error: error.message
            })
        }
    }
}