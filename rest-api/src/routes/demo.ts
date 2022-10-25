import express from 'express'
import { handleDemoSubmit, handleGetAllDemos, handleUpdateDemo, handleDeleteDemo, handleGetDemoById } from '../controllers/demo'

const route = express.Router({ strict: true })

route.post('/', handleDemoSubmit)

// TODO: add auth middleware
route.get('/all', handleGetAllDemos)
route.get('/:id', handleGetDemoById)
route.put('/:id', handleUpdateDemo)
route.delete('/:id', handleDeleteDemo)

export default route