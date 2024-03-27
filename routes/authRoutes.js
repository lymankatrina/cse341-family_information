const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { requiresAuth } = require('express-openid-connect');

router.get(
  '/', 
  authController.checkAuth // '#swagger.ignore = true'
);

router.get(
  '/landingpage',
  authController.callback // '#swagger.ignore = true'
);

router.get('/profile', requiresAuth(), authController.getProfile);


module.exports = router;
