const routes = require('express').Router();

routes
  .use('/', require('./authRoutes'))
  .use('/api-docs', require('./swaggerRoutes'))
  .use('/individuals', require('./individualRoutes'))
  .use('/household', require('./householdRoutes'))
  .use('/anniversaries', require('./anniversaryRoutes'))
  .use('/news', require('./newsRoutes'))
  .use('/lookup', require('./lookupRoutes'));

module.exports = routes;
