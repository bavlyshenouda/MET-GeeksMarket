var express = require ("express");
var app = express();
var port = process.env.PORT|| 8080;
var morgan = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var router = require('./routes');
var path = require("path");
var multer  = require('multer');
var session = require('express-session');


app.set('view engine', 'ejs');
app.use(session({secret: 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD',resave:false, saveUninitialized:true}));
app.use(morgan('dev'));
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + '/uploads'));
app.use(router);




mongoose.Promise = require('bluebird');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {});
mongoose.connect('mongodb://localhost:27017/test', function(err){
  if(err)
  {console.log('db not connected '+err);}
  else
  {console.log('db connected');}
});


app.listen(port, function(){
  console.log("Listening to port " + port);
});
