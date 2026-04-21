const express = require('express');
const router = express.Router();
const { teams } = require('../data');

router.get('/', (req, res) => {
  const standings = teams.map(t => ({
    id: t.id, name: t.name, shortName: t.shortName, logo: t.logo,
    played: t.wins + t.draws + t.losses,
    wins: t.wins, draws: t.draws, losses: t.losses,
    goalsFor: t.goalsFor, goalsAgainst: t.goalsAgainst,
    goalDifference: t.goalsFor - t.goalsAgainst,
    points: t.points, form: t.form
  })).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
  }).map((t, i) => ({ ...t, position: i + 1 }));
  
  res.json({ success: true, data: standings, season: '2024/2025', competition: 'Rwanda Premier League' });
});

module.exports = router;
