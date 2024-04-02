const { getBirthdays } = require('../../controllers/lookupController');
const Individual = require('../../models/individualModel');

jest.mock('../../models/individualModel', () => ({
  find: jest.fn().mockResolvedValue([
    {
      _id: '65ef74ae7c211814c571e01b',
      firstName: 'John',
      lastName: 'Doe',
      birthDate: '0988-01-01T00:00:00.000Z'
    },
    {
      _id: '65ef767a878cf056c7d1d30f',
      firstName: 'Jane',
      lastName: 'Doe',
      birthDate: '1950-07-16T00:00:00.000Z'
    }
  ])
}));

describe('getBirthdays', () => {
  test('should return a list of all Individuals first names, last names, birthdates, and id numbers when successful', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getBirthdays(req, res);

    expect(Individual.find).toHaveBeenCalledTimes(1);
  });
});
