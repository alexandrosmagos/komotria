const { sendMessage, getRoomMessages } = require("../controllers/messageController");
const router = require("express").Router();

let titleD = "Demos";
let h1D = "Demos";
let mdl = "Register"; //TODO it will be login or register but use the same 1 modal

// index page
router.get("/", function(req, res) {
	res.render("pages/index", {title: titleD, h1: h1D, modalTitle:mdl});
});

router.get("/test", function(req, res) {
	res.render("pages/test", {title: titleD, h1: h1D, modalTitle:mdl});
});

router.post("/api/sendMsg", function(req, res) {
	sendMessage(req, res);
});

router.post("/api/getRoomMsgs", function(req, res) {
	getRoomMessages(req, res);
});

module.exports = router;