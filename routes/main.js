const { sendMessage, getRoomMessages } = require("../controllers/messageController");
const router = require("express").Router();

let titleD = "Demos";
let h1D = "Demos";

//Chat array with one object
let chats = [
	{
		username: "Billy",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio ut sem nulla pharetra diam. Odio aenean sed adipiscing diam donec adipiscing tristique risus. Tristique risus nec feugiat in fermentum posuere. Consequat id porta nibh venenatis cras sed felis. Purus sit amet volutpat consequat mauris nunc congue. At auctor urna nunc id cursus metus aliquam eleifend. Aliquet eget sit amet tellus cras adipiscing enim eu turpis. Et ultrices neque ornare aenean. Lacus sed turpis tincidunt id aliquet risus feugiat in."
	},
	{
		username: "Bob",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio ut sem nulla pharetra diam. Odio aenean sed adipiscing diam donec adipiscing tristique risus. Tristique risus nec feugiat in fermentum posuere. Consequat id porta nibh venenatis cras sed felis. Purus sit amet volutpat consequat mauris nunc congue. At auctor urna nunc id cursus metus aliquam eleifend. Aliquet eget sit amet tellus cras adipiscing enim eu turpis. Et ultrices neque ornare aenean. Lacus sed turpis tincidunt id aliquet risus feugiat in."
	},
	{
		username: "Bob",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio ut sem nulla pharetra diam. Odio aenean sed adipiscing diam donec adipiscing tristique risus. Tristique risus nec feugiat in fermentum posuere. Consequat id porta nibh venenatis cras sed felis. Purus sit amet volutpat consequat mauris nunc congue. At auctor urna nunc id cursus metus aliquam eleifend. Aliquet eget sit amet tellus cras adipiscing enim eu turpis. Et ultrices neque ornare aenean. Lacus sed turpis tincidunt id aliquet risus feugiat in."
	},
	{
		username: "Bob",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio ut sem nulla pharetra diam. Odio aenean sed adipiscing diam donec adipiscing tristique risus. Tristique risus nec feugiat in fermentum posuere. Consequat id porta nibh venenatis cras sed felis. Purus sit amet volutpat consequat mauris nunc congue. At auctor urna nunc id cursus metus aliquam eleifend. Aliquet eget sit amet tellus cras adipiscing enim eu turpis. Et ultrices neque ornare aenean. Lacus sed turpis tincidunt id aliquet risus feugiat in."
	}
];

// index page
router.get("/", function(req, res) {
	if (req.isAuthenticated()) {
		res.render("pages/index", {title: titleD, h1: h1D, user: req.user, chats });
	} else {
		res.render("pages/index", { title: titleD, h1: h1D, chats });
	}
	
});

router.get("/test", function(req, res) {
	res.render("pages/test", {title: titleD, h1: h1D});
});

router.post("/api/sendMsg", function(req, res) {
	sendMessage(req, res);
});

router.post("/api/getRoomMsgs", function(req, res) {
	getRoomMessages(req, res);
});

module.exports = router;