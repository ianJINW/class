const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("../config/multer");
const authPrevent = require("../middleware/authPrevent");
const db = require("../models");

router.get("/", (req, res) => res.render("index"));

router.get("/auth", authPrevent, (req, res) => res.render("auth"));

router
	.route("/login", authPrevent)
	.get((req, res) => {
		res.render("auth");
	})
	.post(userController.login);

router
	.route("/register", authPrevent)
	.get((req, res) => {
		res.render("auth");
	})
	.post(multer.single("profile"), userController.registerUser);

router.use(authMiddleware);

router
	.route("/user")
	.get(userController.getUsers)
	.delete(userController.deleteUsers);

router
	.route("/user/:id")
	.get(userController.getUserById)
	.put(userController.updateUser)
	.delete(userController.deleteUser);

router.route("/dashboard").get(async (req, res) => {
	const enrollments = await db.Enrollment.findAll({
		where: { userId: req.user.id },
		include: [{ model: db.Course, as: "course" }]
	});

	res.render("dashboard", { enrollments: enrollments, user: req.user });
});

router.route("/logout").get(userController.logout);

module.exports = router;
