const routes = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
// const { requiresAuth } = require('express-openid-connect');

routes
  .use(
    '/api-docs',
    swaggerUi.serve // '#swagger.ignore = true'
  )
  .get(
    '/api-docs',
    //    requiresAuth(),
    swaggerUi.setup(swaggerDocument) // '#swagger.ignore = true'
  );

module.exports = routes;
