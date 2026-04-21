// matches.js
const express = require('express');
const router = express.Router();
const { matches } = require('../data');

router.get('/', (req, res) => {
  const { status, competition } = req.query;
  let result = [...matches];
  if (status) result = result.filter(m => m.status === status);
  if (competition) result = result.filter(m => m.competition.toLowerCase().includes(competition.toLowerCase()));
  result.sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json({ success: true, data: result, total: result.length });
});

router.get('/upcoming', (req, res) => {
  const upcoming = matches.filter(m => m.status === 'upcoming').sort((a, b) => new Date(a.date) - new Date(b.date));
  res.json({ success: true, data: upcoming });
});

router.get('/recent', (req, res) => {
  const recent = matches.filter(m => m.status === 'completed').sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
  res.json({ success: true, data: recent });
});

router.get('/:id', (req, res) => {
  const match = matches.find(m => m.id === parseInt(req.params.id));
  if (!match) return res.status(404).json({ success: false, error: 'Match not found' });
  res.json({ success: true, data: match });
});

module.exports = router;
