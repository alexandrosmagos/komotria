const Messages = require("../models/messageSchema");

module.exports.sendMessage = async (req, res, next) => {
	try {
		const message = await Messages.create(req.body);
		res.status(200).json(message);
	} catch (err) {
		next(err);
	}
};