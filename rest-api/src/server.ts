import 'dotenv/config'
import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import routes from './routes'

const server = express()

server.use(morgan('dev'))
server.use(cors())


server.use('/api', routes)


export { server }