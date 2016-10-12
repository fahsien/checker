var http = require('http'),
	express = require('express'),
	app = express(),
	path = require('path'),
	bodyParser = require('body-parser'),
	multer = require('multer'),
	server = app,
	mongoose = require('mongoose');

//set port
var port = process.env.PORT || 8080; 

//connect database
mongoose.connect('mongodb://localhost/100hr');

//static files' location
// app.use(express.static(__dirname + '/public'));
app.use(express.static(path.resolve('./public')));

// Request body parsing middleware should be above methodOverride
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json());  // for parsing application/json
app.use(function (req, res, next) { // when multpart, json parse nest object
    if (req.files && req.body._body) {
        req.body = JSON.parse(req.body._body);
    }
    next();
});

// Routes
app.get('/',function(req, res){ 
	res.sendfile('./public/views/index.html');
});

// set up the RESTful API, handler methods are defined in api.js
var api = require(path.resolve('./controllers/api.js'));
app.post('/postUser', api.postUser);
app.post('/postHR', api.postHR);

server.listen(port,'localhost',function(){
    console.log('port on ' + port);
});