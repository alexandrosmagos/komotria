const mongoose = require("mongoose");
const {usernameGen} = require("../utils/functions");

const userSchema = new mongoose.Schema({
	platform: {
		provider: String,
		id: String,
		Required: true
	},
	email: {
		type: String
	},
	username: {
		type: String,
		min: 4,
		max: 20,
		default: usernameGen
	},
	password: {
		type: String,
		min: 6
	},
	isAvatarImageSet: {
		type: Boolean,
		default: false
	},
	avatarImage: {
		type: String,
		default: ""
	},
	authLevel: {
		type: String,
		enum: ["admin", "moderator", "member", "anon"],
		default: "anon"
	},
});

module.exports = mongoose.model("Users", userSchema);