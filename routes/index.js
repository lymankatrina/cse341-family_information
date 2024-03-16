
// Application endpoints index

const express = require('express');
const router = express.Router();

router.use('/', require('./swaggerRoutes'));
router.use('/individuals', require('./individualRoutes'));


module.exports = router;
