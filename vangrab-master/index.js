var express         = require('express');
var app             = express();
var mongoose        = require('mongoose');
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');
var session         = require ('express-session');
var passport        = require('passport');
var localStrategy   = require('passport-local').Strategy;
var needle          = require('needle');
var rest            = require('restler');
var flash           = require('connect-flash');
var crypto          = require('crypto');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs-extra'); 
var path = require('path');


var Quote       = require(__dirname + '/server/models/quote');
var Token       = require(__dirname + '/server/models/token');
var User        = require(__dirname + '/server/models/user');
var Contact     = require(__dirname + '/server/models/contact');
var Driver     = require(__dirname + '/server/models/driver');
var Staff     = require(__dirname + '/server/models/staff');
var sendgrid = require("sendgrid")("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");


// DB configuration ============================================================
var configDB = require('./config/database.js');
mongoose.connect(configDB.url); // connect to our database

// Set Port ====================================================================
app.set('port', (process.env.PORT || 5002));

// Passport
app.use(session({secret: 'this is the secret'}));
app.use(cookieParser('this is the secret'));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Need to make sure that the ngfile upload was bing used so just writw this code
app.use('/node_modules', express.static(__dirname + "/node_modules"));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(multipartMiddleware);
app.use('/uploads', express.static(__dirname + "/uploads"));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// routes ==================================================
require(__dirname + '/server/routes')(app, Quote, Token, User, Contact, needle, rest, Driver, Staff, sendgrid);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
