const request = require('supertest');
const express = require('express');
const router = require('../../routes/index');

const app = new express();
app.use('/', router);

describe('Index Routes', function() {

  test('responds to /', async() => {
    const res = await request(app).get('/login');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /api-docs', async() => {
    const res = await request(app).get('/api-docs');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /individuals', async() => {
    const res = await request(app).get('/individuals');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /household', async() => {
    const res = await request(app).get('/household');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /anniversaries', async() => {
    const res = await request(app).get('/household');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /news', async() => {
    const res = await request(app).get('/household');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /lookup', async() => {
    const res = await request(app).get('/household');
    expect(res.statusCode).toBe(404);
  });
});
