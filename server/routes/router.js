const router = require('express').Router();
const userRouter = require('./user.router');
const chatRouter = require('./chat.router');

router.use('/user', userRouter);
router.use('/chat', chatRouter);

module.exports = router;