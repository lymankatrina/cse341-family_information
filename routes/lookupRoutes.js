const express = require('express');
const router = express.Router();
const lookupController = require('../controllers/lookupController');

// Get Parents
router.get('/parents/:id', lookupController.getParents);

// Get children
router.get('/children/:parentId', lookupController.getChildren);

// Get grandchildren
router.get('/grandchildren/:grandparentId', lookupController.getGrandchildren);

// Get all birthdays
router.get('/birthdays', lookupController.getBirthdays);

// Get birthdays formatted
router.get('/birthdaysFormatted', lookupController.getBirthdayFormatted);

// Get birthdays by month
router.get('/birthdays/:month', lookupController.getBirthdaysByMonth);

// Get mailing labels
router.get('/mailingLabels', lookupController.getMailingLabels);

module.exports = router;
