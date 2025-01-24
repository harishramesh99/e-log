const express = require('express');
const router = express.Router();
const { getSignIn, postSignIn, getSignUp, postSignUp, signOut } = require('../controller/authController');

router.get('/signin', getSignIn);
router.post('/signin', postSignIn);
router.get('/signup', getSignUp);
router.post('/signup', postSignUp);
router.post('/signout', signOut);

module.exports = router;