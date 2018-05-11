'use strict';

var passport = require('passport'),
    User = require('../../models/user.js'),
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

exports.loginValidator = function(req, res, next) {
	passport.authenticate('local', function (err, user, info) {
        if (err || !user) {
          	console.log(err);
            // auth failed
            res.status(401).send(info);
        } else{
            req.login(user, function (err) {
                if (err) return res.status(401).send(err);
                // login success: send user data
                setTimeout(function(){ res.jsonp(user); }, 1000);

            });
        }
    })(req, res, next);
};

exports.logout = function (req, res) {
    req.logout();
    res.send({message: '登出成功！'});
};

exports.findPassword = function (req, res) {
    User.find({email: req.body.email})
    .exec(function(err, user){
        if(user.length <= 0){
            res.jsonp({message: 'fail'});
        }else{
            transporter.sendMail({
              from: 'hg-no-reply <no-reply@hgcagroup.com>',
              to: user[0].email,
              subject: '[通知]忘記密碼提示',
              html: '<p>你好，</p><br><p>此為你的密碼：'+user[0].password+'</p>'
            }, function(err){
              if(err) {
                console.log('Unable to send email: ' + err);
                return res.status(400).send(err);
              }
              res.jsonp({message: 'success'});
            });
        };
    })
};
