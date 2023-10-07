const express = require('express');
const router = express.Router();

const indexRouter = require('../routes/indexRouter');
const userRouter = require('../routes/userRouter');
const messageRouter = require('../routes/messageRouter');

router.use('/', indexRouter);
router.use('/user', userRouter);
router.use('/message', messageRouter);

module.exports = router;
