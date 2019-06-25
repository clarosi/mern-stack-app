const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

// Get User
router.get('/', auth, require('../controllers/user').getUser);

// Add user
router.post('/signup', require('../controllers/user').signup);

// SignIn
router.post('/signin', require('../controllers/user').signin);

module.exports = router;
