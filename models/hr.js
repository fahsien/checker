
// The Thread model

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var HRSchema = new Schema({
    name:  String,
    company:  String,
    jobtitle:  String,
    advice: String,
    email:  String
    
});

module.exports = mongoose.model('HR', HRSchema);


