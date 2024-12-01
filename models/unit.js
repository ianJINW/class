"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Unit extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Unit.belongsToMany(models.Course, {
				through: "CourseUnit",
				as: "courses",
				foreignKey: "unitId",
				otherKey: "courseId"
			});
		}
	}
	Unit.init(
		{
			title: { type: DataTypes.STRING, allowNull: false, unique: true },
			lectures: { type: DataTypes.INTEGER, allowNull: false },
			lecturer: { type: DataTypes.STRING, allowNull: false },
			semester: { type: DataTypes.STRING, allowNull: false }
		},
		{
			sequelize,
			modelName: "Unit"
		}
	);
	return Unit;
};
