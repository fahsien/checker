var User = require('../models/user.js'),
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
			    // res.write("<script>alert('您已登入一個小時，系統將重新登入');location.href='/';</script>");
			    res.redirect('/#contact');
            } else {
                // create new user
                callback(null, req.body);
            }
        },
        function () {
            new User({
	    		name: req.body.name, 
	    		age: req.body.age, 
	    		job: req.body.job,
	    		email: req.body.email
	    	}).save();
	    	res.redirect('/#contact');
        }

    ])

}

exports.postHR = function(req, res) {
    new Thread({title: req.body.title, author: req.body.author}).save();
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
			    res.redirect('/#contact');
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
	    		eslite: req.body.eslite==='true'?'true':'false'
	    		
	    	}).save();
	    	res.redirect('/#contact');
        }

    ])

}

exports.voteResult = function(req, res) {
	async.waterfall([
			function(callback){
				var data = [];
			    Vote.find({google: 'true'}).count(function(err, count){
			    		data[0] = { "company": "GOOGLE/谷歌", "vote": count };
			    	}
			    );
			    Vote.find({asus: 'true'}).count(function(err, count){
			    		data[1] = { "company": "Asus/華碩", "vote": count };
			    		
			    	}
			    );
			    Vote.find({acer: 'true'}).count(function(err, count){
			    		data[2] = { "company": "Acer/宏碁", "vote": count };
			    		
			    	}
			    );
			    Vote.find({line: 'true'}).count(function(err, count){
			    		data[3] = { "company": "Line", "vote": count };
			    		
			    	}
			    );
			    Vote.find({htc: 'true'}).count(function(err, count){
			    		data[4] = { "company": "HTC/宏達電", "vote": count };
			    		
			    	}
			    );
			    Vote.find({bcgtaiwan: 'true'}).count(function(err, count){
			    		data[5] = { "company": "BCG Taiwan", "vote": count };
			    		
			    	}
			    );
			    Vote.find({gucci: 'true'}).count(function(err, count){
			    		data[6] = { "company": "Gucci/古馳", "vote": count };
			    		
			    	}
			    );
			    Vote.find({citibank: 'true'}).count(function(err, count){
			    		data[7] = { "company": "Citibank/花旗銀行", "vote": count };
			    		
			    	}
			    );
			    Vote.find({hsbc: 'true'}).count(function(err, count){
			    		data[8] = { "company": "HSBC/匯豐銀行", "vote": count };
			    		
			    	}
			    );
			    Vote.find({chanel: 'true'}).count(function(err, count){
			    		data[9] = { "company": "Chanel/香奈兒", "vote": count };
			    		
			    	}
			    );
			    Vote.find({mckinseycompany: 'true'}).count(function(err, count){
			    		data[10] = { "company": "McKinsey&Company/麥肯錫", "vote": count };
			    		
			    	}
			    );
			    Vote.find({muji: 'true'}).count(function(err, count){
			    		data[11] = { "company": "MUJI/無印良品", "vote": count };
			    		
			    	}
			    )
			    Vote.find({unilever: 'true'}).count(function(err, count){
			    		data[12] = { "company": "Unilever/聯合利華", "vote": count };
			    		
			    	}
			    )
			    Vote.find({ogilvymather: 'true'}).count(function(err, count){
			    		data[13] = { "company": "Ogilvy&Mather/奧美", "vote": count };
			    		
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
			    		data[16] = { "company": "eslite/誠品", "vote": count };
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



