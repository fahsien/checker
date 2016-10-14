
// The Thread model

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
    name:  String,
    age:  String,
    job:  String,
    email:  String,
    
});

module.exports = mongoose.model('User', UserSchema);


