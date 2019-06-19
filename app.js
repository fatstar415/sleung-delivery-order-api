require('dotenv').config()
const logger = require('./src/config/logger')
const expressConfig = require('./src/config/express')
const app = require('express')()

expressConfig(app)

app.listen(process.env.APP_PORT, () => logger.info(`App listening on port ${process.env.APP_PORT}!`))
