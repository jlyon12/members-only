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

router.get(
	'/member/request',
	authController.checkAuthenticated,
	userController.upgrade_get
);
router.post(
	'/member/request',
	authController.checkAuthenticated,
	userController.upgrade_post
);

router.get(
	'/admin/request',
	authController.checkAuthenticated,
	userController.admin_get
);
router.post(
	'/admin/request',
	authController.checkAuthenticated,
	userController.admin_post
);

router.get('/messages', messageController.message_list_get);

router.get(
	'/message/create',
	authController.checkAuthenticated,
	messageController.create_get
);
router.post(
	'/message/create',
	authController.checkAuthenticated,
	messageController.create_post
);

router.get(
	'/message/:id/delete',
	authController.checkAuthenticated,
	authController.checkIsAdmin,
	messageController.delete_get
);
router.post(
	'/message/:id/delete',
	authController.checkAuthenticated,
	authController.checkIsAdmin,
	messageController.delete_post
);

module.exports = router;
