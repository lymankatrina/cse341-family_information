const request = require('supertest');
const express = require('express');
const router = require('../../routes/anniversaryRoutes');
const { validUserEmail, validHeadOfHousehold } = require('../../middleware/permissionMiddleware');
const anniversaryController = require('../../controllers/anniversaryController');
const { anniversaryValidator } = require('../../middleware/anniversaryValidator');

const app = express();
app.use('/anniversaries', router);

jest.mock('../../models/anniversaryModel');
jest.mock('../../middleware/permissionMiddleware', () => ({
  validUserEmail: jest.fn().mockImplementation((req, res, next) => {
    next();
  }),
  validHeadOfHousehold: jest.fn().mockImplementation((req, res, next) => {
    next();
  })
}));

jest.mock('../../middleware/anniversaryValidator', () => ({
  anniversaryValidator: jest.fn().mockImplementation((req, res, next) => {
    next();
  })
}));

jest.mock('../../controllers/anniversaryController', () => ({
  getAllAnniversaries: jest.fn().mockImplementation((req, res) => {
    res.status(200).end();
  }),
  getFormattedAnniversaries: jest.fn().mockImplementation((req, res) => {
    res.status(200).end();
  }),
  getAnniversaryById: jest.fn().mockImplementation((req, res) => {
    res.status(200).end();
  }),
  getAnniversariesByMonth: jest.fn().mockImplementation((req, res) => {
    res.status(200).end();
  }),
  createAnniversary: jest.fn().mockImplementation((req, res) => {
    res.status(200).end();
  }),
  updateAnniversary: jest.fn().mockImplementation((req, res) => {
    res.status(200).end();
  }),
  deleteAnniversary: jest.fn().mockImplementation((req, res) => {
    res.status(200).end();
  })
}));

describe('Anniversary Routes', function () {
  test('GET /anniversaries/getall', async () => {
    const res = await request(app).get('/anniversaries/getall');
    expect(validUserEmail).toHaveBeenCalled();
    expect(anniversaryController.getAllAnniversaries).toHaveBeenCalled();
    expect(res.status).toBe(200);
  });

  test('GET /anniversaries/getformatted', async () => {
    const res = await request(app).get('/anniversaries/getformatted');
    expect(validUserEmail).toHaveBeenCalled();
    expect(anniversaryController.getFormattedAnniversaries).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
  });

  test('GET /anniversaries/getbyid/:id', async () => {
    const res = await request(app).get('/anniversaries/getbyid/1');
    expect(validUserEmail).toHaveBeenCalled();
    expect(anniversaryController.getAnniversaryById).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
  });

  test('GET /anniversaries/getbymonth/:month', async () => {
    const res = await request(app).get('/anniversaries/getbymonth/6');
    expect(validUserEmail).toHaveBeenCalled();
    expect(anniversaryController.getAnniversariesByMonth).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
  });

  test('POST /anniversaries/createanniversary', async () => {
    const res = await request(app).post('/anniversaries/createanniversary');
    expect(validUserEmail).toHaveBeenCalled();
    expect(validHeadOfHousehold).toHaveBeenCalled();
    expect(anniversaryValidator).toHaveBeenCalled();
    expect(anniversaryController.createAnniversary).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
  });

  test('PUT /anniversaries/updateanniversary/:id', async () => {
    const res = await request(app).put('/anniversaries/updateanniversary/1');
    expect(validUserEmail).toHaveBeenCalled();
    expect(validHeadOfHousehold).toHaveBeenCalled();
    expect(anniversaryValidator).toHaveBeenCalled();
    expect(anniversaryController.updateAnniversary).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
  });

  test('DELETE /anniversaries/deleteanniversary/:id', async () => {
    const res = await request(app).delete('/anniversaries/deleteanniversary/1');
    expect(validUserEmail).toHaveBeenCalled();
    expect(validHeadOfHousehold).toHaveBeenCalled();
    expect(anniversaryController.deleteAnniversary).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
  });
});
