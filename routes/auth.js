import express from 'express';
import { addNewUser } from '../modals/users.js';
const router = express.Router()

router.post('/registration', async ({ body, db }, res) => {
    const userToCreate = body
    const [affectedRows] = await addNewUser(db, body)
    if (affectedRows) {
        res.json({
            status: true,
            message: 'User Added successfully'
        }).send()
    }

})

export default router