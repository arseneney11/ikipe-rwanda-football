const express = require('express');
const router = express.Router();
const { teams } = require('../data');

router.get('/', (req, res) => {
  res.json({ success: true, data: teams, total: teams.length });
});

router.get('/:id', (req, res) => {
  const team = teams.find(t => t.id === parseInt(req.params.id));
  if (!team) return res.status(404).json({ success: false, error: 'Team not found' });
  res.json({ success: true, data: team });
});

module.exports = router;
