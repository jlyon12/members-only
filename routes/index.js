const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Members Only | Home' });
});

router.get('/signup', userController.signup_get);
router.post('/signup', userController.signup_post);

router.get('/login', authController.login_get);
module.exports = router;
