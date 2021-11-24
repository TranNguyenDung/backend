const mongoose = require("mongoose");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const routers = [
  //"users",
  //"products",
  //"categories",
  //"profiles",
  //"currencies",
  //"roles",
  //"users"
];
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/products')
var currenciesRouter = require('./routes/Currencies')
var roleRouter = require('./routes/Roles')
var usersCommonRouter = require('./routes/usersCommon')

var app = express();
// DB setup
const uri = "mongodb://localhost:27017/erp";
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));// khai báo folder truy cập từ client


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);//> nhảy vào produc file
app.use('/currency', currenciesRouter);
app.use('/role', roleRouter);
app.use('/usersCommon', usersCommonRouter);
// 
if(routers.length > 0){
  console.log("Routes link request");
  for (const r of routers)
    app.use(`/${r}`, require(`./routes/${r}`));
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(5000);

module.exports = app;
