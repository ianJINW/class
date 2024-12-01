'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Enrollment.belongsTo(models.User, {
        foreignKey: 'userId', as: 'user'
      })
      Enrollment.belongsTo(models.Course, {
        foreignKey: 'courseId',
        as: 'course'
      })
    }
  }
  Enrollment.init(
    {
      role: {
        type: DataTypes.ENUM('student', 'teacher', 'admin'),
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Enrollment'
    }
  )
  return Enrollment
}
