const Message = require('../models/message');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.create_get = asyncHandler(async (req, res, next) => {
	res.render('message_form', { title: 'Members Only | Create Message' });
});

exports.create_post = [
	body('title')
		.trim()
		.isLength({ min: 1 })
		.withMessage('Title can not be empty')
		.isLength({ max: 50 })
		.withMessage('Title must contain fewer than 50 characters')
		.escape(),
	body('content')
		.trim()
		.isLength({ min: 1 })
		.withMessage('Message can not be empty')
		.isLength({ max: 250 })
		.withMessage('Title must contain fewer than 250 characters')
		.escape(),
	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		const message = new Message({
			title: req.body.title,
			content: req.body.content,
			sender: req.user.id,
		});
		if (!errors.isEmpty()) {
			res.render('message_form', {
				title: 'Members Only | Create Message',
				message,
				errors: errors.array(),
			});
		} else {
			await message.save();
			res.redirect('/messages');
		}
	}),
];
