const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
	{
		message: {
			type: String,
			required: true,
			min: 1,
			max: 500,
		},
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Users",
			required: true,
		},
		createdAt: {
			type: Date,	
			default: Date.now,
		},
	}
);

module.exports = mongoose.model("Messages", MessageSchema);