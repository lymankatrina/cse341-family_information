const { newsAccessMiddleware } = require('../../middleware/permissionMiddleware');
const { News } = require('../../models/newsModel');

jest.mock('../../models/newsModel');

describe('newsAccessMiddleware', () => {
  test('should filter news items correctly for a valid user', async () => {
    const userEmail = 'test@example.com';
    const newsItem = { status: 'private', postedBy: userEmail };
    News.find.mockResolvedValue([newsItem]);

    const req = { oidc: { user: { email: userEmail } } };
    const res = {};
    const next = jest.fn();

    await newsAccessMiddleware(req, res, next);

    expect(req.filteredNews).toEqual([newsItem]);
    expect(next).toHaveBeenCalledTimes(1);
  });

  test('should handle errors and respond with 500 status', async () => {
    News.find.mockRejectedValue(new Error('Database error'));

    const req = { oidc: { user: { email: 'test@example.com' } } };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const next = jest.fn();

    await newsAccessMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      message: 'Internal server error'
    });
    expect(next).not.toHaveBeenCalled();
  });
});
