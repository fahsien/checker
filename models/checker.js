
// The Thread model

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var CheckerSchema = new Schema({
	name: {
		type: String,
		default: null
	},
	tasks: {
		type: Schema.Types.Mixed,
		default: []
	}

});

module.exports = mongoose.model('Checker', CheckerSchema);
