

// Application endpoints index

const routes = require('express').Router();

routes
  .use('/', require('./swaggerRoutes'))
  .use('/individuals', require('./individualRoutes'))
  .use('/anniversaries', require('./anniversaryRoutes'))
  .use('/news', require('./newsRoutes'));

module.exports = routes;

