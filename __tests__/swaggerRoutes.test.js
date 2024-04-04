const request = require('supertest');
const express = require('express');
const router = require('../routes/swaggerRoutes');

const app = express();
app.use('/api-docs', router);

describe('Swagger Routes', function () {
  test('responds to /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(404);
  });
});
