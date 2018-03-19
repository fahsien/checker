var Board = require('../../models/board.js'),
    Checker = require('../../models/checker.js'),
    Message = require('../../models/message.js'),
    Checklist = require('../../models/checklist.js'),
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

exports.getAccountUser = function(req, res) {
    res.send({user: req.user});
}
exports.getUsers = function(req, res) {
    User.find({})
    .exec(function(err, users) {
        if (err) return res.status(400).send(err);
        res.send({users: users});
    });
}
exports.getBoards = function(req, res) {
    Board.find({})
    .exec(function(err, boards) {
        if (err) return res.status(400).send(err);
        res.send({boards: boards});
    });
}
exports.postBoard = function(req, res) {
    new Board({
                name: req.body.name
            }).save(function (err, board) {
                if (err) return res.status(400).send(err);
                res.send({board: board});
            });
}
exports.getCheckers = function(req, res) {
    var boardId = req.query.board;
    async.parallel([
        function(callback){
            Checker.find({board : boardId}).populate('owner')
            .exec(function(err, checkers) {
                callback(err, checkers)
            });
        },function(callback){
            Task.find({}).populate('owner')
            .exec(function(err, tasks) {
                callback(err, tasks)
            });
        },
        function(callback){
            Message.find({}).sort('-create_time')
            .exec(function(err, messages) {
                callback(err, messages)
            });
        },
        function(callback){
            Checklist.find({})
            .exec(function(err, checklists) {
                callback(err, checklists)
            });
        }
    ],function(err, results){
        if (err) return res.status(400).send(err);
        var findChecker,findTask;

        for(var i = 0 ; i < results[3].length ; i++){
            findTask = _.find(results[1],{_id : results[3][i].task});
            if(findTask) findTask.checklists.push(results[3][i]);
        }

        for(var i = 0 ; i < results[2].length ; i++){
            findTask = _.find(results[1],{_id : results[2][i].task});
            if(findTask) findTask.messages.push(results[2][i]);
        }

        for(var i = 0 ; i < results[1].length ; i++){
            findChecker = _.find(results[0],{_id : results[1][i].checker});
            if(findChecker) findChecker.tasks.push(results[1][i]);
        }
        res.send({checkers: results[0]});
    })
}
exports.postChecker = function(req, res) {
    new Checker({
                name: req.body.name,
                board: req.body.board
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
exports.putCheckerColor = function(req, res) {
    Checker.update({_id:req.body._id}, {$set: {color: req.body.color}},
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

exports.deleteBoard = function(req, res) {
    var funs = [];
    async.waterfall([
        function(callback){
            //-find checkers
            Checker.find({board:req.body._id}).exec(function(err, checkers) {
                callback(err, checkers)
            });
        },function(checkers, callback){
            //-delete all tasks
            for(var i=0 ; i<checkers.length ; i++){
                var checker = checkers[i];
                
                funs.push(function(callback){
                    Task.remove({checker:checker._id}, function (err) {
                        callback(err);
                    });
                });
            }
            funs.push(function(callback){
                //-delete all checkers
                Checker.remove({board:req.body._id}, function (err) {
                    callback(err);
                });
            });
            funs.push(function(callback){
                //-delete board
                Board.remove({_id:req.body._id}, function (err) {
                    callback(err);
                });
            });
            async.parallel(funs,function(err){
                callback(err);
            })
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
        res.send({message: {success:'成功！'}});
    });
}
exports.postChecklist = function(req, res) {
    var checklist = req.body.checklist;

    new Checklist({
                name: req.body.checklist,
                task: req.body.task,
            }).save(function(err, checklist){
                if(err) return res.status(400).send(err);
                res.send({checklist: checklist});
            });
}
exports.putChecklist = function(req, res) {
    var checklist = req.body.checklist;

    Checklist.update({_id:req.body.checklist._id}, {$set: {name: req.body.checklist.name, finished: req.body.checklist.finished}},
    function (err, checklist) {
        if (err) return res.status(400).send(err);
        res.send({message: {success:'成功！'}});
    });
}
exports.deleteChecklist= function(req, res) {
    Checklist.remove({_id:req.body._id}, function (err) {
        if (err) return res.status(400).send(err);
        res.send({message: {success:'成功！'}});
    });
}

exports.postMessage = function(req, res) {
    var message = req.body.message;

    new Message({
                name: req.body.message,
                task: req.body.task
            }).save(function(err, message){
                if(err) return res.status(400).send(err);
                res.send({message: message});
            });
}
exports.putMessage = function(req, res) {
    var message = req.body.message;

    Message.update({_id:req.body.message._id}, {$set: {name: req.body.message.name}},
    function (err, message) {
        if (err) return res.status(400).send(err);
        res.send({message: {success:'成功！'}});
    });
}
exports.deleteMessage = function(req, res) {
    Message.remove({_id:req.body._id}, function (err) {
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
    (function runAtDate(date) {
        var now = (new Date()).getTime();
        var then = new Date(date).getTime();
        var diff = Math.max((then - now), 1000);  //set one second to buffer

        if(req.body.remind === 'one_week'){
            diff = Math.max((diff - 7*86400000), 1000);
        }

        if (diff > 0x7FFFFFFF){//setTimeout limit is MAX_INT32=(2^31-1)
            setTimeout(function() {runAtDate(date);}, 0x7FFFFFFF);
        }else{
            setTimeout(function(){
                Task.find({_id:req.body._id})
                .exec(function(err, task) {
                    //Make sure this is the newest data, and task is not finished.
                    var dateCorrect = new Date(task[0].due_date).valueOf() === new Date(req.body.due_date).valueOf(),
                        remindCorrect = task[0].remind === req.body.remind,
                        notFinished = !req.body.finished;

                    if(dateCorrect && remindCorrect && notFinished){
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
                          console.log('Sent mail success.')
                        });
                    }
                });
            }, diff);
        }
    })(req.body.due_date);

    Task.update({_id:req.body._id}, {$set: {due_date: req.body.due_date, remind: req.body.remind}},
    function (err, task) {
        if (err) return res.status(400).send(err);
        res.send({success: true});
    });
}

exports.setTaskOwner = function(req, res) {
    Task.update({_id:req.body.task._id}, {$set: {owner: req.body.user}},
    function (err, task) {
        if (err) return res.status(400).send(err);
        res.send({success: true});
    });
}

exports.setCheckerOwner = function(req, res) {
    Checker.update({_id:req.body.checker._id}, {$set: {owner: req.body.user}},
    function (err, checker) {
        if (err) return res.status(400).send(err);
        res.send({success: true});
    });
}
