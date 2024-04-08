const request = require('supertest');
const express = require('express');
const router = require('../../routes/lookupRoutes');
const lookupController = require('../../controllers/lookupController');
const { validUserEmail } = require('../../middleware/permissionMiddleware');

const app = express();
app.use('/lookup', router);

jest.mock('../../models/individualModel');

jest.mock('../../middleware/permissionMiddleware', () => ({
  validUserEmail: jest.fn().mockImplementation((req, res, next) => {
    next();
  })
}));

jest.mock('../../controllers/lookupController', () => ({
  getParents: jest.fn().mockImplementation((req, res) => {
    res.status(200).end();
  }),
  getChildren: jest.fn().mockImplementation((req,res) => {
    res.status(200).end();
  }),
  getGrandchildren: jest.fn().mockImplementation((req,res) => {
    res.status(200).end();
  }),
  getBirthdays: jest.fn().mockImplementation((req,res) => {
    res.status(200).end();
  }),
  getBirthdayFormatted: jest.fn().mockImplementation((req, res) => {
    res.status(200).end();
  }),
  getBirthdaysByMonth: jest.fn().mockImplementation((req,res) => {
    res.status(200).end();
  }),
  getMailingLabels: jest.fn().mockImplementation((req,res) => {
    res.status(200).end();
  })
}));

describe('Lookup Routes', function () {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET Parents /lookup/parents/:id', async () => {
    const res = await request(app).get('/lookup/parents/65fc9426fc13ae5d6a50fa9c');
    expect(validUserEmail).toHaveBeenCalled();
    expect(lookupController.getParents).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
  });

  test('GET Children /lookup/children/:parentId', async () => {
    const res = await request(app).get('/lookup/children/65fa5e1215cb7d3de3ff079a');
    expect(validUserEmail).toHaveBeenCalled();
    expect(lookupController.getChildren).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
  });

  test('GET Grandchildren /lookup/grandchildren/:grandparentId', async () => {
    const res = await request(app).get('/lookup/grandchildren/65fa5e1215cb7d3de3ff079a');
    expect(validUserEmail).toHaveBeenCalled();
    expect(lookupController.getGrandchildren).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
  });

  test('GET all birthdays /lookup/birthdays', async () => {
    const res = await request(app).get('/lookup/birthdays');
    expect(validUserEmail).toHaveBeenCalled();
    expect(lookupController.getBirthdays).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
  });

  test('GET birthdays formatted /lookup/birthdaysformatted', async () => {
    const res = await request(app).get('/lookup/birthdaysformatted');
    expect(validUserEmail).toHaveBeenCalled();
    expect(lookupController.getBirthdayFormatted).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
  });

  test('GET birthdays by month /lookup/birthdays/:month', async () => {
    const res = await request(app).get('/lookup/birthdays/6');
    expect(validUserEmail).toHaveBeenCalled();
    expect(lookupController.getBirthdaysByMonth).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
  });

  test('GET  mailing labels /lookup/mailinglabels', async () => {
    const res = await request(app).get('/lookup/mailinglabels');
    expect(validUserEmail).toHaveBeenCalled();
    expect(lookupController.getMailingLabels).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
  });
});
