
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
	checker: {
		type: Schema.Types.ObjectId,
		ref: 'Checker'
	}

});

module.exports = mongoose.model('Task', TaskSchema);
