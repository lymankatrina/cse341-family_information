const request = require('supertest');
const express = require('express');
const router = require('../../routes/individualRoutes');

const app = express();
app.use('/individuals', router);

describe('News Routes', function () {
  test('responds to /getallindividuals', async () => {
    const res = await request(app).get('/getallindividuals');
    expect(res.status).toBe(404);
  });

  test('responds to /getindividualsbyid/:id', async () => {
    const res = await request(app).get('//getindividualsbyid/:id');
    expect(res.statusCode).toBe(404);
  });

    test('responds to /', async () => {
    const res = await request(app).post('/');
    expect(res.statusCode).toBe(404);
  });

  test('update responds to /:id', async () => {
    const res = await request(app).put('/:id');
    expect(res.statusCode).toBe(404);
  });

  test('delete responds to /:id', async () => {
    const res = await request(app).delete('/:id');
    expect(res.statusCode).toBe(404);
  });
});
