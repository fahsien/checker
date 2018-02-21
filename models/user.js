
// The Thread model

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: {
		type: String,
		default: null
	},
	email: {
		type: String,
		default: null
	},
	profile_photo: {
		type: String,
		default: "../img/core/user-black.png"
	}
});

module.exports = mongoose.model('User', UserSchema);
