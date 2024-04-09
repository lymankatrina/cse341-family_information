const routes = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

routes
  .use(
    '/api-docs',
    swaggerUi.serve // '#swagger.ignore = true'
  )
  .get(
    '/api-docs',
    swaggerUi.setup(swaggerDocument) // '#swagger.ignore = true'
  );

module.exports = routes;
