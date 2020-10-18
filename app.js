var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')
var cookieParser = require('cookie-parser');

var app = express();
app.use(cors({
    origin:true,
    credentials:true,
}))
global.appRoot = path.resolve(__dirname);
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index')


app.use('/', indexRouter);




module.exports = app;
