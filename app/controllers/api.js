var Checker = require('../../models/checker.js'),
	Task = require('../../models/task.js'),
	User = require('../../models/user.js'),
	_ = require('lodash'),
	async = require('async'),
	moment = require('moment'),
	nodemailer = require('nodemailer'),
    smtpPool = require('nodemailer-smtp-pool'),
	mail_pool_options = {
		service: 'Gmail',
		auth: {
			user: 'no-reply@hgcagroup.com',
			pass: 'hgnoreply'
		}
	},
	transporter = nodemailer.createTransport(smtpPool(mail_pool_options));


exports.getUsers = function(req, res) {
	User.find({})
	.exec(function(err, users) {
		if (err) return res.status(400).send(err);
		res.send({users: users});
	});
}
exports.getCheckers = function(req, res) {
	async.parallel([
		function(callback){
			Checker.find({})
			.exec(function(err, checkers) {
		        callback(err, checkers)
			});
		},function(callback){
			Task.find({}).populate('owner')
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
    function (err, task ,test) {
        if (err) return res.status(400).send(err);
        res.send({message: {success:'成功！'}});
    });
}

exports.deleteTask = function(req, res) {
	Task.remove({_id:req.body._id}, function (err) {
		if (err) return res.status(400).send(err);
		res.send({message: {success:'成功！'}});
	});
}

exports.setDueDate = function(req, res){
	var diff = (new Date(req.body.due_date) - new Date());

	if(diff <= 0){
		res.send({success: false});
	}else{
		setTimeout(function(){
			Task.find({_id:req.body._id})
			.exec(function(err, task) {
				//Make sure this is the newest date.
				var dateCorrect = new Date(task[0].due_date).valueOf() === new Date(req.body.due_date).valueOf(),
					notFinished = !req.body.finished;

		        if(dateCorrect && notFinished){
					transporter.sendMail({
					  from: 'hg-no-reply <no-reply@hgcagroup.com>',
					  to: req.body.owner.email,
					  subject: '[通知]任務已達截止日期',
					  html: '<p>你好，</p><br><p>任務已達截止日期,請儘速完成任務</p>'
					}, function(err){
					  if(err) {
					    console.log('Unable to send email: ' + err);
						return res.status(400).send(err);
					  }
					});
				}
			});
		}, 1000);
		Task.update({_id:req.body._id}, {$set: {due_date: req.body.due_date}},
	    function (err, task) {
	        if (err) return res.status(400).send(err);
	        res.send({success: true});
	    });
	};
}

exports.setTaskOwner = function(req, res) {
	Task.update({_id:req.body.task._id}, {$set: {owner: req.body.user}},
	function (err, task) {
		if (err) return res.status(400).send(err);
		res.send({success: true});
	});
}