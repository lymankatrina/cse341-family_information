const express = require('express');
const router = express.Router();
const lookupController = require('../controllers/lookupController');
const { validUserEmail } = require('../middleware/permissionMiddleware')


// Get Parents
router.get('/parents/:id', validUserEmail, lookupController.getParents);

// Get children
router.get('/children/:parentId', validUserEmail, lookupController.getChildren);

// Get grandchildren
router.get('/grandchildren/:grandparentId', validUserEmail, lookupController.getGrandchildren);

// Get all birthdays
router.get('/birthdays', validUserEmail, lookupController.getBirthdays);

// Get birthdays formatted
router.get('/birthdaysFormatted', lookupController.getBirthdayFormatted);

// Get birthdays by month
router.get('/birthdays/:month', validUserEmail, lookupController.getBirthdaysByMonth);

// Get mailing labels
router.get('/mailingLabels', validUserEmail, lookupController.getMailingLabels);

module.exports = router;
