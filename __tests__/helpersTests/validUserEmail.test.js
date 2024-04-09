const { validUserEmail } = require('../../middleware/permissionMiddleware');

const mockRequest = (email) => ({
  oidc: { user: { email } }
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

jest.mock('../../controllers/individualController', () => ({
  getAllEmails: jest
    .fn()
    .mockResolvedValue([
      { email: 'test1@example.com' },
      { email: 'test2@example.com' },
      { email: 'invaid@example.com' }
    ])
}));

describe('validUserEmail middleware', () => {
  test('allows access for valid user email', async () => {
    const req = mockRequest('test1@example.com');
    const res = mockResponse();

    await validUserEmail(req, res, () => {});

    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  test('denies access for invalid user email', async () => {
    const req = mockRequest('invalid@example.com');
    const res = mockResponse();

    await validUserEmail(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith('Access denied.');
  });
});
