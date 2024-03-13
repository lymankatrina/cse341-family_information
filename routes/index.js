const routes = require('express').Router();

routes.use('/', require('./swaggerRoutes'));
routes.use('/individuals', require('./individualRoutes'));
routes.use('/anniversaries', require('./anniversaryRoutes'));

module.exports = routes;
