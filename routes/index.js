const routes = require('express').Router();

routes.use('/', require('./swaggerRoutes'));
routes.use('/individuals', require('./individualRoutes'));

module.exports = routes;
