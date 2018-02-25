var passport = require('passport');

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
}

exports.logout = function (req, res) {
    req.logout();
    res.send({message: '登出成功！'});
};
