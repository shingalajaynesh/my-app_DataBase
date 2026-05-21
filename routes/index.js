import express from 'express'
import userRouter from './users.js'
import postRouter from './posts.js'
import authRouter from './auth.js'
const router = express.Router()

router.use(userRouter)
router.use(postRouter)
router.use(authRouter)

export default router