const routes = require('express').Router();
const express = require('express');
routes.use('/', require('./swaggerRoutes'));
routes.use('/individuals', require('./individualRoutes'));

module.exports = routes;