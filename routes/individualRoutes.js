const express = require('express');
const router = express.Router();
const { validUserEmail, validHeadOfHousehold } = require('../middleware/permissionMiddleware');

const individualController = require('../controllers/individualController');
const { individualValidator } = require('../middleware/individualValidator');

// Get a list of all Individuals
router.get('/getAllIndividuals', validUserEmail, individualController.getAllIndividuals);

// Get a single Individual by id
router.get('/getIndividualById/:id', validUserEmail, individualController.getIndividualById);

router.post(
  '/',
  validUserEmail,
  validHeadOfHousehold,
  individualValidator,
  individualController.createIndividual
);

router.put(
  '/:id',
  validUserEmail,
  validHeadOfHousehold,
  individualValidator,
  individualController.updateIndividual
);

router.delete('/:id', validUserEmail, validHeadOfHousehold, individualController.deleteIndividual);

module.exports = router;
