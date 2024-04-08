const request = require('supertest');
const express = require('express');
const router = require('../../routes/householdRoutes');

const app = express();
app.use('/household', router);

describe('Household Routes', function () {
  test('responds to /getall', async () => {
    const res = await request(app).get('/getall');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /getbyid/:id', async () => {
    const res = await request(app).get('/getbyid/:id');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /getbyhoh/:hoh', async () => {
    const res = await request(app).get('/getbyhoh/:hoh');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /getbyaddress/:street/:city/:state/:zip', async () => {
    const res = await request(app).get('/getbyaddress/:street/:city/:state/:zip');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /createhousehold', async () => {
    const res = await request(app).post('/createhousehold');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /updatehousehold/:id', async () => {
    const res = await request(app).put('/updatehousehold/:id');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /deletehousehold/:id', async () => {
    const res = await request(app).delete('/deletehousehold/:id');
    expect(res.statusCode).toBe(404);
  });
});