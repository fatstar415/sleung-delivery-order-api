const Joi = require('@hapi/joi');
const { db, Order } = require('../config/database')
const logger = require('../config/logger')

const schema = Joi.object().keys({
  page: Joi.number().integer(),
  limit: Joi.number().integer(),
})

module.exports = (req, res, next) => {
  const query = req.query
  const { error, value } = Joi.validate(query, schema, { abortEarly: false });
  if (error) {
    throw error
  }

  return Order.findAll({
    limit: value.limit,
    offset: value.limit * value.page
  }).then((orders) => {
    return res.status(200).send(orders)
  })
}