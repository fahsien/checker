var Checker = require('../models/checker.js'),
	async = require('async');

exports.getCheckers = function(req, res) {
	Checker.find({})
	.exec(function(err, checkers) {
            if (err) return res.status(400).send(err);
            res.send({checkers: checkers});
		});
}
exports.postChecker = function(req, res) {
	new Checker({
				name: req.body.name,
				tasks: req.body.tasks
	    	}).save();

	res.send({message: {success:'成功！'}});
}

exports.putChecker = function(req, res) {
	Checker.update({_id:req.body._id}, {$set: {name: req.body.name}},
    function (err, checker) {
        if (err) return res.status(400).send(err);
        res.send({message: {success:'成功！'}});
    });
}

exports.deleteChecker = function(req, res) {
	Checker.remove({_id:req.body._id}, function (err) {
        if (err) return res.status(400).send(err);
        res.send({message: {success:'成功！'}});
    });
}
