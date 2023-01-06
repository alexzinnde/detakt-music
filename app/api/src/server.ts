import express from 'express'
import cors from 'cors'

import apiV1 from './routes/index.js'

const app = express()
app.use(express.json({ inflate: true }))
app.use(cors())

app.use('/api/v1', apiV1);

app.get('/', (req, res) => {
  return res.send({ hello: 'world' })
})


export default app
