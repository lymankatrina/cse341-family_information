const request = require('supertest');
const express = require('express');
const router = require('../../routes/newsRoutes');

const app = express();
app.use('/news', router);

jest.mock('../../models/newsModel');
jest.mock('../../middleware/permissionMiddleware', () => ({
  validUserEmail: jest.fn().mockImplementation((req, res, next) => {
    next();
  }),
  validHeadOfHousehold: jest.fn().mockImplementation((req, res, next) => {
    next();
  }),
  newsAccessMiddleware: jest.fn().mockImplementation((req, res, next) => {
    next();
  })
}));
jest.mock('../../middleware/newsValidator', () => ({
  newsValidator: jest.fn().mockImplementation((req, res, next) => {
    next();
  })
}));
describe('News Routes', function () {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /news/getall should respond with status 200', async () => {
    const res = await request(app).get('/news/getall');
    expect(res.status).toBe(200);
  });

 // validators and helper functions for other endpoints in this route file are tested seperately. Other endpoints in this file use mongoose terminology that is not supported by jest.
});
