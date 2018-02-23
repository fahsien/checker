
// The Thread model

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: {
		type: String,
		default: ''
	},
	email: {
		type: String,
		default: ''
	},
	password: {
		type: String,
		default: ''
	},
	profile_photo: {
		type: String,
		default: "../img/core/user-black.png"
	}
});

UserSchema.methods.authenticate = function (password) {
	return this.password === password;
};

module.exports = mongoose.model('User', UserSchema);
