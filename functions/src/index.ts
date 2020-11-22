import * as functions from 'firebase-functions'
import express from 'express'
import cors from 'cors'
import {torelloEventRouter} from './controller/torello'

// Create Express server
const app: express.Express = express()

app.use(express.json({
    limit: '500mb',
    verify: (req: any, res: any, buf: Buffer) => {
        req.rawBody = buf
    }
}))
app.use(express.urlencoded({
    limit: '500mb',
    extended: true
}))

app.use(cors())

app.all('/torello', torelloEventRouter)

export const api = functions
    .region('asia-northeast1')
    .https.onRequest(app)
