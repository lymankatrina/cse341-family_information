const express = require('express');
const router = express.Router();
const { landingPage } = require('../controllers/authController');

router.get('/', landingPage);

module.exports = router;
