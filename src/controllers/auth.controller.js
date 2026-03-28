import { UserService } from "../services/User.service.js";

export class AuthController {
    static async register(req, res) {
        try {
            const data = await UserService.register(req.body)
            res.status(201).json({
                message: 'Usuario registrado con éxito',
                statusCode: 201,
                data
            })
        } catch (error) {
            res.status(500).json({
                message: "Usuario no registrado",
                statusCode: 500,
                data,
            });
        }
    }  
    static async login(req, res) {
        try {
            const data = await UserService.login(req.body)
            res.status(200).json({
                message: "Usuario registrado con éxito",
                statusCode: 200,
                data,
            });
        } catch (error) {
            res.status(403).json({
                message: "Usuario no registrado",
                statusCode: 403,
                data,
            });
        }
    } 
}