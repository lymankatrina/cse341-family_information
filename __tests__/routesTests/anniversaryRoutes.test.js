const request = require('supertest');
const express = require('express');
const router = require('../../routes/anniversaryRoutes');

const app = express();
app.use('/anniversaries', router);

describe('Anniversary Routes', function () {
  test('responds to /getall', async () => {
    const res = await request(app).get('/getall');
    expect(res.status).toBe(404);
  });

  test('responds to /getformatted', async () => {
    const res = await request(app).get('/getformatted');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /getbyid/:id', async () => {
    const res = await request(app).get('/getbyid/:id');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /getbymonth/:month', async () => {
    const res = await request(app).get('/getbymonth/:month');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /createanniversary', async () => {
    const res = await request(app).post('/createanniversary');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /updateanniversary/:id', async () => {
    const res = await request(app).put('/updateanniversary/:id');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /deleteanniversary/:id', async () => {
    const res = await request(app).delete('/deleteanniversary/:id');
    expect(res.statusCode).toBe(404);
  });
})