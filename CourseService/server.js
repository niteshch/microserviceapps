//Initial configuration
var express  = require('express');
var app      = express(); 								// create our app w/ express
var port  	 = process.env.OPENSHIFT_INTERNAL_PORT || 9000; 				
var ipaddr 	 =  process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var path = require('path');
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

//Database requirement
var mongoose = require('mongoose'); 					// using mongoose variable for mongodb
var database = require('./app/config/database'); 			// load the database config
var db = mongoose.connect(database.url);	// connect to mongoDB database on modulus.io

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
    req.db = db;
    next();
});
//app.use('/', routes);
//app.use('/users', users);
//app.use('/courses',courses);
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

//Static files for API docs
app.use(express.static('./doc'));


//Middle-tier configuration
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//route file
require('./app/routes/course.js')(app);


//Start the awesomeness
app.listen( port, ipaddr, function() {
	console.log('Check on ', port, ipaddr);
});
