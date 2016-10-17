var User = require('../models/user.js'),
	HR = require('../models/hr.js'),
	Vote = require('../models/vote.js'),
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

exports.postHR = function(req, res) {
    async.waterfall([
		function (callback) {
			HR.findOne({email: req.body.email}, callback);
        },
        function (email, callback) {
            if (email) {
                // error: user already exists  
			    // res.write("<script>alert('您已登入一個小時，系統將重新登入');location.href='/';</script>");
			    res.send({message: {fail:'這個Email使用過了唷！'}});
            } else {
                // create new user
                callback(null, req.body);
            }
        },
        function () {
            new HR({
	    		name: req.body.name, 
	    		company: req.body.company,
	    		jobtitle: req.body.jobtitle,
	    		advice: req.body.advice,
	    		email: req.body.email
	    	}).save();
	    	res.send({message: {success:'成功，將會儘快聯絡您！'}});
        }

    ])
}

exports.vote = function(req, res) {

	async.waterfall([
		function (callback) {
			Vote.findOne({email: req.body[18].email}, callback);
        },
        function (email, callback) {
            if (email) {
                // error: user already exists  
			    // res.write("<script>alert('您已登入一個小時，系統將重新登入');location.href='/';</script>");
			    res.send({message: {fail:'這個Email已經投票過了唷！',show : true }});
            } else {
                // create new user
                callback(null, req.body);
            }
        },
        function () {
            new Vote({
            	email: req.body[18].email, 
	    		google: req.body[0].winner, 
	    		asus: req.body[1].winner, 
	    		acer: req.body[2].winner,
	    		line: req.body[3].winner,
	    		htc: req.body[4].winner,
	    		bcgtaiwan: req.body[5].winner,
	    		gucci: req.body[6].winner,
	    		citibank: req.body[7].winner,
	    		hsbc: req.body[8].winner,
	    		chanel: req.body[9].winner,
	    		mckinseycompany: req.body[10].winner,
	    		muji: req.body[11].winner,
	    		unilever: req.body[12].winner,
	    		ogilvymather: req.body[13].winner,
	    		gogoro: req.body[14].winner,
	    		kkbox: req.body[15].winner,
	    		eslite: req.body[16].winner,
	    		other: req.body[17].other
	    		
	    	}).save();
	    	res.send({message: {success:'投票成功！' , show : false}});
	    	
        }

    ])

}

exports.voteResult = function(req, res) {
	async.waterfall([
			function(callback){
				var data = [];
			    Vote.find({google: 'true'}).count(function(err, count){
			    		data[0] = { "company": "GOOGLE", "vote": count };
			    	}
			    );
			    Vote.find({asus: 'true'}).count(function(err, count){
			    		data[1] = { "company": "Asus", "vote": count };
			    		
			    	}
			    );
			    Vote.find({acer: 'true'}).count(function(err, count){
			    		data[2] = { "company": "Acer", "vote": count };
			    		
			    	}
			    );
			    Vote.find({line: 'true'}).count(function(err, count){
			    		data[3] = { "company": "Line", "vote": count };
			    		
			    	}
			    );
			    Vote.find({htc: 'true'}).count(function(err, count){
			    		data[4] = { "company": "HTC", "vote": count };
			    		
			    	}
			    );
			    Vote.find({bcgtaiwan: 'true'}).count(function(err, count){
			    		data[5] = { "company": "BCG Taiwan", "vote": count };
			    		
			    	}
			    );
			    Vote.find({gucci: 'true'}).count(function(err, count){
			    		data[6] = { "company": "Gucci", "vote": count };
			    		
			    	}
			    );
			    Vote.find({citibank: 'true'}).count(function(err, count){
			    		data[7] = { "company": "花旗銀行", "vote": count };
			    		
			    	}
			    );
			    Vote.find({hsbc: 'true'}).count(function(err, count){
			    		data[8] = { "company": "匯豐銀行", "vote": count };
			    		
			    	}
			    );
			    Vote.find({chanel: 'true'}).count(function(err, count){
			    		data[9] = { "company": "Chanel", "vote": count };
			    		
			    	}
			    );
			    Vote.find({mckinseycompany: 'true'}).count(function(err, count){
			    		data[10] = { "company": "麥肯錫", "vote": count };
			    		
			    	}
			    );
			    Vote.find({muji: 'true'}).count(function(err, count){
			    		data[11] = { "company": "無印良品", "vote": count };
			    		
			    	}
			    )
			    Vote.find({unilever: 'true'}).count(function(err, count){
			    		data[12] = { "company": "聯合利華", "vote": count };
			    		
			    	}
			    )
			    Vote.find({ogilvymather: 'true'}).count(function(err, count){
			    		data[13] = { "company": "奧美", "vote": count };
			    		
			    	}
			    )
			    Vote.find({gogoro: 'true'}).count(function(err, count){
			    		data[14] = { "company": "Gogoro", "vote": count };
			    		
			    	}
			    )
			    Vote.find({kkbox: 'true'}).count(function(err, count){
			    		data[15] = { "company": "KKBOX", "vote": count };
			    		
			    	}
			    )
			    Vote.find({eslite: 'true'}).count(function(err, count){
			    		data[16] = { "company": "誠品", "vote": count };
			    		setTimeout(function(){ callback(null,data); }, 100);
			    		
			    	}
			    )


			},
			function(data){
				res.writeHead(200, {"Content-Type": "application/json"});
				
			  	var votes = data;
			  	var json = JSON.stringify({ 
			    	votes: votes, 
			  	});
				res.end(json);
			}
		
	])

}



