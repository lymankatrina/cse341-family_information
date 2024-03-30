const express = require('express');
const router = express.Router();
const anniversaryController = require('../controllers/anniversaryController');
const { anniversaryValidator } = require('../middleware/anniversaryValidator');
const { validUserEmail, validHeadOfHousehold } = require('../middleware/permissionMiddleware')


// Get a list of all anniversaries
router.get('/getall', validUserEmail, anniversaryController.getAllAnniversaries);

// Get a single Anniversary by Individual id
router.get('/getbyid/:id', validUserEmail, anniversaryController.getAnniversaryById);

// Get a single Anniversaries by Month
router.get('/getbymonth/:month', validUserEmail, anniversaryController.getAnniversariesByMonth);

// Create an Anniversary
router.post('/createanniversary', validUserEmail, validHeadOfHousehold, anniversaryValidator, anniversaryController.createAnniversary);

// Update a single Anniversary by id
router.put('/updateanniversary/:id', validUserEmail, validHeadOfHousehold, anniversaryValidator, anniversaryController.updateAnniversary);

// Delete an Anniversary by id
router.delete('/deleteanniversary/:id', validUserEmail, validHeadOfHousehold, anniversaryController.deleteAnniversary);

module.exports = router;
