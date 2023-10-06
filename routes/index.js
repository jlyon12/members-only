const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Members Only | Home' });
});

router.get('/signup', userController.user_signup_get);
router.post('/signup', userController.user_signup_post);

module.exports = router;
