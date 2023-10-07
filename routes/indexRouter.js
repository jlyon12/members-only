const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');
const authController = require('../controllers/authController');

router.get('/', function (req, res, next) {
	res.render('index', { title: 'Members Only | Home' });
});

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);

router.get('/logout', authController.logout_get);

router.get('/signup', userController.signup_get);
router.post('/signup', userController.signup_post);

router.get('/messages', messageController.message_list_get);
module.exports = router;
