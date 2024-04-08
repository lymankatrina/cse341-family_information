const request = require('supertest');
const express = require('express');
const router = require('../../routes/swaggerRoutes');

const app = express();
app.use('/', router);

describe('Swagger Routes', function () {
  test('responds to /api-docs', async () => {
    const res = await request(app).get('/api-docs');
    expect(res.statusCode).toBe(301); // redirects to swagger ui
  });
});
