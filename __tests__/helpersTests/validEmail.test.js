const { validEmail } = require('../../middleware/permissionMiddleware');

const mockRequest = (email) => ({
  oidc: { user: { email } }
});

// Mock the getAllEmails function
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
    console.log('Result:', result);
    expect(result).toBe(true);
  });
});
