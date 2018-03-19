
// The Thread model

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TaskSchema = new Schema({
	name: {
		type: String,
		default: null
	},
	finished: {
		type: Boolean,
		default: false
	},
	due_date: {
		type: Date
	},
	remind: {
		type: String,
		default: 'on_duedate'
	},
	checker: {
		type: Schema.Types.ObjectId,
		ref: 'Checker'
	},
	messages: {
		type: Schema.Types.Mixed,
		default: []
	},
	checklists: {
		type: Schema.Types.Mixed,
		default: []
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

module.exports = mongoose.model('Task', TaskSchema);
