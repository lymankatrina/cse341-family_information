const routes = require('express').Router();

routes
  .use('/', require('./authRoutes'))
  .use('/', require('./swaggerRoutes'))
  .use('/individuals', require('./individualRoutes'))
  .use('/household', require('./householdRoutes'))
  .use('/anniversaries', require('./anniversaryRoutes'))
  .use('/news', require('./newsRoutes'))
  .use('/lookup', require('./lookupRoutes'));

module.exports = routes;
