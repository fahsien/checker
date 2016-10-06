var http = require('http');
var express = require('express');
var app = express();
var server = app;

//set port
var port = process.env.PORT || 8080; 

//static files' location
app.use(express.static(__dirname + '/public'));

app.get('/',function(req, res){ 
	res.sendfile('./public/views/index.html');
});


server.listen(port,'localhost',function(){
    console.log('port on ' + port);
});