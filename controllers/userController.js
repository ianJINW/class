const db = require("../models");
const passport = require("passport");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

module.exports = {
	registerUser: async (req, res) => {
		const { username, email, password, role } = req.body;

		if (!username || !email || !password || !role) {
			req.flash("error", "All fields are required.");
			return res.redirect("/register");
		}

		await check("email", "Please enter a valid email address.")
			.isEmail()
			.run(req);
		await check("password", "Password must be at least 8 characters long.")
			.isLength({ min: 8 })
			.run(req);
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			req.flash(
				"error",
				errors
					.array()
					.map((err) => err.msg)
					.join(" ")
			);
			return res.redirect("/register");
		}

		try {
			const profileImage = req.file
				? `profileImages/${req.file.filename}`
				: "profileImages/default.jpeg";
			await db.User.create({
				username,
				email,
				password,
				profileImage,
				role
			});
			req.flash("success", "Registration successful.");
			res.redirect("/login");
		} catch (err) {
			console.error(err);

			req.flash("error", "Registration failed. Please try again.");
			res.redirect("/register");
		}
	},

	updateUser: async (req, res) => {
		const { id } = req.params;
		const { email, username, password } = req.body;
		let updateData = {};

		const emailExists = await db.User.findOne({ where: { email } });
		const usernameExists = await db.User.findOne({ where: { username } });

		if (email) {
			emailExists
				? (updateData.email = email)
				: req.flash("error", "Email already exists.");
		}

		if (username) {
			usernameExists
				? (updateData.username = username)
				: req.flash("error", "Username already exists.");
		}

		if (password) {
			const hash = await bcrypt.hash(password, 10);
			updateData.password = hash;
		}
		if (req.file) {
			updateData.profileImage = `/media/profile-photos/${req.file.filename}`;
		}

		try {
			await db.User.update(updateData, { where: { id } });
			req.flash("success", "User updated successfully.");
			res.redirect(`/users/`);
		} catch (error) {
			console.error(error);

			req.flash("error", "Failed to update user.");
			res.redirect(`/users/${id}`);
		}
	},

	deleteUsers: async (req, res) => {
		if (!req.user || !req.user.isAdmin) {
			req.flash("error", "Unauthorized action.");
			return res.redirect("/dashboard");
		}

		if (req.body.confirmation !== "CONFIRM_DELETE") {
			req.flash("error", "Please type 'CONFIRM_DELETE' to confirm deletion.");
			return res.redirect("/dashboard");
		}

		try {
			await db.User.destroy({ where: {}, truncate: true });
			req.flash("success", "All users deleted.");
			res.redirect("/dashboard");
		} catch (err) {
			console.error(err);

			req.flash("error", "Failed to delete users.");
			res.redirect("/dashboard");
		}
	},
	login: (req, res, next) => {
		passport.authenticate("local", {
			successRedirect: "/dashboard",
			failureRedirect: "/login",
			failureFlash: true,
			successFlash: `Welcome back`
		})(req, res, next);
	},

	getUsers: async (req, res) => {
		const users = await db.User.findAll();
		if (!users) {
			req.flash("error", "No users found");
			return res.redirect("/dashboard");
		}

		res.render("users", { users });
	},

	getUserById: async (req, res) => {
		const { id } = req.params;
		const user = await db.User.findOne({ where: { id } });
		if (!user) {
			req.flash("error", "No users found");
			return res.redirect("/dashboard");
		}

		res.render("account", { user });
	},

	updateUser: async (req, res) => {
		const { id } = req.params;
		const { email, username, password } = req.body;
		let profileImage;

		if (req.file) {
			profileImage = `/media/profile-photos/${req.file.filename}`;
		}

		try {
			await db.User.update(
				{ email, username, password, profileImage },
				{ where: { id } }
			);
			req.flash("success", "User updated successfully.");

			res.redirect(`/`);
		} catch (error) {
			req.flash("error", "Failed to update user.");

			res.redirect(`/users/${id}`);
		}
	},

	logout: (req, res) => {
		req.logout((err) => {
			if (err) return res.send("Log out unsuccessful.");
			req.flash("success", "Logout successful");
			res.redirect("/");
		});
	},

	deleteUser: async (req, res) => {
		const { id } = req.params;

		await db.User.destroy({ where: { id } });

		req.flash("success", "User deleted.");
		res.redirect("/dashboard");
	},
	deleteUsers: async (req, res) => {
		await db.User.destroy();

		req.flash("success", "All users deleted.");
		res.redirect("/dashboard");
	}
};
