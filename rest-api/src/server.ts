import 'dotenv/config'
import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import routes from './routes'

const { API_BASE_URL } = process.env
if (!API_BASE_URL) {
  throw new Error('API_BASE_URL missing')
}

const server = express()

server.use(morgan('dev'))
server.use(cors())


server.use(API_BASE_URL, routes)


export { server }