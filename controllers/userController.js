const asyncHandler = require('express-async-handler');

exports.user_signup_get = asyncHandler(async (req, res, next) => {
	res.render('signup', { title: 'Members Only | Sign Up' });
});
