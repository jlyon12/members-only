require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// for production use
const compression = require('compression');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const limiter = RateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 60,
});

const connectDB = require('./config/db.js');
const routes = require('./config/router.js');

const app = express();
connectDB();

// require production packages
app.use(compression());
app.use(helmet());
app.use(limiter);

// view engine setup
app.set('views', path.join(__dirname, 'views', 'pages'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./config/passport');
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

app.use('', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
