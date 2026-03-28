import dotenv from 'dotenv'

dotenv.config()

export const env = {
    server: {
        port: process.env.PORT || 4000,
        environment: process.env.ENVIRONMENT || 'DEV'
    }
}