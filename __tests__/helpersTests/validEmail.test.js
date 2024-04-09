const { validEmail } = require('../../middleware/permissionMiddleware');

const mockRequest = (email) => ({
  oidc: { user: { email } }
});

jest.mock('../../controllers/individualController', () => ({
  getAllEmails: jest
    .fn()
    .mockResolvedValue([
      { email: 'test1@example.com' },
      { email: 'test2@example.com' },
      { email: 'invaid@example.com' }
    ])
}));

describe('validEmail middleware', () => {
  test('returns true for valid user email', async () => {
    const req = mockRequest('test1@example.com');
    const result = await validEmail(req);
    expect(result).toBe(true);
  });
});
