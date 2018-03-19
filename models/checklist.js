
// The Thread model

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ChecklistSchema = new Schema({
	name: {
		type: String,
		default: ''
	},
	finished: {
		type: Boolean,
		default: false
	},
	task: {
		type: Schema.Types.ObjectId,
		ref: 'Task'
	},
	create_time: {
		type: Date,
		default: Date.now
	}

});

module.exports = mongoose.model('Checklist', ChecklistSchema);
