const routes = require('express').Router();

routes.use('/', require('./swagger')).use('/individuals', require('./individualRoutes'));

module.exports = routes;
