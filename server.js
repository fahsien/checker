var http = require('http'),
	express = require('express'),
	app = express(),
	path = require('path'),
	bodyParser = require('body-parser'),
	multer = require('multer'),
	server = app,
	mongoose = require('mongoose'),
	passport = require('passport'),
	session = require('express-session');
	favicon = require('serve-favicon');

//set port
var port = process.env.PORT || 8080;

//connect database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/checker', { useMongoClient: true }, function (err) {
	if (err) {
		console.error('\x1b[31m', 'Could not connect to MongoDB!');
		console.log(err);
	} else {
        console.log('connect to db');
    }
});
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
app.use(favicon(__dirname + '/public/img/core/favicon.ico'));

//== Passport ==//
app.use(session({
  secret: 'checkersessionsecret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', './public/modules/views');

// set up the RESTful API, handler methods are defined in api.js
var api = require('./app/controllers/api.js'),
	login = require('./app/controllers/login.js');
/** Login API **/
app.route('/api/login')
	.post(login.loginValidator);
app.route('/api/logout')
	.post(login.logout);

/** Checkers API **/
app.route('/api/board')
	.post(api.postBoard);
app.route('/api/boards')
	.get(api.getBoards);

app.route('/api/deleteBoard')
	.post(api.deleteBoard);

app.route('/api/checkers')
	.get(api.getCheckers);

app.route('/api/checkerColor')
	.put(api.putCheckerColor);

app.route('/api/checker')
	.post(api.postChecker)
	.put(api.putChecker);

app.route('/api/deleteChecker')
	.post(api.deleteChecker);

/** Tasks API **/
app.route('/api/task')
	.post(api.postTask)
	.put(api.putTask);
app.route('/api/message')
	.post(api.postMessage)
	.put(api.putMessage);
app.route('/api/deleteMessage')
	.post(api.deleteMessage);
app.route('/api/deleteTask')
	.post(api.deleteTask);
app.route('/api/setDueDate')
	.post(api.setDueDate);
app.route('/api/setTaskOwner')
	.post(api.setTaskOwner);

app.route('/api/users')
	.get(api.getUsers);
app.route('/api/me')
	.get(api.getAccountUser);


// Routes
app.get('/*',function(req, res){
	if (req.user) {
		res.render('layout', {});
	}else{
		res.render('loginpage', {});
	}
});

server.listen(port,'localhost',function(){
    console.log('port on ' + port);
});
