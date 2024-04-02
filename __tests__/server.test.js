const request = require('supertest');
const app = require('../server');

describe('Server', () => {
  it('should respond with 404 for unknown routes', async () => {
    const res = await request(app).get('/unknown-route');
    expect(res.status).toBe(404);
  });
});
