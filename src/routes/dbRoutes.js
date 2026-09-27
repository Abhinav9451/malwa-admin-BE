const express = require('express');
const { getDb, syncDb } = require('../controllers/dbController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getDb);
router.put('/', protect, syncDb);

module.exports = router;
