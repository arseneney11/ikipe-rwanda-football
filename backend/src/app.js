require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use(limiter);

// Routes
app.use('/api/teams', require('./routes/teams'));
app.use('/api/players', require('./routes/players'));
app.use('/api/matches', require('./routes/matches'));
app.use('/api/standings', require('./routes/standings'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/news', require('./routes/news'));
app.use('/api/transfers', require('./routes/transfers'));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'IKIPI Rwanda Football API',
    version: '1.0.0',
    uptime: process.uptime(),
    deployed_on: process.env.PLATFORM || 'local'
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'IKIPI - Rwanda Football Intelligence Platform',
    description: 'The premier data platform for Rwandan football',
    endpoints: ['/api/teams', '/api/players', '/api/matches', '/api/standings', '/api/stats', '/api/news', '/api/transfers'],
    status: 'ok'
  });
});

// 404
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`🏆 IKIPI API running on port ${PORT}`));
}

module.exports = app;
