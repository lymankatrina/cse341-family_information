const express = require('express');
const router = express.Router();
const houseController = require('../controllers/householdController');
const { validUserEmail, validHeadOfHousehold } = require('../middleware/permissionMiddleware')

// Get all households
router.get('/getall', houseController.getHouseholds);

// Get household by id
router.get('/getbyid/:id', validHeadOfHousehold, houseController.getHouseholdById);

// Get household by head of household
router.get('/getbyhoh/:hoh', houseController.getHouseholdsByHoh);

// Get household by address
router.get('/getbyaddress/:street/:city/:state/:zip', houseController.getHouseholdsByAddress);

// Create household
router.post('/createhousehold', houseController.createHousehold);

// Update household by id
router.put('/updatehousehold/:id', houseController.updateHousehold);

// Delete household by id
router.delete('/deletehousehold/:id', houseController.deleteHousehold);

module.exports = router;
