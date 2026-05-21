import express from 'express'
const route = express.Router()

route.get('/posts', (req, res) => {
    res.send("Post will be sent")
})
export default route