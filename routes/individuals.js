const express = require('express');
const router = express.Router();

const individualController = require('../controllers/individuals');

router.get('/', individualController.getAll);

router.get('/:id', individualController.getSingle);

router.post('/', individualController.createIndividual);

router.put('/:id', individualController.updateIndividual);

router.delete('/:id', individualController.deleteIndividual);

module.exports = router;
