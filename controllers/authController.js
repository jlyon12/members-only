const asyncHandler = require('express-async-handler');
const passport = require('passport');

exports.login_get = asyncHandler(async (req, res, next) => {
	res.render('login', { title: 'Members Only | Log in' });
});

exports.login_post = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/',
});

exports.checkAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
};

exports.checkIsAdmin = asyncHandler(async (req, res, next) => {
	if (req.user.is_admin) {
		return next();
	}
	res.redirect('/');
});

exports.logout_get = asyncHandler(async (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
});
