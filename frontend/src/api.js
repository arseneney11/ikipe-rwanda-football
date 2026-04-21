const BASE = import.meta.env.VITE_API_URL || '/api';

async function fetchAPI(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  return data.data ?? data;
}

export const api = {
  getTeams:       ()   => fetchAPI('/teams'),
  getTeam:        (id) => fetchAPI(`/teams/${id}`),
  getPlayers:     (params = '') => fetchAPI(`/players${params}`),
  getTopScorers:  ()   => fetchAPI('/players/top-scorers'),
  getMatches:     (params = '') => fetchAPI(`/matches${params}`),
  getUpcoming:    ()   => fetchAPI('/matches/upcoming'),
  getRecent:      ()   => fetchAPI('/matches/recent'),
  getStandings:   ()   => fetchAPI('/standings'),
  getStats:       ()   => fetchAPI('/stats'),
  getNews:        (params = '') => fetchAPI(`/news${params}`),
  getTransfers:   ()   => fetchAPI('/transfers'),
};
