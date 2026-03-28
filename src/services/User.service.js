import { User } from "../models/User.model.js";
import { generateToken } from "../utils/generateToken.util.js";
import { Logger } from "../utils/Logger.js";
import { hashPassword } from "../utils/password.util.js";

export class UserService {
    static logger = new Logger('USER_SERVICE')

    static async create(data) {
        try {
            this.logger.info('Inicalizando creación del usuario')
    
            data.password = await hashPassword(data.password)
    
            this.logger.info('Creando usuario en la base de datos')
            const user = await User.create(data)
            this.logger.debug('Usuario creado en base de datos')
    
            const userResponse = user.toJSON()
            delete userResponse.password
            delete userResponse.createdAt
            delete userResponse.updatedAt
            delete userResponse.deletedAt
    
            this.logger.debug('Usuario creaod con éxito')
            return userResponse
        } catch (error) {
            this.logger.error(`No pudimos crear al usuario ${error.message}`)
            throw new Error('No pudimos crear al usuario')
        }
    }

    static async register(data) {
        try {
            this.logger.info('Inicializando registro de usuario')

            console.log(data)
            //Verificar si el usuario existe
            this.logger.info('Verificando existencia del usuario')
            const existingUser = await User.findOne({ where: { email: data.email }})
            if(existingUser) {
                this.logger.error('El correo electrónico ya esta registrado')
                throw new Error('El correo electrónico ya esta registrado')
            }
            this.logger.debug('Nuevo usuario no esta registrado')

            //crear el usuario
            const user = await this.create(data)
            const token = generateToken(user)

            this.logger.info('Usuario registrado con éxito')
            return {
                user,
                token
            }
        } catch (error) {
            this.logger.error(`Error al registrar el usuario: ${error.message}`)
            throw new Error('Error al registrar el usuario')
        }
    }
}