const Messages = require("../models/messageSchema");

module.exports.getRoomMessages = async (req, res, next) => {
	try {
		const messages = await Messages.find({ roomID: req.params.roomID });
		res.status(200).json(messages);
	} catch (err) {
		next(err);
	}
};

module.exports.sendMessage = async (req, res, next) => {
	try {
		const message = await Messages.create(req.body);
		res.status(200).json(message);
	} catch (err) {
		next(err);
	}
};