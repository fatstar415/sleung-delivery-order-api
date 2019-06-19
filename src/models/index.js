const Sequelize = require('sequelize')

const Order = require('./orders')

const DataTypes = Sequelize.DataTypes

module.exports = (sequelize) => {
  return {
    Order: Order.init(sequelize, DataTypes)
  }
}
