import { Router } from "express"
import { getUserProfile, createUserProfile } from "../handlers/user/index.js"


const userRoute = Router({ strict: true })

// userRoute.post('/login', handleUserLogin)

userRoute.post('/profile', createUserProfile) // TODO:: protect route

userRoute.get('/:userId/profile', getUserProfile)
userRoute.get('/profiles/:userRole', getUserProfile)


// userRoute.put('/profile', updateUserProfile)

// userRoute.delete('/:userId/profile', deleteUserProfile)

// userRoute.post('/register', registerUser)

export default userRoute