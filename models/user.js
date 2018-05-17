
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
	},
	report: {
		type: String,
		default: ""
	},
	evaluation: {
		type: String,
		default: ""
	},
	role: {
		type: String,
		default: "user"
	},
	create_time: {
		type: Date,
		default: Date.now
	}
});

UserSchema.methods.authenticate = function (password) {
	return this.password === password;
};

module.exports = mongoose.model('User', UserSchema);
