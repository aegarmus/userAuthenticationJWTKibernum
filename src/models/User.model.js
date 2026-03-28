import { Model, DataTypes } from  'sequelize'

export class User extends Model{}

export const initUser = (dbConfig) => {
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false, 
                validate: {
                    notEmpty: { msg: 'El nombre no puede estar vacío'},
                    len: {
                        args: [2, 50],
                        msg: 'El nombre debe tener entre 2 y 50 caracteres'
                    },
                    is: {
                        args: /^[a-zA-Z\s]+$/i,
                        msg: 'El nombre solo puede contener letras y espacios'
                    }
                }
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false, 
                validate: {
                    notEmpty: { msg: 'El apellido no puede estar vacío'},
                    len: {
                        args: [2, 50],
                        msg: 'El apellido debe tener entre 2 y 50 caracteres'
                    },
                    is: {
                        args: /^[a-zA-Z\s]+$/i,
                        msg: 'El apellido solo puede contener letras y espacios'
                    }
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: { msg: 'El email no puede estar vacío'},
                    isEmail: { msg: 'El email debe ser válido'}
                }
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    is: {
                        args: /^(\+56[\s\-]?)?([2-9])[\s\-]?\d{3,4}[\s\-]?\d{4}$/,
                        msg: 'El número de teléfono debe ser válido'
                    }
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: 'la contraseña no puede estar vacía'},
                    len: {
                        arg: [6,100],
                        msg: 'La contraseña debe tener entre 6 a 100 caracteres'
                    }
                }
            }
        }, 
        {
            sequelize: dbConfig,
            modelName: 'User',
            tableName: 'users',
            timestamps: true,
            paranoid: true
        }
    )
}