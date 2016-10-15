var User = require('../models/user.js'),
	HR = require('../models/hr.js'),
	Vote = require('../models/vote.js'),
	async = require('async');

exports.postUser = function(req, res) {

	async.waterfall([
		function (callback) {
			User.findOne({email: req.body.email}, callback);
        },
        function (email, callback) {

            if (email) {
            	
                // error: user already exists  
			    res.redirect('/#book');
			    
            } else {
                // create new user
                callback(null, req.body);
            }
        },
        function () {
            new User({
	    		age: req.body.age, 
	    		advice: req.body.advice, 
	    		email: req.body.email,
	    		it: req.body.it==='true'?'true':'false', 
	    		tradition: req.body.tradition==='true'?'true':'false', 
	    		business: req.body.business==='true'?'true':'false', 
	    		services: req.body.services==='true'?'true':'false', 
	    		culture: req.body.culture==='true'?'true':'false', 
	    		startup: req.body.startup==='true'?'true':'false'
	    	}).save();
	    	res.redirect('/#book');
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
			    res.redirect('/#book');
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
	    	res.redirect('/#book');
        }

    ])
}

exports.vote = function(req, res) {

	async.waterfall([
		function (callback) {
			Vote.findOne({email: req.body.email}, callback);
        },
        function (email, callback) {
            if (email) {
                // error: user already exists  
			    // res.write("<script>alert('您已登入一個小時，系統將重新登入');location.href='/';</script>");
			    res.redirect('/#vote');
            } else {
                // create new user
                callback(null, req.body);
            }
        },
        function () {
            new Vote({
            	email: req.body.email, 
	    		google: req.body.google==='true'?'true':'false', 
	    		asus: req.body.asus==='true'?'true':'false', 
	    		acer: req.body.acer==='true'?'true':'false',
	    		line: req.body.line==='true'?'true':'false',
	    		htc: req.body.htc==='true'?'true':'false',
	    		bcgtaiwan: req.body.bcgtaiwan==='true'?'true':'false',
	    		gucci: req.body.gucci==='true'?'true':'false',
	    		citibank: req.body.citibank==='true'?'true':'false',
	    		hsbc: req.body.hsbc==='true'?'true':'false',
	    		chanel: req.body.chanel==='true'?'true':'false',
	    		mckinseycompany: req.body.mckinseycompany==='true'?'true':'false',
	    		muji: req.body.muji==='true'?'true':'false',
	    		unilever: req.body.unilever==='true'?'true':'false',
	    		ogilvymather: req.body.ogilvymather==='true'?'true':'false',
	    		gogoro: req.body.gogoro==='true'?'true':'false',
	    		kkbox: req.body.kkbox==='true'?'true':'false',
	    		eslite: req.body.eslite==='true'?'true':'false',
	    		other: req.body.other
	    		
	    	}).save();
	    	res.redirect('/#vote');
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



