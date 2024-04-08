const request = require('supertest');
const express = require('express');
const router = require('../../routes/newsRoutes');
const {
  validUserEmail,
  validHeadOfHousehold,
  newsAccessMiddleware
} = require('../../middleware/permissionMiddleware');
const newsController = require('../../controllers/newsController');
const { newsValidator } = require('../../middleware/newsValidator');

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

jest.mock('../../controllers/newsController', () => ({
  getAllNews: jest.fn().mockImplementation((req, res) => {
    res.status(200).end();
  }),
  getFormattedNews: jest.fn().mockImplementation((req, res) => {
    res.status(200).end();
  }),
  getNewsById: jest.fn().mockImplementation((req, res) => {
    res.status(200).end();
  }),
  getNewsByAuthor: jest.fn().mockImplementation((req, res) => {
    res.status(200).end();
  }),
  getNewsByStatus: jest.fn().mockImplementation((req, res) => {
    res.status(200).end();
  }),
  createNewsStory: jest.fn().mockImplementation((req, res) => {
    res.status(200).end();
  }),
  updateNewsById: jest.fn().mockImplementation((req, res) => {
    res.status(200).end();
  }),
  deleteNewsById: jest.fn().mockImplementation((req, res) => {
    res.status(200).end();
  })
}));

describe('News Routes', function () {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /news/getall should respond with status 200', async () => {
    const res = await request(app).get('/news/getall');
    expect(newsController.getAllNews).toHaveBeenCalled();
    expect(res.status).toBe(200);
  });

  test('GET /news/getformatted should respond with status 200', async () => {
    const res = await request(app).get('/news/getformatted');
    expect(validUserEmail).toHaveBeenCalled();
    expect(newsAccessMiddleware).toHaveBeenCalled();
    expect(newsController.getFormattedNews).toHaveBeenCalled();
    expect(res.status).toBe(200);
  });

  test('GET /news/:id should respond with status 200', async () => {
    const res = await request(app).get('/news/1');
    expect(validUserEmail).toHaveBeenCalled();
    expect(newsAccessMiddleware).toHaveBeenCalled();
    expect(newsController.getNewsById).toHaveBeenCalled();
    expect(res.status).toBe(200);
  });

  test('GET /news/author/:postedBy should respond with status 200', async () => {
    const res = await request(app).get('/news/author/1');
    expect(validUserEmail).toHaveBeenCalled();
    expect(newsAccessMiddleware).toHaveBeenCalled();
    expect(newsController.getNewsByAuthor).toHaveBeenCalled();
    expect(res.status).toBe(200);
  });

  test('GET /news/status/:status should respond with status 200', async () => {
    const res = await request(app).get('/news/status/public');
    expect(validUserEmail).toHaveBeenCalled();
    expect(newsAccessMiddleware).toHaveBeenCalled();
    expect(newsController.getNewsByStatus).toHaveBeenCalled();
    expect(res.status).toBe(200);
  });

  test('POST /news/createnews should respond with status 200', async () => {
    const res = await request(app).post('/news/createnews');
    expect(validUserEmail).toHaveBeenCalled();
    expect(validHeadOfHousehold).toHaveBeenCalled();
    expect(newsValidator).toHaveBeenCalled();
    expect(newsController.createNewsStory).toHaveBeenCalled();
    expect(res.status).toBe(200);
  });

  test('PUT /news/updatenews/:id should respond with status 200', async () => {
    const res = await request(app).put('/news/updatenews/1');
    expect(validUserEmail).toHaveBeenCalled();
    expect(validHeadOfHousehold).toHaveBeenCalled();
    expect(newsValidator).toHaveBeenCalled();
    expect(newsController.updateNewsById).toHaveBeenCalled();
    expect(res.status).toBe(200);
  });

  test('DELETE /news/deletenews/:id should respond with status 200', async () => {
    const res = await request(app).delete('/news/deletenews/1');
    expect(validUserEmail).toHaveBeenCalled();
    expect(validHeadOfHousehold).toHaveBeenCalled();
    expect(newsController.deleteNewsById).toHaveBeenCalled();
    expect(res.status).toBe(200);
  });
});
