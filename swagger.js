const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Our Team Final Project CSE 341',
    description: 'Family Information API'
  },
  host: 'cse341-family_information.onrender.com',
  schemes: ['https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Individuals',
      description: 'Operations related to individuals'
    },
  ],
  definitions: {
    Individual: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        middleName: { type: 'string' },
        lastName: { type: 'string' },
        birthDate: { type: 'string' },
        parents: { type: 'string' },
        email: { type: 'string' },
        household: { type: 'string' },
        headOfHousehold: { type: 'string' },
        picture: { type: 'string' }
      },
      required: ['firstName', 'middleName', 'lastName', 'birthDate', 'parents', 'email', 'household', 'headOfHousehold', 'picture']
    }
  },
  paths: {
    '/individual/{id}': {
      put: {
        tags: ['Individuals'],
        summary: 'Update an individual',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of the individual to update',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'body',
            description: 'Updated individual object',
            required: true,
            schema: {
              $ref: '#/definitions/Individual'
            }
          }
        ],
        responses: {
          204: {
            description: 'Individual updated successfully'
          },
          400: {
            description: 'Bad Request'
          },
          412: {
            description: 'Precondition Failed'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      },
      delete: {
        tags: ['Individuals'],
        summary: 'Delete an individual',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of the individual to delete',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'Individual deleted successfully'
          },
          400: {
            description: 'Bad Request'
          },
          412: {
            description: 'Precondition Failed'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/individualRoutes.js']; // Change the endpoint file here

swaggerAutogen(outputFile, endpointsFiles, doc);
