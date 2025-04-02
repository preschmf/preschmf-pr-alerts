import { logEvents } from './logger.js'

const errorHandler = (err, res) => {
    logEvents(`${err.name}: ${err.message}, 'errorlog.log`)

    const status = res.status ? res.statusCode : 500

    res.status(status)

    res.json({ message: err.message })
}

export default errorHandler