
// The Thread model

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
    age:  String,
    advice:  String,
    email:  String,
    it: String,
    tradition: String,
    business: String,
    services: String,
    culture: String,
    startup: String
    
});

module.exports = mongoose.model('User', UserSchema);




