const request = require('supertest');
const express = require('express');
const router = require('../../routes/lookupRoutes');
const { validUserEmail } = require('../../middleware/permissionMiddleware');

const app = express();
app.use('/lookup', router);

jest.mock('../../models/individualModel');

jest.mock('../../middleware/permissionMiddleware', () => ({
  validUserEmail: jest.fn().mockImplementation((req, res, next) => {
    next();
  })
}));

describe('Lookup Routes', function () {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /lookup/parents/:id', async () => {
    const res = await request(app).get('/lookup/parents/65fc9426fc13ae5d6a50fa9c');
    expect(validUserEmail).toHaveBeenCalled();
    expect(res.statusCode).toBe(404);
  });

  test('GET /lookup/children/:parentId', async () => {
    const res = await request(app).get('/lookup/children/65fa5e1215cb7d3de3ff079a');
    expect(validUserEmail).toHaveBeenCalled();
    expect(res.statusCode).toBe(500);
  });

  test('GET /lookup/grandchildren/:grandparentId', async () => {
    const res = await request(app).get('/lookup/grandchildren/65fa5e1215cb7d3de3ff079a');
    expect(validUserEmail).toHaveBeenCalled();
    expect(res.statusCode).toBe(500);
  });

  test('GET /lookup/birthdays', async () => {
    const res = await request(app).get('/lookup/birthdays');
    expect(validUserEmail).toHaveBeenCalled();
    expect(res.statusCode).toBe(500);
  });

  test('GET /lookup/birthdaysformatted', async () => {
    const res = await request(app).get('/lookup/birthdaysformatted');
    expect(validUserEmail).toHaveBeenCalled();
    expect(res.statusCode).toBe(500);
  });

  test('GET /lookup/birthdays/:month', async () => {
    const res = await request(app).get('/lookup/birthdays/6');
    expect(validUserEmail).toHaveBeenCalled();
    expect(res.statusCode).toBe(500);
  });

  test('GET /lookup/mailinglabels', async () => {
    const res = await request(app).get('/lookup/mailinglabels');
    expect(validUserEmail).toHaveBeenCalled();
    expect(res.statusCode).toBe(500);
  });
});
