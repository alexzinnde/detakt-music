import { Router } from "express"
import { handleNewDemoSubmission, getAllDemos, getDemo, updateDemoRecord } from '../handlers/demo/index.js'


const demoRoute = Router({ strict: true })

demoRoute.post('/', handleNewDemoSubmission)
demoRoute.get('/', getAllDemos) // TODO: add auth middleware
demoRoute.get('/:demoId', getDemo)
demoRoute.put('/:demoId', updateDemoRecord)

export default demoRoute