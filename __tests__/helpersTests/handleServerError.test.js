const { handleServerError } = require('../../helpers/helpers');

describe('Handle Server Error', () => {
  let consoleErrorSpy;
  let res;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('It should handle server error and return 500 status with error message', () => {
    const error = new Error('Test error message');

    handleServerError(res, error);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error:', error);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });
});