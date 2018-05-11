
// The Thread model

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var BoardSchema = new Schema({
	name: {
		type: String,
		default: null
	},
	create_time: {
		type: Date,
		default: Date.now
	},
	ban_users: {
		type: Schema.Types.Mixed,
		default: []
	}
});

module.exports = mongoose.model('Board', BoardSchema);
