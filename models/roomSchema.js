const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 1,
		max: 50,
		unique: true,
	},
	description: {
		type: String,
		required: true,
		min: 1,
		max: 500,
	},
	createdAt: {
		type: Date,	
		default: Date.now,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Users",
		required: true,
	},
	messages: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Messages",
	}],
});

module.exports = mongoose.model("Rooms", roomSchema);