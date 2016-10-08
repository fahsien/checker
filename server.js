var http = require('http'),
	express = require('express'),
	app = express(),
	path = require('path'),
	server = app;

//set port
var port = process.env.PORT || 8080; 

//static files' location
// app.use(express.static(__dirname + '/public'));
app.use(express.static(path.resolve('./public')));

app.get('/',function(req, res){ 
	res.sendfile('./public/views/index.html');
});


server.listen(port,'localhost',function(){
    console.log('port on ' + port);
});