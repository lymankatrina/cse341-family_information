const request = require('supertest');
const express = require('express');
const router = require('../../routes/authRoutes');

const app = express();
app.use('/', router);

describe('Auth Routes', function () {
  test('responds to /', async () => {
    const res = await request(app).get('/login');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /landingpage', async () => {
    const res = await request(app).get('/landingpage');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /profile', async () => {
    const res = await request(app).get('/profile');
    expect(res.statusCode).toBe(500);
  });
});