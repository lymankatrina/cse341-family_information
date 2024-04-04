const { newsValidator } = require('../../middleware/newsValidator');

describe('newsValidator', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      oidc: {
        user: {
          email: 'test@example.com'
        }
      },
      body: {
        newsTitle: 'Test Title',
        newsBody: 'Test Body',
        status: 'public',
        postedBy: 'test@example.com',
        dateCreated: '2022-04-10',
        picture: 'https://example.com/image.jpg'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call next if validation passes', async () => {
    await newsValidator(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  test('should return validation error if validation fails', async () => {
    const invalidReq = { ...req, body: { ...req.body, newsTitle: '' } };

    await newsValidator(invalidReq, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(412);
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      message: 'Validation failed',
      data: {
        errors: {
          newsTitle: ['The newsTitle field is required.']
        }
      }
    });
  });

  test('should return access denied error if postedBy does not match user email', async () => {
    req.body.postedBy = 'another@example.com';

    await newsValidator(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      message: 'Access denied. You can only create, update, or delete news stories that you posted.'
    });
  });
});
