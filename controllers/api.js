var User = require('../models/user.js');

exports.postUser = function(req, res) {
    new User({
    		name: req.body.name, 
    		age: req.body.age, 
    		job: req.body.job,
    		email: req.body.email
    	}).save();
    res.redirect('/#contact');
}

exports.postHR = function(req, res) {
    new Thread({title: req.body.title, author: req.body.author}).save();
}


