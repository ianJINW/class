const express = require("express");

const router = express.Router();
const unitController = require("../controllers/unitController");
const db = require("../models");

router.route("/").get(unitController.getUnits).post(unitController.createUnit);

router
	.route("/:id")
	.get(unitController.getUnitById)
	.post(unitController.updateUnit)
	.delete(unitController.deleteUnit);

router.route("/new").get((req, res) => {
	res.render("form-unit", { action: "/units" });
});

router.route("/:id/edit").get(async (req, res) => {
	const { id } = req.params;
	try {
		const unit = await db.Unit.findOne({
			where: { id },
			include: [
				{
					model: db.Course,
					as: "courses",
					required: false
				}
			]
		});

		const course = await db.Course.findAll();
		if (!unit) {
			return res.status(404).send("Unit not found");
		}

		res.render("form-unit", { unit, courses });
	} catch (error) {
		console.error("Error fetching unit:", error.message);
		res.status(500).send("An error occurred while fetching the unit.");
	}
});

module.exports = router;
