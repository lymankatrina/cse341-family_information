const { anniversaryValidator } = require('../../middleware/anniversaryValidator');

describe('anniversaryValidator', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: { couple: ['validId1', 'validId2'], anniversaryDate: '2020-06-30' } };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    next = jest.fn();
  });

  test('should call next if validation passes', async () => {
    const findByIdMock = jest.fn().mockResolvedValue(true);
    const originalFindById = require('../../models/individualModel').findById;
    require('../../models/individualModel').findById = findByIdMock;

    await anniversaryValidator(req, res, next);

    expect(findByIdMock).toHaveBeenCalledTimes(2); // Check that findById was called for each ID
    expect(next).toHaveBeenCalled();

    require('../../models/individualModel').findById = originalFindById; // Restore original findById
  });

  test('should send a validation error response if validation fails', async () => {
    const findByIdMock = jest.fn().mockResolvedValue(false);
    const originalFindById = require('../../models/individualModel').findById;
    require('../../models/individualModel').findById = findByIdMock;

    await anniversaryValidator(req, res, next);

    expect(findByIdMock).toHaveBeenCalledTimes(2); // Check that findById was called for each ID
    expect(res.status).toHaveBeenCalledWith(412);
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      message: 'Validation failed',
      data: { 'couple.*': ['validId1 does not exist', 'validId2 does not exist'] }
    });

    require('../../models/individualModel').findById = originalFindById; // Restore original findById
  });
});
