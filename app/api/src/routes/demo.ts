import { Router } from "express"
import DemoRouteHandler from "../handlers/demo/index.js"


const demoRoute = Router({ strict: true })
const demoRouteHandler = new DemoRouteHandler()

demoRoute.post('/', demoRouteHandler.handleNewDemoSubmission)
demoRoute.get('/', demoRouteHandler.getAllDemos) // TODO: add auth middleware
demoRoute.get('/:demoId', demoRouteHandler.getDemoById)
demoRoute.delete('/:demoId', demoRouteHandler.deleteDemoById)

export default demoRoute