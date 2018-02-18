var Checker = require('../models/checker.js'),
	Task = require('../models/task.js'),
	_ = require('lodash'),
	async = require('async');

exports.getCheckers = function(req, res) {
	async.parallel([
		function(callback){
			Checker.find({})
			.exec(function(err, checkers) {
		        callback(err, checkers)
			});
		},function(callback){
			Task.find({})
			.exec(function(err, tasks) {
		        callback(err, tasks)
			});
		}
	],function(err, results){
		if (err) return res.status(400).send(err);
		var findChecker;
		for(var i = 0 ; i < results[1].length ; i++){
			findChecker = _.find(results[0],{_id : results[1][i].checker});
			findChecker.tasks.push(results[1][i]);
		}
		res.send({checkers: results[0]});
	})
}
exports.postChecker = function(req, res) {
	new Checker({
				name: req.body.name,
				tasks: req.body.tasks
	    	}).save(function (err, checker) {
                if (err) return res.status(400).send(err);
                res.send({checker: checker});
            });
}

exports.putChecker = function(req, res) {
	Checker.update({_id:req.body._id}, {$set: {name: req.body.name}},
    function (err, checker) {
        if (err) return res.status(400).send(err);
        res.send({message: {success:'成功！'}});
    });
}

exports.deleteChecker = function(req, res) {
	async.parallel([
		function(callback){
			Checker.remove({_id:req.body._id}, function (err) {
		        callback(err)
		    });
		},function(callback){
			Task.remove({checker:req.body._id}, function (err) {
		        callback(err)
		    });
		}
	],function(err){
		if (err) return res.status(400).send(err);
		res.send({message: {success:'成功！'}});
	})
}

exports.postTask = function(req, res) {
	new Task({
				name: req.body.name,
				checker: req.body.checker
	    	}).save(function(err, task){
				if(err) return res.status(400).send(err);
				res.send({task: task});
			});
}

exports.putTask = function(req, res) {
	Task.update({_id:req.body._id}, {$set: {name: req.body.name, finished: req.body.finished}},
    function (err, task) {
        if (err) return res.status(400).send(err);
        res.send({task:task});
    });
}

exports.deleteTask = function(req, res) {
	Task.remove({_id:req.body._id}, function (err) {
		if (err) return res.status(400).send(err);
		res.send({message: {success:'成功！'}});
	});
}
