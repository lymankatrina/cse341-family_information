const options = {
  openapi: '3.0.0',
  autoHeaders: true,
  autoQuery: true,
  autoBody: true
};
const swaggerAutogen = require('swagger-autogen')(options);

const doc = {
  info: {
    version: '1.0.0',
    title: 'Pets and Owners API',
    description:
      'This is a simple REST API developed by Katrina Lyman for a school project assignment',
    contact: {
      name: 'CSE 341 Team D',
      url: 'https://github.com/ajrobbins04/cse341-family_information'
    }
  },
  servers: [
    {
      url: 'https://cse341proj2.onrender.com/',
      description: 'Render website'
    },
    {
      url: 'http://localhost:3000',
      description: 'Local development server'
    }
  ],
  paths: {},
  schemes: {},
  produces: {},
  tags: [],
  definitions: {},
  components: {}
};

const outputFile = './swagger-output.json';
const endpointsFile = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFile, doc);
