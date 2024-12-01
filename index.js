require("dotenv").config();
require("express-async-errors");

const path = require("path");
const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const helmet = require("helmet");
const passport = require("passport");
const methodOverride = require("method-override");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");

const { sequelize } = require("./models");
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/course");
const unitRoutes = require("./routes/unit");
const enrollmentRoutes = require("./routes/enroll");

const PORT = process.env.PORT || 3800;
const app = express();

if (!process.env.SESSION_SECRET || !process.env.PORT) {
	console.error("Error: SESSION_SECRET or PORT not defined in .env file");
	process.exit(1);
}

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		store: new SequelizeStore({
			db: sequelize,
			checkExpirationInterval: 15 * 60 * 1000,
			expiration: 24 * 60 * 60 * 1000
		}),
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: process.env.NODE_ENV === "production",
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
			sameSite: "strict"
		}
	})
);

app.use(flash());
app.use(helmet());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

app.use(expressLayouts);
app.set("layout", "layout");
app.set("view engine", "ejs");

app.use(methodOverride("_method"));
app.use(
	express.static(path.join(__dirname, "public"), {
		cacheControl: false
	})
);

app.use((req, res, next) => {
	try {
		res.locals.user = req.user;
		res.locals.isLoggedIn = req.isAuthenticated();
		res.locals.messages = req.flash();
		res.locals.backUrl = req.get("Referer") || "/";
		next();
	} catch (err) {
		next(err);
	}
});

app.use((err, req, res, next) => {
	console.error("Unhandled error:", err.stack);
	req.flash("error", `An unexpected error occurred: ${err.message}`);
	res.status(500).send("An error occurred on the server. Please try again.");
});

app.use("/", authRoutes);
app.use("/courses", courseRoutes);
app.use("/units", unitRoutes);
app.use("/enrollments", enrollmentRoutes);

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
});

process.on("SIGINT", async () => {
	console.log("Server is shutting down...");
	await sequelize.close();
	process.exit();
});

module.exports = app;
