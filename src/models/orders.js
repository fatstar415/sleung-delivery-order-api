const Sequelize = require('sequelize')

const Model = Sequelize.Model;

class Order extends Model {
  static init (sequelize, DataTypes) {
    return super.init({
      // attributes
      origin_long: {
        type: DataTypes.STRING,
        allowNull: false
      },
      origin_lat: {
        type: DataTypes.STRING,
        allowNull: false
      },
      destination_long: {
        type: DataTypes.STRING,
        allowNull: false
      },
      destination_lat: {
        type: DataTypes.STRING,
        allowNull: false
      },
      distance: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM,
        values: ['UNASSIGNED', 'TAKEN']
      }
    }, { sequelize })
  }
}

module.exports = Order