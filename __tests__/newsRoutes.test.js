const request = require('supertest');
const express = require('express');
const router = require('../routes/newsRoutes');

const app = express();
app.use('/news', router);

describe('News Routes', function () {
  test('responds to /getall', async () => {
    const res = await request(app).get('/getall');
    expect(res.status).toBe(404);
  });

  test('responds to /getformatted', async () => {
    const res = await request(app).get('/getformatted');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /:id', async () => {
    const res = await request(app).get('/:id');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /author/:postedBy', async () => {
    const res = await request(app).get('/author/:postedBy');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /status/:status', async () => {
    const res = await request(app).get('/status/:status');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /createnews', async () => {
    const res = await request(app).post('/createnews');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /updatenews/:id', async () => {
    const res = await request(app).put('/updatenews/:id');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /deletenews/:id', async () => {
    const res = await request(app).delete('/deletenews/:id');
    expect(res.statusCode).toBe(404);
  });
});
