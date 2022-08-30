const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		if (!user) {
			return res.status(400).json({ message: "Incorrect Username or Password", status: false });
		}
		const match = await bcrypt.compare(req.body.password, user.password);
		if (!match) {
			return res.status(400).json({ message: "Incorrect Username or Password", status: false });
		}
		res.status(200).json(user);
	} catch (err) {
		next(err);
	}
};

module.exports.signup = async (req, res, next) => {
	try {
		const usernameCheck = await User.findOne({ username: req.body.username });
		if (usernameCheck) 
			return res.json({ msg: "Username already exists", status: false });
		
		// const emailCheck = await User.findOne({ email: req.body.email });
		// if (emailCheck) {
		// 	return res.json({ msg: "An account with that email already exists", status: false });
		// }
		const hashedPassword = await bcrypt.hash(req.body.password, 11);
		const user = await User.create({
			// email: req.body.email,
			username: req.body.username,
			password: hashedPassword,
		});
		return res.json({ status: true, user });
	} catch (ex) {
		next(ex);
	}
};