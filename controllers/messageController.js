const asyncHandler = require('express-async-handler');

exports.create_get = asyncHandler(async (req, res, next) => {
	res.render('message_form', { title: 'Members Only | Create Message' });
});
