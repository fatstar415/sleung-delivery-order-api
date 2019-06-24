const Sequelize = require('sequelize')
const createModels = require('../models')
const logger = require('./logger')

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 300,
    idle: 1000
  },
  timezone: 'Asia/Hong_Kong',
  benchmark: true,
  logging: console.log
})

db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`).then((res) => {
  console.info('Database create or successfully checked');
});

const models = createModels(db)

const connectDB = (db) => {
  return db.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.')
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err)
      return connectDB(db)
    })
}

connectDB(db)

db.sync()

module.exports = {
  db,
  ...models
}