"use strict";
const { Model } = require("sequelize");
const course = require("./course");
const unit = require("./unit");

module.exports = (sequelize, DataTypes) => {
	class CourseUnit extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			CourseUnit.belongsTo(models.Course, {
				foreignKey: "courseId",
				as: "course"
			});
			CourseUnit.belongsTo(models.Unit, {
				foreignKey: "unitId",
				as: "unit"
			});
		}
	}
	CourseUnit.init(
		{
			courseId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isInt: true,
					min: 1
				},
				references: {
					model: course,
					key: "id"
				}
			},

			unitId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isInt: true,
					min: 1
				},
				references: {
					model: unit,
					key: "id"
				}
			},

			credits: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isInt: true,
					min: 1
				}
			}
		},
		{
			sequelize,
			modelName: "CourseUnit"
		}
	);
	return CourseUnit;
};
