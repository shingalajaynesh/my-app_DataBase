import express from 'express';
import jwt from 'jsonwebtoken';
import { addNewUser, doLogin, getUserByEmail } from '../models/users.js';
const router = express.Router()

router.post('/registration', async ({ body, db }, res) => {

    const existingUser = await getUserByEmail(db, body.email)

    if (existingUser) {
        return res.status(400).json({
            status: false,
            message: 'User already exists'
        })
    }
    const [affectedRows] = await addNewUser(db, body)
    console.log(affectedRows)
    if (affectedRows) {
        res.json({
            status: true,
            message: 'User Added successfully'
        }).send()
    }

})

router.post('/login', async (req, res) => {

    const { email, password } = req.body
    const { db } = req

    const user = await doLogin(db, email, password)

    if (!user) {
        return res.status(401).json({
            status: false,
            message: 'Invalid email or password'
        })
    }
    const accessToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, 'mySecretKey', { expiresIn: '2h' });

    return res.json({
        status: true,
        message: 'Login successful',
        accessToken,
        user
    })
})


export default router