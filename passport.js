const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const DiscordStrategy = require('passport-discord').Strategy;
const User = require('./models/userSchema.js');
const bcrypt = require('bcrypt');
const passport = require('passport');



// passport-local strategy \\
passport.use(new LocalStrategy(
	(username, password, done) => {
		User.findOne({
			username: username
		}, (err, user) => {
			if (err) { // when some error occurs
				return done(err);
			}
			if (!user) { // when username is incorrect
				return done(null, false, {
					message: 'Incorrect Username'
				});
			}
			if (!bcrypt.compare(password, user.password)) { // when password is incorrect
				return done(null, false), {
					message: 'Incorrect Password'
				};
			}
			return done(null, user); // when user is valid
		});
	}
));

// Google Auth //
passport.use(new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: '/auth/google/callback'
},
async(accsessToken, refreshToken, profile, done)=>
{
	console.log(profile);
	await findOrCreate(profile.provider, profile.id, profile.emails[0].value, done);
}));

// passport-facebook strategy \\ 
passport.use(new FacebookStrategy({
	clientID: process.env.FACEBOOK_CLIENT_ID,
	clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
	callbackURL: "/auth/facebook/callback",
	profileFields: ['emails']
},
async(accsessToken, refreshToken, profile, done)=>
{
	await findOrCreate(profile.provider, profile.id, profile.emails[0].value, done);
}
));

passport.use(new DiscordStrategy({
	clientID: process.env.DISCORD_CLIENT_ID,
	clientSecret: process.env.DISCORD_CLIENT_SECRET,
	callbackURL: '/auth/discord/callback',
	scope: ['identify', 'email']
},
async(accessToken, refreshToken, profile, done)=>
{
	await findOrCreate(profile.provider, profile.id, profile.email, done);
	// User.findOrCreate({ "platform.id": profile.id, "platform.provider": profile.provider }, function (err, user) {
	// 	return done(err, user);
	// });

	
}));

async function findOrCreate(provider, id, email, done) {
	User.findOne({ "platform.id": id, "platform.provider": provider}, (err, user) => {
		if (err) { return done(err); }
		if (user) { 
			return done(null, user); 
		} else {
			//if email is undefined
			const newUser = new User({
				"platform.id": id,
				"platform.provider": provider,
				email: email
			});
			newUser.save((err) => {
				if (err) {
					return done(err);
				}
				return done(null, newUser);
			});
		}
	});
}


passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

// // Persists user data inside session
// passport.serializeUser((user, done) => {
//   done(null, user.id)
// })
// // Fetches session details using session id
// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => done(err, user) )
// })