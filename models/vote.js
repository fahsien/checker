
// The Thread model

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var VoteSchema = new Schema({
    email: String,
    google:  String,
    asus:  String,
    acer:  String,
    line:  String,
    htc:  String,
    bcgtaiwan:  String,
    gucci:  String,
    citibank:  String,
    hsbc:  String,
    chanel:  String,
    mckinseycompany:  String,
    muji:  String,
    unilever:  String,
    ogilvymather:  String,
    gogoro:  String,
    kkbox:  String,
    eslite:  String,
    other: String
    
});

module.exports = mongoose.model('Vote', VoteSchema);


