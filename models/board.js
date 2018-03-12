
// The Thread model

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var BoardSchema = new Schema({
	name: {
		type: String,
		default: null
	}
});

module.exports = mongoose.model('Board', BoardSchema);
