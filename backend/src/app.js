require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const crypto = require('crypto');

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

// ============================================
// CHAPTER 11 — Serverless Event-Driven Workflow
// ============================================
const upload = multer({ storage: multer.memoryStorage() });

// Get pool from pg if DATABASE_URL exists
const { Pool } = require('pg');
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    })
  : null;

// STEP 2 & 3: Serverless function triggered by file upload event
app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Process the file — extract metadata
  const metadata = {
    filename: req.file.originalname,
    file_size: req.file.size,
    file_type: req.file.mimetype,
    processed_at: new Date().toISOString(),
    status: 'processed',
    file_hash: crypto.createHash('md5').update(req.file.buffer).digest('hex'),
    bucket: 'ikipi-uploads'
  };

  // STEP 4: Log to console — visible in Vercel logs dashboard
  console.log('[SERVERLESS FUNCTION TRIGGERED]', JSON.stringify(metadata));

  // Save metadata record to Supabase database
  try {
    if (pool) {
      await pool.query(
        `INSERT INTO upload_logs 
         (filename, file_size, file_type, processed_at, status, file_hash, bucket)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          metadata.filename,
          metadata.file_size,
          metadata.file_type,
          metadata.processed_at,
          metadata.status,
          metadata.file_hash,
          metadata.bucket
        ]
      );
      console.log('[DB RECORD SAVED] Upload metadata stored in Supabase');
    }
  } catch (err) {
    console.error('[DB ERROR]', err.message);
  }

  res.json({
    success: true,
    message: 'File processed by serverless function',
    metadata
  });
});

// View all upload logs
app.get('/api/upload/logs', async (req, res) => {
  try {
    if (pool) {
      const result = await pool.query(
        'SELECT * FROM upload_logs ORDER BY processed_at DESC'
      );
      return res.json({ success: true, data: result.rows });
    }
    res.json({ success: true, data: [], message: 'No database connected' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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