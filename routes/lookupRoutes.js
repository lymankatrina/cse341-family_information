const express = require('express');
const router = express.Router();
const lookupController = require('../controllers/lookupController');

// Get all birthdays
router.get('/birthdays', lookupController.getBirthdays);

// Get birthdays by month
router.get('/birthdays/:month', lookupController.getBirthdaysByMonth);

// Get mailing labels
router.get('/mailingLabels', lookupController.getMailingLabels);

module.exports = router;
