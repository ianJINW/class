const db = require("../models");
const { check, validationResult } = require("express-validator");

module.exports = {
	createUnit: async (req, res) => {
		const { title, lectures, lecturer, semester } = req.body;

		await db.Unit.create({ title, lectures, lecturer, semester });

		req.flash("success", "Unit created successfully");
		res.redirect("/units");
	},

	getUnits: async (req, res) => {
		const units = await db.Unit.findAll();
		console.log("Units fetched:", units);

		res.render("units", { units });
	},

	getUnitById: async (req, res) => {
		const { id } = req.params;

		const units = await db.Unit.findOne({ where: { id } });
		res.render("units", { units });
	},

	updateUnit: async (req, res) => {
		const { id, courseId } = req.params;
		const { title, content } = req.body;
		let updateData = {};

		await check("title", "Title is required.").notEmpty().run(req);
		await check("content", "Content is required.").notEmpty().run(req);

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			req.flash(
				"error",
				errors
					.array()
					.map((err) => err.msg)
					.join(" ")
			);
			return res.redirect(`/units/${id}/edit`);
		}

		if (title) updateData.title = title;
		if (content) updateData.content = content;
		if (req.file) {
			updateData.attachment = `/media/unit-attachments/${req.file.filename}`;
		}

		try {
			await db.Unit.update(updateData, { where: { id, courseId } });

			req.flash("success", "Unit updated successfully.");
			res.redirect(`/courses/${courseId}/units/${id}`);
		} catch (error) {
			console.error(error);

			req.flash("error", "Failed to update unit.");
			res.redirect(`/courses/${courseId}/units/${id}/edit`);
		}
	},

	deleteUnit: async (req, res) => {
		const { id } = req.params;

		await db.Unit.destroy({ where: { id } });

		req.flash("success", "Unit deleted.");
		res.redirect("/units");
	}
};
