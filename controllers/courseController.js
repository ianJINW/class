const db = require("../models");
const { check, validationResult } = require("express-validator");

module.exports = {
	createCourse: async (req, res) => {
		const { title, description, units } = req.body;

		try {
			await db.Course.create({ title, description, units });
			req.flash("success", "Course created successfully.");
			res.redirect("/courses");
		} catch (error) {
			console.error("Error creating course:", error);
			req.flash("error", "Failed to create course.");
			res.redirect("/courses/new");
		}
	},

	getCourses: async (req, res) => {
		const courses = await db.Course.findAll({});

		res.render("courses", { courses: courses });
	},

	getCourseById: async (req, res) => {
		const { id } = req.params;

		const enrollments = await db.Enrollment.findAll({
			where: { userId: req.user.id },
			include: [{ model: db.Course, as: "course" }]
		});

		const course = await db.Course.findOne({
			where: { id }
			/* 			include: [{ model: db.Unit }]*/
		});

		res.render("course", { course: course, enrollment: enrollments });
	},

	updateCourse: async (req, res) => {
		const { id } = req.params;
		const { title, description } = req.body;
		let updateData = {};

		await check("title", "Title is required.").notEmpty().run(req);
		await check("description", "Description is required.").notEmpty().run(req);

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			req.flash(
				"error",
				errors
					.array()
					.map((err) => err.msg)
					.join(" ")
			);
			return res.redirect(`/courses/${id}/edit`);
		}

		if (title) updateData.title = title;
		if (description) updateData.description = description;
		if (req.file) {
			updateData.coverImage = `/media/course-covers/${req.file.filename}`;
		}

		try {
			await db.Course.update(updateData, { where: { id } });

			req.flash("success", "Course updated successfully.");
			res.redirect(`/courses/${id}`);
		} catch (error) {
			console.error(error);

			req.flash("error", "Failed to update course.");
			res.redirect(`/courses/${id}/edit`);
		}
	},

	deleteCourse: async (req, res) => {
		const { id } = req.params;
		await db.Course.destroy({ where: { id } });

		req.flash("success", "Course deleted.");
		res.redirect("/courses");
	}
};
