const express = require('express');
const router = express.Router();
const { players } = require('../data');

router.get('/', (req, res) => {
  const { team, position, sort } = req.query;
  let result = [...players];
  if (team) result = result.filter(p => p.teamId === parseInt(team));
  if (position) result = result.filter(p => p.position === position.toUpperCase());
  if (sort === 'goals') result.sort((a, b) => b.goals - a.goals);
  if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
  res.json({ success: true, data: result, total: result.length });
});

router.get('/top-scorers', (req, res) => {
  const topScorers = [...players].sort((a, b) => b.goals - a.goals).slice(0, 10);
  res.json({ success: true, data: topScorers });
});

router.get('/:id', (req, res) => {
  const player = players.find(p => p.id === parseInt(req.params.id));
  if (!player) return res.status(404).json({ success: false, error: 'Player not found' });
  res.json({ success: true, data: player });
});

module.exports = router;
