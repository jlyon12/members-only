const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

exports.signup_get = asyncHandler(async (req, res, next) => {
	res.render('signup', { title: 'Members Only | Sign Up' });
});

exports.signup_post = [
	body('first_name')
		.trim()
		.isLength({ min: 1 })
		.withMessage('First Name is required')
		.escape(),
	body('last_name')
		.trim()
		.isLength({ min: 1 })
		.withMessage('Last Name is required')

		.escape(),
	body('email')
		.trim()
		.isEmail()
		.withMessage('Email must be a valid email address')
		.custom(async (value) => {
			const emailExists = await User.findOne({ email: value }).exec();
			if (emailExists) {
				throw new Error('Email is already in use');
			}
		})
		.escape(),
	body('password')
		.trim()
		.isStrongPassword({
			minLength: 8,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 1,
		})
		.withMessage(
			'Password must be at least 8 characters and include an uppercase letter, lowercase letter, number, and symbol.'
		)
		.matches(/^[^<>'"/ &]+$/g)
		.withMessage('Password can not contain < , > , " , " , / , & or spaces.')

		.escape(),
	body('password_confirm')
		.trim()
		.custom((value, { req }) => {
			return value === req.body.password;
		})
		.withMessage('Passwords do not match')
		.escape(),
	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const user = new User({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: hashedPassword,
		});
		if (!errors.isEmpty()) {
			res.render('signup', {
				title: 'Members Only | Sign Up',
				user,
				errors: errors.array(),
			});
		} else {
			await user.save();
			res.redirect('/');
		}
	}),
];
