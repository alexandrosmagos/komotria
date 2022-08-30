const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		min: 4,
		max: 20,
		unique: true,
	},
	email: {
		type: String,
		required: false,
	},
	password: {
		type: String,
		required: true,
		min: 8,
	},
	isAvatarImageSet: {
		type: Boolean,
		default: false,
	},
	avatarImage: {
		type: String,
		default: "",
	},
	authLevel: {
		type: String,
		enum: ["admin", "moderator", "member", "anon"],
		default: "anon",
	},
});

module.exports = mongoose.model("Users", userSchema);