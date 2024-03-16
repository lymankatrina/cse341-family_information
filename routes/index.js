const routes = require('express').Router();

routes.use('/', require('./swaggerRoutes'));
routes.use('/individuals', require('./individualRoutes'));
routes.use('/household', require('./householdRoutes'))

module.exports = routes;
