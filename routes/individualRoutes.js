const express = require('express');
const router = express.Router();
const individualController = require('../controllers/individualController');
const { requiresAuth } = require('express-openid-connect');
//const { ownerValidationRules, validate } = require('../middleware/validate.js');

// Create an Individual
router.post('/createIndividual', individualController.createIndividual);

// Get a list of all Individuals
router.get('/getIndividuals', individualController.getAllIndividuals);

// Get a single individual by id
router.get('/getIndividual/:id', individualController.getSingleIndividual);

// Get individuals by parent id
//router.get('/getIndividualsbyparent/:parentId', individualController.getIndividualsByParent);

// Get individuals by household id
//router.get(
  //'/getindIvidualsbyhousehold/:householdId',
  //individualController.getIndividualsByHousehold
//);

// Get birthday list
//router.get('/getbirthdays', individualController.getBirthdays);

// Get birthdays by month
//router.get('/getbirthDays/:month', individualController.getBirthdaysByMonth);

// Get birthdays by parent id
//router.get('/getbirthDays/:parentId', individualController.getBirthdaysByParents);

// Update a single individual by id
router.put('/updateIndividual/:id', individualController.updateIndividual);

// Delete an individual by id
router.delete('/deleteIndividual/:id', individualController.deleteIndividual);

module.exports = router;