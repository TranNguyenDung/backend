const mongoose = require("mongoose");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const schedule = require("node-schedule");

const {updateCurrency2} = require("./services/currency2.services");
// Auto routers
const routers = [
  //"users",
  //"products",
  //"categories",
  //"profiles",
  //"currencies",
  //"roles",
  //"users"
  "categories",
  "profiles",
];
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/products')
var currenciesRouter = require('./routes/Currencies')
var roleRouter = require('./routes/Roles')
var usersCommonRouter = require('./routes/usersCommon')
//----------------------------------------------------
var app = express();
// DB setup
const uri = "mongodb://localhost:27017/erp";
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
});
//----------------------------------------------------
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//----------------------------------------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));// khai báo folder truy cập từ client
//----------------------------------------------------
//kiểu viết trải các router
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);//> nhảy vào product file
app.use('/currency', currenciesRouter);
app.use('/role', roleRouter);
app.use('/usersCommon', usersCommonRouter);
//----------------------------------------------------
// Kiểu viết ngắn gọn để router file
if(routers.length > 0){
  console.log("Routes link request");
  for (const r of routers){
    app.use(`/${r}`, require(`./routes/${r}`));
    console.log(`/${r}`);    
  }
}
//----------------------------------------------------
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
//----------------------------------------------------
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//----------------------------------------------------
let value = 0;
//const job = schedule.scheduleJob("*/5     *", function () {
//const job = schedule.scheduleJob("* * * * * *", function () {// 1 giay chay 1 lan
//const job = schedule.scheduleJob("3 * * * * *", function () {// giay thu 3
const job = schedule.scheduleJob("*/5 * * * * *", function () {// moi 10 giay
  console.log("The answer to life, the universe, and everything!: " + value++);
  updateCurrency2();
  job.cancel();
  
});
//----------------------------------------------------
// Port nhận thông tin request
app.listen(5000);
//----------------------------------------------------
module.exports = app;



//npm install --save multer -> upload file
//npm install nodemailer -> Email/Imap

//express-fileupload -> Upload qua exp
// npm install node-schedule  -> Scheduler