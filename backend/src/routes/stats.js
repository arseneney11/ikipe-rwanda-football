// stats.js
const express = require('express');
const router = express.Router();
const { teams, players, matches } = require('../data');

router.get('/', (req, res) => {
  const completedMatches = matches.filter(m => m.status === 'completed');
  const totalGoals = completedMatches.reduce((sum, m) => sum + (m.homeScore || 0) + (m.awayScore || 0), 0);
  const topScorer = [...players].sort((a, b) => b.goals - a.goals)[0];
  const topAssist = [...players].sort((a, b) => b.assists - a.assists)[0];
  const topRated = [...players].sort((a, b) => b.rating - a.rating)[0];

  res.json({
    success: true,
    data: {
      season: '2024/2025',
      matchesPlayed: completedMatches.length,
      totalGoals,
      avgGoalsPerGame: (totalGoals / completedMatches.length).toFixed(2),
      topScorer: { name: topScorer.name, team: topScorer.team, goals: topScorer.goals },
      topAssist: { name: topAssist.name, team: topAssist.team, assists: topAssist.assists },
      topRated: { name: topRated.name, team: topRated.team, rating: topRated.rating },
      totalTeams: teams.length,
      totalPlayers: players.length,
      highestAttendance: { match: 'APR FC vs Police FC', attendance: 18000, date: '2025-04-19' }
    }
  });
});

module.exports = router;
