const request = require('supertest');
const express = require('express');
const router = require('../../routes/authRoutes');

const app = express();
app.use('/', router);

describe('Auth Routes', function () {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /', async () => {
    const res = await request(app).get('/logout');
    expect(res.status).toBe(404);
  });

  test('GET /landingpage', async () => {
    const res = await request(app).get('/landingpage');
    expect(res.status).toBe(200);
  });

  test('GET /profile', async () => {
    const res = await request(app).get('/profile');
    expect(res.status).toBe(500);
  });
});
