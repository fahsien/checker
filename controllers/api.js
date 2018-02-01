var User = require('../models/user.js'),
	async = require('async');

exports.postUser = function(req, res) {

	async.waterfall([
		function (callback) {
			User.findOne({email: req.body[8].email}, callback);
        },
        function (email, callback) {

            if (email) {

                // error: user already exists
				res.send({message: {fail:'這個Email已經訂閱過了唷！'}});

            } else {
                // create new user
                callback(null, req.body);
            }
        },
        function () {
            new User({
	    		age: req.body[6].age,
	    		advice: req.body[7].advice,
	    		email: req.body[8].email,
	    		it: req.body[0].value,
	    		tradition: req.body[1].value,
	    		business: req.body[2].value,
	    		services: req.body[3].value,
	    		culture: req.body[4].value,
	    		startup: req.body[5].value,
	    	}).save();
	    	res.send({message: {success:'訂閱成功！'}});
        }

    ])

}
