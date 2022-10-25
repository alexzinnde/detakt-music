import express from 'express'
import demoRoutes from './demo'


const route = express.Router().use(express.json())

route.use('/demo', demoRoutes)


export default route