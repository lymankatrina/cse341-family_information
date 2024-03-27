// individualController.test.js

const { getAllIndividuals, getSingleIndividual } = require('../controllers/individualController');
const Individual = require('../models/individualModel');

// Mocking Individual model
jest.mock('../models/individualModel');


// --------------------TEST FOR RETRIEVING ALL INDIVIDUALS---------------------------------- 

describe('getAllIndividuals', () => {
  it('should return all individuals', async () => {
    const mockIndividuals = [{ name: 'John' }, { name: 'Jane' }];
    Individual.find.mockResolvedValue(mockIndividuals);

    const mockRequest = {};
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAllIndividuals(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockIndividuals);
  });

  it('should handle errors', async () => {
    const mockError = new Error('Database error');
    Individual.find.mockRejectedValue(mockError);

    const mockRequest = {};
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAllIndividuals(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: mockError.message });
  });
});

// -------------------- __tests__/individualController.test.js ------------------------------------------------

describe('getSingleIndividual', () => {
  it('should return an individual by id', async () => {
    // Mock data for the individual
    const mockIndividual = {
      _id: '65f601bc4abde303e77e19e4',
      firstName: 'John',
      middleName: 'Jacob',
      lastName: 'Jingleheimer',
      birthDate : '1974-06-28T00:00:00.000+00:00',
      parents : Array (1),
      phone : '123-456-7890',
      email : 'jjjingle@gmail.com',
      household: "65f5f796a5c2c0bc7cd8cbaf",
      headOfHousehold: true,
      picture: 'https://fakeimg.pl/600x400?text=John+Jingleheimer'
      
    };
    // Mock the findById method of Individual model
    Individual.findById.mockResolvedValue(mockIndividual);

    // Mock request object with id parameter
    const mockRequest = { params: { id: '65f601bc4abde303e77e19e4' } };
    // Mock response object with status and json methods
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the getSingleIndividual function with mock request and response
    await getSingleIndividual(mockRequest, mockResponse);

    // Assert that the status and json methods were called with the correct arguments
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockIndividual);
  });

  it('should handle invalid id', async () => {
    // Mock request object with invalid id parameter
    const mockRequest = { params: { id: 'invalid_id' } };
    // Mock response object with status and json methods
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the getSingleIndividual function with mock request and response
    await getSingleIndividual(mockRequest, mockResponse);

    // Assert that the status and json methods were called with the correct arguments
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith('Must use a valid individual id to find an individual.');
  });

  it('should handle errors', async () => {
    // Mock error object
    const mockError = new Error('Database error');
    // Mock the findById method of Individual model to reject with the error
    Individual.findById.mockRejectedValue(mockError);

    // Mock request object with id parameter
    const mockRequest = { params: { id: '65f601bc4abde303e77e19e4' } };
    // Mock response object with status and json methods
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the getSingleIndividual function with mock request and response
    await getSingleIndividual(mockRequest, mockResponse);

    // Assert that the status and json methods were called with the correct arguments
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: mockError.message });
  });
});
