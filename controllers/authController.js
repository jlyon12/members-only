const asyncHandler = require('express-async-handler');
const passport = require('passport');

exports.login_get = asyncHandler(async (req, res, next) => {
	res.render('login', { title: 'Members Only | Log in' });
});

exports.login_post = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/',
});
