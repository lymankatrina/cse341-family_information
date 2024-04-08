const express = require('express');
const router = express.Router();
const houseController = require('../controllers/householdController');
const { householdValidator } = require('../middleware/householdValidator');
const { validUserEmail, validHeadOfHousehold } = require('../middleware/permissionMiddleware');

// Get all households
router.get('/getall', validUserEmail, houseController.getHouseholds);

// Get household by id
router.get('/getbyid/:id', validUserEmail, houseController.getHouseholdById);

// Get household by head of household
router.get('/getbyhoh/:hoh', validUserEmail, houseController.getHouseholdsByHoh);

// Get household by address
router.get(
  '/getbyaddress/:street/:city/:state/:zip',
  validUserEmail,
  houseController.getHouseholdsByAddress
);

// Create household
router.post(
  '/createhousehold',
  validUserEmail,
  validHeadOfHousehold,
  houseController.createHousehold
);

// Update household by id
router.put(
  '/updatehousehold/:id',
  validUserEmail,
  validHeadOfHousehold,
  houseController.updateHousehold
);

// Delete household by id
router.delete(
  '/deletehousehold/:id',
  validUserEmail,
  validHeadOfHousehold,
  houseController.deleteHousehold
);

module.exports = router;
