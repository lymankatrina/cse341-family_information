const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));

router.use('/addresses', require('./individuals'));
router.use('/relationships', require('./households'));
router.use('/relationships', require('./anniversaries'));
router.use('/users', require('./news'));

module.exports = router;
