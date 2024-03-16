const express = require('express');
const router = express.Router();

//const security = require('../middleware/authorize.js');

const individualController = require('../controllers/individualController');
//const validation = require('../middleware/validate');

// Get a list of all Individuals
router.get('/getAllIndividuals', individualController.getAllIndividuals);

// Get a single Individual by id

router.get('/getSingleIndividual/:id', individualController.getSingleIndividual);

router.post('/', individualController.createIndividual);

router.put('/:id', individualController.updateIndividual);

router.delete('/:id', individualController.deleteIndividual);

module.exports = router;
