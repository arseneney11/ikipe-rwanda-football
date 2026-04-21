const request = require('supertest');
const app = require('../src/app');

describe('IKIPI API Tests', () => {

  test('GET /health returns healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
    expect(res.body.service).toBe('IKIPI Rwanda Football API');
  });

  test('GET / returns API info', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.endpoints).toBeInstanceOf(Array);
  });

  test('GET /api/teams returns all teams', async () => {
    const res = await request(app).get('/api/teams');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  test('GET /api/teams/1 returns APR FC', async () => {
    const res = await request(app).get('/api/teams/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe('APR FC');
  });

  test('GET /api/teams/999 returns 404', async () => {
    const res = await request(app).get('/api/teams/999');
    expect(res.statusCode).toBe(404);
  });

  test('GET /api/players returns players list', async () => {
    const res = await request(app).get('/api/players');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  test('GET /api/players/top-scorers returns sorted list', async () => {
    const res = await request(app).get('/api/players/top-scorers');
    expect(res.statusCode).toBe(200);
    const goals = res.body.data.map(p => p.goals);
    for (let i = 1; i < goals.length; i++) {
      expect(goals[i-1]).toBeGreaterThanOrEqual(goals[i]);
    }
  });

  test('GET /api/standings returns sorted standings', async () => {
    const res = await request(app).get('/api/standings');
    expect(res.statusCode).toBe(200);
    expect(res.body.data[0].position).toBe(1);
    const points = res.body.data.map(t => t.points);
    for (let i = 1; i < points.length; i++) {
      expect(points[i-1]).toBeGreaterThanOrEqual(points[i]);
    }
  });

  test('GET /api/matches returns matches', async () => {
    const res = await request(app).get('/api/matches');
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  test('GET /api/matches/upcoming returns upcoming matches', async () => {
    const res = await request(app).get('/api/matches/upcoming');
    expect(res.statusCode).toBe(200);
    res.body.data.forEach(m => expect(m.status).toBe('upcoming'));
  });

  test('GET /api/news returns news articles', async () => {
    const res = await request(app).get('/api/news');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  test('GET /api/stats returns season statistics', async () => {
    const res = await request(app).get('/api/stats');
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty('totalGoals');
    expect(res.body.data).toHaveProperty('topScorer');
  });

  test('GET /api/transfers returns transfer data', async () => {
    const res = await request(app).get('/api/transfers');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

});
