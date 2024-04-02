const { getHouseholds } = require('../../controllers/householdController');
const { Household } = require('../../models/householdModel');
const { expectedResults } = require('./householdExpectedOutcome.json');

jest.mock('../../models/householdModel');

describe('getHouseholds', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns all households', async () => {
    Household.find.mockResolvedValue(expectedResults);

    await getHouseholds(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResults);
  });

  test('returns an error when get all households fails', async () => {
    const errorMessage = 'Server error';

    Household.find.mockRejectedValue(new Error(errorMessage));

    await getHouseholds(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
