const { getAllAnniversaries } = require('../../controllers/anniversaryController');
const { Anniversary } = require('../../models/anniversaryModel');

jest.mock('../../models/anniversaryModel');

describe('getAllAnniversaries', () => {
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

  test('should return a list of all anniversary items in the database when successful', async () => {
    const anniversaryItems = [
      {
        _id: '65f1dccaa082e7bd594edca4',
        couple: ['65f1dc20a082e7bd594edca2', '65f601bc4abde303e77e19e4'],
        anniversaryDate: '2019-01-06T00:00:00.000Z'
      },
      {
        _id: '65f216aa17c8cc6b12754e60',
        couple: ['65f2162017c8cc6b12754e5e', '65f2166117c8cc6b12754e5f'],
        anniversaryDate: '2010-06-30T00:00:00.000Z'
      },
      {
        _id: '65f2334c919a40f06146bac0',
        couple: ['65ef767a878cf056c7d1d30f', '65ef74ae7c211814c571e01b'],
        anniversaryDate: '2020-05-30T00:00:00.000Z'
      }
    ];

    Anniversary.find.mockResolvedValue(anniversaryItems);

    await getAllAnniversaries(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(anniversaryItems);
  });

  test('should return an error when News.find fails', async () => {
    const errorMessage = 'Internal server error';

    Anniversary.find.mockRejectedValue(new Error(errorMessage));

    await getAllAnniversaries(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
