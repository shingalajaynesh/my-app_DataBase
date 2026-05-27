import express from 'express'
import userRouter from './users.js'
import postRouter from './posts.js'
import authRouter from './auth.js'
import profileRouter from './profile.js'
import uploadpost from './uploadpost.js'
const router = express.Router()

router.use(userRouter)
router.use(postRouter)
router.use(authRouter)
router.use(profileRouter)
router.use(uploadpost)

export default router