require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const app = express();

// load passpord
require('./passport');



app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//mongoDB connection
const port = process.env.API_PORT || 3000;
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Successfully connected to database");
		app.listen(port, () => {
			console.log(`on port: http://localhost:${port}`);
		});
	})
	.catch((error) => {
		console.log("Database connection failed. Exiting...");
		console.error(error);
		process.exit(1);
	});


// Sessions
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false,
	store: MongoStore.create({mongoUrl: process.env.MONGO_URI, ttl: 60 * 60 * 24})
}));

app.use(passport.initialize());
app.use(passport.session());


const mainRoutes = require("./routes/main");
const authRoutes = require("./routes/auth");
app.use(mainRoutes);
app.use(authRoutes);

