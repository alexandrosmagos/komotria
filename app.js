require('dotenv').config();
const mongoose = require("mongoose");
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));


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



let titleD = "Demos";
let h1D = "Demos";

// index page
app.get('/', function(req, res) {
  res.render('pages/index', {title: titleD, h1: h1D});
});
