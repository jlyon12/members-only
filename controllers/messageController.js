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
exports.message_list_get = asyncHandler(async (req, res, next) => {
	const messages = await Message.find({})
		.populate('sender')
		.sort({ timestamp: -1 })
		.exec();
	res.render('message_list', {
		title: 'Members Only | Messages',
		messages,
	});
});

exports.delete_get = asyncHandler(async (req, res, next) => {
	const message = await Message.findById(req.params.id);

	res.render('message_delete', {
		title: 'Members Only | Delete',
		message,
	});
});

exports.delete_post = asyncHandler(async (req, res, next) => {
	await Message.findByIdAndDelete(req.params.id).exec();
	res.redirect('/messages');
});
