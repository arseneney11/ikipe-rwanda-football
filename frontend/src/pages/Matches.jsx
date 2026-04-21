import React, { useState } from 'react';
import { api } from '../api';
import { useFetch } from '../hooks/useFetch';
import { PageHeader, Card, Loader, ErrorMsg, Badge } from '../components/UI';

export default function Matches() {
  const [tab, setTab] = useState('all');
  const { data: matches, loading, error } = useFetch(api.getMatches);

  const filtered = matches
    ? tab === 'all' ? matches
      : matches.filter(m => m.status === tab)
    : [];

  return (
    <div className="animate-in">
      <PageHeader title="FIXTURES" accent="& RESULTS" subtitle="Rwanda Premier League 2024/25 match schedule and results" />

      <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
        {[['all', 'All Matches'], ['completed', 'Results'], ['upcoming', 'Upcoming']].map(([val, label]) => (
          <button key={val} onClick={() => setTab(val)} style={{
            padding: '8px 18px', borderRadius: 8,
            border: `1px solid ${tab === val ? 'var(--accent)' : 'var(--border)'}`,
            background: tab === val ? 'rgba(0,229,160,0.12)' : 'transparent',
            color: tab === val ? 'var(--accent)' : 'var(--text2)',
            fontSize: 13, fontWeight: 600, transition: 'all 0.15s',
          }}>{label}</button>
        ))}
      </div>

      {loading && <Loader />}
      {error && <ErrorMsg />}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(match => (
          <Card key={match.id} style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <Badge color={match.competition.includes('Cup') ? 'var(--gold)' : 'var(--blue)'}>{match.competition}</Badge>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>
                <span>📅 {match.date}</span>
                {match.attendance && <span>👥 {match.attendance.toLocaleString()}</span>}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ flex: 1, textAlign: 'right' }}>
                <div style={{ fontSize: 18, fontWeight: 800 }}>{match.homeTeam}</div>
                <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>HOME</div>
              </div>

              <div style={{
                minWidth: 110, textAlign: 'center',
                padding: '14px 20px',
                background: match.status === 'completed' ? 'rgba(0,229,160,0.08)' : 'var(--surface2)',
                border: `1px solid ${match.status === 'completed' ? 'rgba(0,229,160,0.25)' : 'var(--border)'}`,
                borderRadius: 10,
              }}>
                {match.status === 'completed'
                  ? <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, letterSpacing: 3, color: 'var(--text)' }}>{match.homeScore} — {match.awayScore}</div>
                  : <>
                      <div style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 700, letterSpacing: 1 }}>KICKOFF</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text)', marginTop: 2, letterSpacing: 1 }}>TBD</div>
                    </>
                }
              </div>

              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontSize: 18, fontWeight: 800 }}>{match.awayTeam}</div>
                <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>AWAY</div>
              </div>
            </div>

            {match.scorers && match.scorers.length > 0 && (
              <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                {match.scorers.map((s, i) => (
                  <span key={i} style={{ fontSize: 12, color: 'var(--text2)', background: 'var(--surface2)', padding: '3px 10px', borderRadius: 20, border: '1px solid var(--border)' }}>
                    ⚽ {s}
                  </span>
                ))}
              </div>
            )}

            <div style={{ marginTop: 10, fontSize: 11, color: 'var(--text3)', textAlign: 'center' }}>
              🏟️ {match.stadium}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
