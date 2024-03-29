const express = require('express');
const router = express.Router();
const individualController = require('../controllers/individualController');
const { individualValidator } = require('../middleware/individualValidator');

// Get a list of all Individuals
router.get('/getAllIndividuals', individualController.getAllIndividuals);

// Get a single Individual by id

router.get('/getSingleIndividual/:id', individualController.getIndividualById);

// Create a new Individual
router.post('/createIndividual', individualValidator, individualController.createIndividual);

// Update a single Individual by id
router.put('/updateIndividual/:id', individualValidator, individualController.updateIndividual);

// Delete an Individual by id
router.delete('/deleteIndividual/:id', individualController.deleteIndividual);

module.exports = router;