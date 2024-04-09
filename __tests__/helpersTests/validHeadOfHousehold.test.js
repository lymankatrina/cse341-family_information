const { validHeadOfHousehold } = require('../../middleware/permissionMiddleware');

jest.mock('../../controllers/individualController', () => ({
  getUserByEmail: jest.fn()
}));

describe('validHeadOfHousehold middleware', () => {
  test('allows access for valid head of household', async () => {
    const req = {
      oidc: {
        user: { email: 'test@example.com' }
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();
    const { getUserByEmail } = require('../../controllers/individualController');
    getUserByEmail.mockResolvedValue({ headOfHousehold: true });
    await validHeadOfHousehold(req, res, next);
    expect(getUserByEmail).toHaveBeenCalledWith('test@example.com');
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  test('should respond with 403 if user is not head of household', async () => {
    const req = {
      oidc: {
        user: { email: 'test@example.com' }
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();
    const { getUserByEmail } = require('../../controllers/individualController');
    getUserByEmail.mockResolvedValue({ headOfHousehold: false });
    await validHeadOfHousehold(req, res, next);
    expect(getUserByEmail).toHaveBeenCalledWith('test@example.com');
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith('Access denied');
  });
});
