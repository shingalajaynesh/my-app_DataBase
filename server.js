import express from 'express';
import { connect } from './demo_db_connection.js'
import router from './routes/index.js'
import cors from 'cors'
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(async (req, res, next) => {
    req.db = await connect()
    next()
})
app.use('/', router)
app.listen(port, () => {
    console.log("App Running on port " + port)
})