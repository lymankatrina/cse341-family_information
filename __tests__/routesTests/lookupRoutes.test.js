const request = require('supertest');
const express = require('express');
const router = require('../../routes/lookupRoutes');

const app = express();
app.use('/lookup', router);

describe('Lookup Routes', function () {
  test('responds to /parents/:id', async () => {
    const res = await request(app).get('/parents/:id');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /children/:parentId', async () => {
    const res = await request(app).get('/children/:parentId');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /grandchildren/:grandparentId', async () => {
    const res = await request(app).get('/grandchildren/:grandparentId');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /birthdays', async () => {
    const res = await request(app).get('/birthdays');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /birthdaysFormatted', async () => {
    const res = await request(app).get('/birthdaysFormatted');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /birthdays/:month', async () => {
    const res = await request(app).get('/birthdays/:month');
    expect(res.statusCode).toBe(404);
  });

  test('responds to /mailingLabels', async () => {
    const res = await request(app).get('/mailingLabels');
    expect(res.statusCode).toBe(404);
  });
})