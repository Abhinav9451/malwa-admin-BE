const express = require('express');
const { login, me, demoUsers } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.get('/me', protect, me);
router.get('/demo-users', demoUsers);

module.exports = router;
