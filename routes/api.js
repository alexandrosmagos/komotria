const express =  require("express");
const router = express.Router();

const roomController = require("../controllers/roomController");
// const userController = require("../controllers/userController");
// const messageController = require("../controllers/messageController");

router.get("/room", roomController.getRooms);
router.post("/room", roomController.createRoom);
router.delete("/room/:id", roomController.deleteRoom);

//on router get /, res send test
router.get("/", function(req, res) {
	res.redirect("/");
});


module.exports = router;