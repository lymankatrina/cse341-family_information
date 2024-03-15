const express = require('express');
const router = express.Router();
const lookupController = require('../controllers/lookupController');
const { requiresAuth } = require('express-openid-connect');

// Get mailing label information
router.get('/mailingLabels', requiresAuth(), lookupController.getMailingLabelInfo);

module.exports = router;
