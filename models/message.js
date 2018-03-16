
// The Thread model

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MessageSchema = new Schema({
	name: {
		type: String,
		default: ''
	},
	task: {
		type: Schema.Types.ObjectId,
		ref: 'Task'
	}

});

module.exports = mongoose.model('Message', MessageSchema);
