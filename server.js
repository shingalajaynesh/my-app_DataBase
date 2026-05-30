import express from 'express';
import { connect } from './demo_db_connection.js'
import router from './routes/index.js'
import cors from 'cors'
import { startWSServer } from './ws.js';
import http from 'http'
import { WebSocketServer } from 'ws';

const app = express()
const port = 3000
const server = http.createServer(app)
const wss = new WebSocketServer({ server, path: '/ws' });
app.use(cors())
app.use(express.json())
app.set('wss', wss);
const wsClients = new Map()
app.use(async (req, res, next) => {
    req.db = await connect()
    next()
})
app.use('/', router)

wss.on('connection', (ws, req) => {

    ws.on('message', (body) => {
        const data = JSON.parse(body.toString())
        if (data.topic === 'register') {
            wsClients.set(data.user, ws)
            ws.send("Thanks Registerd")
        } else {
            ws.send("Bye Bye")
        }
    })
})
app.set('clients', wsClients)

server.listen(port, () => {
    console.log("App Running on port " + port)
})