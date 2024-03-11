const express = require('express');
const router = express.Router();
const individualController = require('../controllers/individualController');

// Create an Individual
router.post('/createindividual', individualController.createIndividual);

// Get a list of all Individuals
router.get('/getindividuals', individualController.getAllIndividuls);

// Get a single individual by id
router.get('/getindividual/:id', individualController.getSingleIndividual);

// Get individuals by parent id
router.get('/getindividualsbyparent/:parentId', individualController.getIndividualsByParent);

// Get individuals by household id
router.get(
  '/getindividualsbyhousehold/:householdId',
  individualController.getIndividualsByHousehold
);

// Get birthday list
router.get('/getbirthdays', individualController.getBirthdays);

// Get birthdays by month
router.get('/getbirthdays/:month', individualController.getBirthdaysByMonth);

// Get birthdays by parent id
router.get('/getbirthdays/:parentId', individualController.getBirthdaysByParents);

// Update a single individual by id
router.put('/updateindividual/:id', individualController.updateIndividual);

// Delete an individual by id
router.delete('/deleteindividual/:id', individualController.deleteIndividual);

module.exports = router;
