const Joi = require('@hapi/joi');
const Sequelize = require('sequelize')
const { db, Order } = require('../config/database')
const Op = Sequelize.Op

const schema = Joi.object().keys({
  id: Joi.number().integer().required(),
  status: Joi.string().required()
})

module.exports = (req, res, next) => {
  const { body, params } = req
  const props = {
    ...body,
    ...params
  }
  const { error, value } = Joi.validate(props, schema, { abortEarly: false });
  
  if (error) {
    throw error
  }

  return db.transaction((t) => {
    return Order.update({
      status: value.status
    }, {
      where: {
        id: value.id,
        status: {
          [Op.ne]: value.status
        }
      },
      transaction: t
    }).then((result) => {
      if (result[0] === 1) {
        return res.status(200).send({ status: 'SUCCESS' })
      } else {
        throw new Error(`Fail to take order`)
      }
    })
  }).catch((e) => {
    next(e)
  })
}