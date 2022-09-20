const { sendMessage, getRoomMessages } = require("../controllers/messageController");
const roomController = require("../controllers/roomController");


const router = require("express").Router();


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
// let rooms = [
// 	{
// 		type: "Country",
// 		country: "Cyprus",
// 		text: "Cyprus related shenanigans"
// 	},
// 	{
// 		type: "custom",
// 		img: "https://qzlyrics.com/wp-content/uploads/2021/10/thank-you-next-lyrics.jpg",
// 		title: "TYN",
// 		text: "Share your pain and your TYN story!"
// 	},
// ];

// index page
router.get("/", async function(req, res, next) {

	const rooms = await roomController.getRooms();
	if (req.isAuthenticated()) {
		res.render("pages/index", { user: req.user, rooms });
	} else {
		res.render("pages/index", { rooms });
	}
	
});

//Create a room with name test, and text "This is a test room"
router.get("/createroom", async function(req, res, next) {
	//get userID and convert it to mongooses ObjectID
	const userID = ObjectId(req.user._id);
	await roomController.createRoom({type: "Custom", title: "TYN", description: "Test", createdBy: userID}).then((room) => {
		console.log(room);
		// res.send(room);
	}).catch((err) => {
		// console.log(err);
		// res.send(err);
	});
	res.send("Room created");
});


router.get("/manage", async function(req, res) {
	if (req.isAuthenticated()) {
		const rooms = await roomController.getRooms();
		res.render("pages/manage", { user: req.user, rooms });
	} else {
		res.send("Authenticate First.");
	}
});

router.get("/room/:id", async function(req, res) {
	// let roomID = req.params.id;
	let room = await roomController.getRoom(req.params.id);
	res.render("pages/room", { room });
});

router.post("/api/sendMsg", function(req, res) {
	sendMessage(req, res);
});

router.post("/api/getRoomMsgs", function(req, res) {
	getRoomMessages(req, res);
});

module.exports = router;