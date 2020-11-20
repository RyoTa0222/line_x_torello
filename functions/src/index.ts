import * as functions from 'firebase-functions'
import express, { Request, Response } from 'express'
import cors from 'cors'
import axios from 'axios'
import {config} from '../const/config'

const querystring = require('querystring')

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

app.get('/test', (req: Request, res: Response) => {
    console.log(config.line.nortifytoken)
    res.end(config.line.nortifytoken)
})

app.get('/nortify', (req: Request, res: Response) => {
    axios(
        {
            method: 'post',
            url: 'https://notify-api.line.me/api/notify',
            headers: {
                Authorization: `Bearer ${config.line.nortifytoken}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: querystring.stringify({
                message: 'test'
            })
        }
    )
    .then( () =>  {
        console.log(config.line.nortifytoken)
        res.end(`finish`)
    })
    .catch( (err) => {
        res.end(err);
    });
})

app.all('/torello', (req: Request, res: Response) => {
    // id: 5fb6b556cb10e9707ef711a7
    console.log('aaa')
    res.sendStatus(200);
})

export const api = functions
    .region('asia-northeast1')
    .https.onRequest(app)
