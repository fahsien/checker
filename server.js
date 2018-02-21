var http = require('http'),
	express = require('express'),
	app = express(),
	path = require('path'),
	bodyParser = require('body-parser'),
	multer = require('multer'),
	server = app,
	mongoose = require('mongoose');
	favicon = require('serve-favicon');

//set port
var port = process.env.PORT || 8080;

//connect database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/checker');

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

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', './public/views');

// Routes
app.get('/',function(req, res){
	res.render('index', {});
});
app.get('/login',function(req, res){
	res.render('index', {});
});

// set up the RESTful API, handler methods are defined in api.js
var api = require('./controllers/api.js');
/** Checkers API **/
app.route('/api/checkers')
	.get(api.getCheckers);

app.route('/api/checker')
	.post(api.postChecker)
	.put(api.putChecker);

app.route('/api/deleteChecker')
	.post(api.deleteChecker);

/** Tasks API **/
app.route('/api/task')
	.post(api.postTask)
	.put(api.putTask);
app.route('/api/deleteTask')
	.post(api.deleteTask);
app.route('/api/setDueDate')
	.post(api.setDueDate);
app.route('/api/setTaskOwner')
	.post(api.setTaskOwner);

app.route('/api/users')
	.get(api.getUsers);
server.listen(port,'localhost',function(){
    console.log('port on ' + port);
});
