import { Sequelize } from 'sequelize'
import { env } from './env.config.js'

const { server: { environment } } = env
const { name, user, pass, host, port , dialect, url } = env.db

let config = null
if(environment === 'PROD') {
    config = new Sequelize(url, { dialect })

} else {
    config = new Sequelize(name, user, pass, { host, port, dialect })
}

export const dbConfig = config