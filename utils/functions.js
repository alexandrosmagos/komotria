//create export functions
var names = require('./names.json');
var adjectives = require('./adjectives.json');

function usernameGen() {
	var username;
	//while username is does not already exist in db
	while (username == null || username.indexOf("-") > -1 || username.length > 16) {
		username = names[Math.floor(Math.random() * names.length)] + adjectives[Math.floor(Math.random() * adjectives.length)];
	}
	
	return username;
}

module.exports = { usernameGen };