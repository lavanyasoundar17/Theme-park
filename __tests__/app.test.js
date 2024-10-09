const request = require("supertest");
const app = require("../app.js");

describe('GET /api/healthcheck', () => {
    it('responds with 200 status code', () => {
      return request(app).get('/api/healthcheck');
    });
  });