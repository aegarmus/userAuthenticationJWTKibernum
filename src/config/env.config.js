import dotenv from 'dotenv'

dotenv.config()

export const env = {
    server: {
        port: process.env.PORT || 4000,
        environment: process.env.ENVIRONMENT || 'DEV'
    },
    db: {
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
    }
}