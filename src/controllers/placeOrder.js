const Joi = require('@hapi/joi');
const { db, Order } = require('../config/database')
const logger = require('../config/logger')
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_API_KEY,
  Promise: Promise
})

const schema = Joi.object().keys({
  origin: Joi.array().items(Joi.string()).length(2).required(),
  destination: Joi.array().items(Joi.string()).length(2).required(),
})

module.exports = (req, res, next) => {
  const body = req.body
  const { error, value } = Joi.validate(body, schema, { abortEarly: false });
  if (error) {
    throw error
  }
  const { origin, destination } = value
  googleMapsClient.distanceMatrix({
    origins: [origin],
    destinations: [destination],
    mode: 'driving',
    units: 'metric'
  }, (err, response) => {
    if (!err) {
      const distance = getDistance(response)
      if (!distance) {
        throw new Error(`Could not get distance`)
      }
      return createOrder(origin, destination, distance)
        .then((order) => {
          const { id, distance, status } = order
          return res.status(200).send({
            id,
            distance,
            status
          })
        })
    } else if (err === 'timeout') {
      throw new Error(`Get distance timeout`)
    } else if (err.json) {
      // Inspect err.status for more info.
      throw new Error(err.status)
    } else {
      throw new Error('Get distance failed')
    }
  })
}

const createOrder = (origin, destination, distance) => {
  return Order.create({
    origin_long: origin[0],
    origin_lat: origin[1],
    destination_long: destination[0],
    destination_lat: destination[1],
    distance: distance,
    status: 'UNASSIGNED'
  })
}

const getDistance = (response) => {
  if (response.json && response.json.rows.length !== 0) {
    const infoRow = response.json.rows[0]
    if (infoRow.elements.length !== 0) {
      const info = response.json.rows[0].elements[0]
      return info.distance.value
    }
  }
  return null
}