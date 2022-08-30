require("dotenv").config();
const mongoose = require("mongoose");
var express = require("express");
const bodyParser = require('body-parser');
const morgan = require("morgan");
const mainRoutes = require("./routes/main");
const authRoutes = require("./routes/auth");
var app = express();

// set the view engine to ejs
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


// Connecting to the database
const port = process.env.API_PORT || 3000;
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Successfully connected to database");
		app.listen(port, () => {
			console.log(`Server running on port ${port}`);
		});
	})
	.catch((error) => {
		console.log("Database connection failed. Exiting...");
		console.error(error);
		process.exit(1);
	});

app.use(morgan("dev"));

//Routes
app.use(mainRoutes);
app.use(authRoutes);


