const express = require("express");

const router = express.Router();
const courseController = require("../controllers/courseController");
const db = require("../models");

router
	.route("/")
	.get(courseController.getCourses)
	.post(courseController.createCourse);

router
	.route("/:id")
	.get(courseController.getCourseById)
	.put(courseController.updateCourse)
	.post(courseController.updateCourse);

router.route("/new").get((req, res) => {
	res.render("form-course", { action: "/courses" });
});

router.route("/:id/edit").get(async (req, res) => {
	const { id } = req.params;
	const course = await db.Course.findByPk(id);

	res.render("form-course", {
		course
	});
});

module.exports = router;
