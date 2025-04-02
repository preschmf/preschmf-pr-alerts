import 'dotenv/config'
import express, { json, static as expressStatic } from 'express'
import errorHandler from './middleware/errorHandler.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import session from "express-session"
import { poll } from 'poll'
import { newReviewComments } from './controllers/newReviewComments.js'
import { getUserName } from './adapters/gitHubRequests.js'

const app = express()
const pollInterval = parseInt(process.env.POLL_INTERVAL, 10)
const PORT = process.env.PORT || 9000

import { logger } from './middleware/logger.js'

app.use(logger)
app.use(cors())
app.use(errorHandler)
app.use(json())
app.use(cookieParser())
app.use('/static', expressStatic('/public'))
app.use(session(
    {
        secret: "stuff",
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000 * 60 * 2
        }
    }
))
app.use(rootRouter)

app.listen(PORT, (error) => {
    if (!error)
        console.log(`Server running, listening on PORT ${PORT}`)
    else
        console.log(`Error occured, server cannot start ${error} `)
})

const userName = await getUserName()
await poll(async () => await newReviewComments(userName, pollInterval),
    pollInterval)