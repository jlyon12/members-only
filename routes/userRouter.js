const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.get(
	'/member',
	authController.checkAuthenticated,
	userController.upgrade_get
);
router.post(
	'/member',
	authController.checkAuthenticated,
	userController.upgrade_post
);

router.get(
	'/admin',
	authController.checkAuthenticated,
	userController.admin_get
);
router.post(
	'/admin',
	authController.checkAuthenticated,
	userController.admin_post
);

module.exports = router;
