const express = require('express');
const router = express.Router();
const anniversaryController = require('../controllers/anniversaryController');
const { anniversaryValidationRules, validate } = require('../middleware/validator');

// Create an Anniversary
router.post(
  '/createanniversary',
  anniversaryValidationRules(),
  validate,
  anniversaryController.createAnniversary
);

// Get a list of all anniversaries
router.get('/getall', anniversaryController.getAllAnniversaries);

// Get a single Anniversary by Individual id
router.get('/:individualId', anniversaryController.getAnniversaryByIndividual);

// Get a single Anniversaries by Month
router.get('/:month', anniversaryController.getAnniversariesByMonth);

// Update a single Anniversary by id
router.put(
  '/updateanniversary/:id',
  anniversaryValidationRules(),
  validate,
  anniversaryController.updateAnniversary
);

// Delete an Anniversary by id
router.delete('/deleteanniversary/:id', anniversaryController.deleteAnniversary);

module.exports = router;
