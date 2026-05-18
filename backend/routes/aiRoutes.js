const express = require('express');
const router = express.Router();
const { recommendAI } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

router.post('/recommend', protect, recommendAI);

module.exports = router;
