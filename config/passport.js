var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
	User = require('../models/user.js');

module.exports = function() {
    // Serialize sessions
    passport.serializeUser(function (user, done) {
    	done(null, user.id);
    });
    // Deserialize sessions
    passport.deserializeUser(function (id, done) {
    	User.findOne({
    		_id: id
    	}, '-password', function (err, user) {
    		done(err, user);
    	});
    });

    passport.use(new LocalStrategy({
    			usernameField: 'email',
    			passwordField: 'password'
    		},
    		function (email, password, done) {
    			User.findOne({
    				email: email,
    			}, function(err, user) {
    				if (err) {
    					done(err);
    				} else if (!user) {
    					done(null, false, {
    						message: 'Unknown user'
    					});
    				} else if (!user.authenticate(password)) {
    					done(null, false, {
    						message: 'Invalid password'
    					});
    				} else {
    					done(null, user);
    				}
    			});
    		}
    	));
};
