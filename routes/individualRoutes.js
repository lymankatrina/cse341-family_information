const express = require('express');
const router = express.Router();
//const security = require('../middleware/authorize.js');

const individualController = require('../controllers/individualController');
//const validation = require('../middleware/validate');

router.get('/', individualController.getAll);

router.get('/:id', individualController.getSingle);

router.post('/', individualController.createIndividual);

router.put('/:id', individualController.updateIndividual);

router.delete('/:id', individualController.deleteIndividual);

module.exports = router;
