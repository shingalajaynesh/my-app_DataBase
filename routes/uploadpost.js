import express from 'express'
import auth from '../middleware/auth.js';
import { addImage } from '../models/users.js';
const route = express.Router()

route.post('/uploadpost', auth, async ({ db, body, user }, res) => {

    const [affectedRows] = await addImage(db, body, user.id)
    if (affectedRows) {
        res.json({
            status: true,
            message: 'Image Upload Successfully'
        }).send()
    }

    else {
        return res.status(401).json({
            status: false,
            message: 'Image Upload failed!'
        })
    }
})
export default route