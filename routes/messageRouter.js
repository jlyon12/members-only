const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageController');
const authController = require('../controllers/authController');

router.get(
	'/create',
	authController.checkAuthenticated,
	messageController.create_get
);
router.post(
	'/create',
	authController.checkAuthenticated,
	messageController.create_post
);

router.get(
	'/:id/delete',
	authController.checkAuthenticated,
	authController.checkIsAdmin,
	messageController.delete_get
);
router.post(
	'/:id/delete',
	authController.checkAuthenticated,
	authController.checkIsAdmin,
	messageController.delete_post
);
module.exports = router;
