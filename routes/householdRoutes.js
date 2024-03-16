const express = require('express');
const router = express.Router();
const houseController = require('../controllers/householdController')

// Get all households
router.get('/gethouseholds', houseController.getHouseholds)

// Get household by id
router.get('/gethousehold/:id', houseController.getHouseholdById)

// Get household by head of household
router.get('/gethouseholds/:hoh', houseController.getHouseholdsByHoh)

// Get household by address
router.get('/gethouseholds/:address', houseController.getHouseholdsByAddress)

// Create household
router.post('/createhousehold', houseController.createHousehold)

// Update household by id
router.put('/updatehousehold/:id', houseController.updateHousehold)

// Delete household by id
router.delete('/deletehousehold/:id', houseController.deleteHousehold)

module.exports = router;