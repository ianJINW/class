"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Course extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Course.belongsToMany(models.Unit, {
				through: "CourseUnit",
				as: "units",
				foreignKey: "courseId",
				otherKey: "unitId"
			});

			Course.belongsToMany(models.User, {
				through: models.Enrollment,
				foreignKey: "courseId",
				as: "users"
			});
		}
	}
	Course.init(
		{
			title: { type: DataTypes.STRING, allowNull: false, unique: true },
			description: { type: DataTypes.TEXT, allowNull: false }
		},
		{
			sequelize,
			modelName: "Course"
		}
	);
	return Course;
};
