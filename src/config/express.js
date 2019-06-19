const helmet = require('helmet')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const morgan = require('morgan')
const logger = require('./logger')
const router = require('../router')

const blacklist = []

const corsOptions = {
  origin: function (origin, callback) {
    if (blacklist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error(`Origin ${origin} Not allowed by CORS`))
    }
  }
}

module.exports = (app) => {
  app.use(helmet())
  app.use(compression())
  app.use(bodyParser.json({ limit: process.env.MAX_UPLOAD_SIZE }))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cors(corsOptions))
  app.use(morgan('combined', { stream: logger.stream }))
  app.use('/orders', router)
  // catch errors for error handling
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)

    // render the error page
    res.status(err.status || 500).send({ message: err.message })
  })
}
