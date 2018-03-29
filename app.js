var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

// Authentication Packages --> the stuff between '' are packages that get pulled in and stored in a variable

var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


//this keeps a users session going until they log out
var MySQLStore = require('express-mysql-session')(session);


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

//this is what allows us to sue the credentials within the .env file
require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator()); //this line must be immediately after any of the bodyParser middlewares!

var options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database : process.env.DB_NAME,
  socketPath: '/var/run/mysqld/mysqld.sock'

};

var sessionStore = new MySQLStore(options);

// stuff to return cookie to user
app.use(session({
  //should use a random string generator for this but maybe implement later
  secret: 'alsdkfjalsdj',
  //stays false --> only saving session when a change is directly made
  resave: false,
  //property to use the sessionStore
  store: sessionStore,
  //changed from tru to false --> create a cookie and session when users visits page even if they haven't logged in
  saveUninitialized: false,
  // cookie: { secure: true }
}))

// necessary middleware code needed for passport pacakges
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(username);
    console.log(password);
    //query db to check if user is registered --> requires the db.js file
    const db = require('./db')

    //actually making use of the db object to query the db and see if username and password match records
    //make sure user actually exists and then return their plain text password --> then hash the password and compare to hashed passwords
    db.query('SELECT Userpassword FROM users WHERE Username = ?', [username], function(err, results, fields) {
      //error handling
      if (err) {done(err)};

      //console.log(results);

      //if user was successfully grabbed from the db then you can grab the password associated with the usernam
      //call on bcrypt to hash the plaintext password the user tried to login with and compare to db 
      if (results.length === 0) {
      //if (undefined === results) {
          done(null, false);
          //this return call stops grom getting this error: Error: /home/user/Desktop/CSCI3308/SemesterProject/express-cc/views/error.hbs: Can't set headers after they are sent.
          return;
        }

      return done(null, 'adfasdfa');
      })
  }
));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


// Handlebars default config
const hbs = require('hbs');
const fs = require('fs');

const partialsDir = __dirname + '/views/partials';

const filenames = fs.readdirSync(partialsDir);

filenames.forEach(function (filename) {
  const matches = /^([^.]+).hbs$/.exec(filename);
  if (!matches) {
    return;
  }
  const name = matches[1];
  const template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
  hbs.registerPartial(name, template);
});

hbs.registerHelper('json', function(context) {
  return JSON.stringify(context, null, 2);
});


module.exports = app;
