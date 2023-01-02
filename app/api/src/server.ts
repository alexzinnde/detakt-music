import express from 'express'
import cors from 'cors'

import userRoutes from './routes/user.js'
import demoRoute from './routes/demo.js'

const app = express()
app.use(express.json({ inflate: true }))
app.use(cors())

app.use('/user', userRoutes)
app.use('/demo', demoRoute)

app.get('/', (req, res) => {
  return res.send({ hello: 'world' })
})


export default app
