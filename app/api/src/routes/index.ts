import Express from "express"
import demoRoute from "./demo.js";
import userRoute from "./user.js";

const apiV1 = Express.Router()

apiV1.use('/demo', demoRoute)
apiV1.use('/user', userRoute)


export default apiV1;