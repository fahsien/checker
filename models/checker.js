
// The Thread model

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var CheckerSchema = new Schema({
	name: {
		type: String,
		default: null
	},
	color: {
		type: String,
		default: 'blue'
	},
	tasks: {
		type: Schema.Types.Mixed,
		default: []
	},
	board: {
		type: Schema.Types.ObjectId,
		ref: 'Board'
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	create_time: {
		type: Date,
		default: Date.now
	}

});

module.exports = mongoose.model('Checker', CheckerSchema);
