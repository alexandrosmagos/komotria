// const {signup, login} = require("../controllers/userController");
const passport = require('passport');
const bcrypt = require('bcrypt');
const router = require("express").Router();
const User = require("../models/userSchema");


router.get('/login' , (req , res)=>{
	res.render('Login');
});

router.get('/register',(req,res)=>{
	res.render('register');
});

router.post('/login', async (req, res, next) => {
	try{
		passport.authenticate('local', (err, user, info) => {
			if(!user) {
				res.json({
					error: true,
					message: "No user found with this e-mail!",
					isAuthenticated: req.isAuthenticated()
				});
			}else {
				req.logIn(user, err => {
					if(err){
						console.log("Error inside req.logIn on user.routes: " + err);
						return next(err);
					}
					res.json({
						error: false,
						message: "User logged-in with success!",
						userID: req.user.id,
						userEmail: req.user.email,
						isAuthenticated: req.isAuthenticated()
					});
					next();
                    
				});
				console.log("### AFTER req.login isAthenticated: " + req.isAuthenticated());
				console.log("____________________________________________________");
			}
		})(req, res, next);
	}catch(err){
		res.json({
			error: true,
			message: err.message
		});
	}
	
});

router.post('/register', async (req, res) => {
	var errors = [];
	try{
		if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
			console.log("Error validating Email input");
			errors.push( "No email found!" );
		}
		if(!req.body.password || typeof req.body.password == undefined || req.body.password == null){
			console.log("Error validating Password input");
			errors.push( "Choose a password!" );
		}
		// if(!req.body.password2 || typeof req.body.password2 == undefined || req.body.password2 == null){
		// 	console.log("Error validating Password 2 input");
		// 	errors.push( "Please, repeat your password!" );
		// }

		const validateEmail = (email) => {
			return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
		};
		if(!validateEmail(req.body.email)){
			console.log("E-mail invalid!");
			errors.push("E-mail invalid!");
		}

		// const validatePassword = (password) => {
		// 	return String(password).match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}$/);
		// };
		// if(!validatePassword(req.body.password)){
		// 	console.log("Password invalid!");
		// 	errors.push(
		// 		"Password invalid! Please review the rules and try again."
		// 	);
		// }
		// if(req.body.password != req.body.password2){
		// 	console.log("Passwords don't match");
		// 	errors.push("Passwords don't match!");
		// }

		// Checking for errors:
		if(errors.length > 0){
			//console.log(errors);
			res.json({ error: true, message: errors });
		} else {
			User.findOne({ email: req.body.email }).then((user) => {
				if(user) {
					errors.push("This e-mail is already in use!");
					res.json({ error: true, message: errors });
				} else {
					const user = req.body;
					const newUser = new User(user);
					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if(err){
								errors.push( err );
								res.json({ error: true, message: errors });
							} else {
								newUser.password = hash;
								newUser.save()
									.then(() => {
										console.log("User registered!");
										res.json({ error: false, message: "You've been registered with success." });
									}).catch((err) => {
										console.log("User Registration Error: " + err);
										errors.push( err.message );
										res.json({ error: true, message: errors });
									});
							}
						});
					});
				}
			});         
		} 
	} catch(err){
		errors.push( err.message );
		res.json({ error: true, message: errors });
	}
});

router.get('/auth/facebook', passport.authorize('facebook', { scope : ['email'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { 
	successRedirect : '/', 	
	failureRedirect: '/' })
);
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
	res.redirect('/secrets');
});

router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { 
	successRedirect : '/', 	
	failureRedirect: '/' })
);

router.get('/auth/discord', passport.authenticate('discord'));
router.get('/auth/discord/callback', passport.authenticate('discord', {
	failureRedirect: '/'
}), function(req, res) {
	res.redirect('/');
});

// router.get('/auth/twitter', passport.authenticate('twitter'));
// router.get('/auth/twitter/callback', 
// 	passport.authenticate('twitter', { failureRedirect: '/' }),
// 	function(req, res) {
// 		res.redirect('/');
// 	});

router.get("/logout", function (req, res, next) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
});


module.exports = router;