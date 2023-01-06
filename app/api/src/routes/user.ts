import { Router } from "express"
import UserRouteHandler from "../handlers/user/index.js"



const userRoute = Router({ strict: true })
const userRouteHandler = new UserRouteHandler()

// userRoute.post('/login', handleUserLogin)

userRoute.post('/profile', userRouteHandler.createUserProfile) // TODO:: protect route
userRoute.get('/profiles/:userRole', userRouteHandler.getUserProfile)
userRoute.get('/:userId/profile', userRouteHandler.getUserProfile)

// userRoute.put('/profile', updateUserProfile)
// userRoute.delete('/:userId/profile', deleteUserProfile)
// userRoute.post('/register', registerUser)

export default userRoute