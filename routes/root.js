import { Router } from 'express'
const rootRouter = Router()
import { join } from 'path'

rootRouter.get('^/$|index(.html)', (req, res) => {
    res.sendFile(join(__dirname, '..', 'views', 'index.html'))
})

rootRouter.get('/auth', (req, res) => {
    console.log(req.session)
    console.log(req.session.id)
    req.session.visited = true
    res.status(201).send({ msg: 'cookie-auth' })
})

export default rootRouter 