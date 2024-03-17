// Application endpoints index

const routes = require('express').Router();
const { displayIndex } = require('../controllers/indexController');

routes
  .get('/', displayIndex)
  .use('/', require('./swaggerRoutes'))
  .use('/individuals', require('./individualRoutes'))
  .use('/anniversaries', require('./anniversaryRoutes'))
  .use('/news', require('./newsRoutes'))
  .use('/household', require('./householdRoutes'));

module.exports = routes;
