const express = require('express');
const router = express.Router();
const lookupController = require('../controllers/lookupController');

// Get all birthdays
router.get('/getAll', lookupController.getBirthdays);

// Get birthdays by month
router.get('/:month', lookupController.getBirthdaysByMonth);

module.exports = router;
