import React from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useFetch } from '../hooks/useFetch';
import { PageHeader, Card, Loader, ErrorMsg } from '../components/UI';

export default function Standings() {
  const { data: standings, loading, error } = useFetch(api.getStandings);

  return (
    <div className="animate-in">
      <PageHeader title="LEAGUE" accent="TABLE" subtitle="Rwanda Premier League 2024/2025 — Matchday 28" />

      {loading && <Loader />}
      {error && <ErrorMsg />}
      {standings && (
        <>
          {/* Legend */}
          <div style={{ display: 'flex', gap: 20, marginBottom: 16, fontSize: 12, color: 'var(--text3)', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 12, height: 12, borderRadius: 2, background: 'rgba(0,229,160,0.3)' }} /><span>Champions League</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 12, height: 12, borderRadius: 2, background: 'rgba(0,102,255,0.3)' }} /><span>CAF Confederation Cup</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 12, height: 12, borderRadius: 2, background: 'rgba(255,59,92,0.3)' }} /><span>Relegation zone</span></div>
          </div>

          <Card style={{ overflow: 'hidden' }}>
            {/* Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '44px 1fr 50px 50px 50px 50px 60px 60px 50px 100px',
              gap: 8, padding: '12px 24px',
              background: 'var(--surface2)',
              borderBottom: '1px solid var(--border2)',
              fontSize: 11, color: 'var(--text3)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
            }}>
              <div>#</div>
              <div>Club</div>
              <div style={{textAlign:'center'}}>PL</div>
              <div style={{textAlign:'center'}}>W</div>
              <div style={{textAlign:'center'}}>D</div>
              <div style={{textAlign:'center'}}>L</div>
              <div style={{textAlign:'center'}}>GF</div>
              <div style={{textAlign:'center'}}>GA</div>
              <div style={{textAlign:'center'}}>GD</div>
              <div style={{textAlign:'center'}}>Form · Pts</div>
            </div>

            {standings.map((team, i) => {
              const rowBg = i === 0 ? 'rgba(0,229,160,0.06)'
                : i === 1 || i === 2 ? 'rgba(0,102,255,0.04)'
                : i >= standings.length - 2 ? 'rgba(255,59,92,0.04)'
                : 'transparent';
              const posColor = i === 0 ? 'var(--accent)'
                : i < 3 ? 'var(--blue)'
                : i >= standings.length - 2 ? 'var(--red)'
                : 'var(--text2)';

              return (
                <Link key={team.id} to={`/teams/${team.id}`} style={{
                  display: 'grid',
                  gridTemplateColumns: '44px 1fr 50px 50px 50px 50px 60px 60px 50px 100px',
                  gap: 8, padding: '14px 24px',
                  borderBottom: i < standings.length - 1 ? '1px solid var(--border)' : 'none',
                  alignItems: 'center',
                  background: rowBg,
                  transition: 'background 0.15s',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
                  onMouseLeave={e => e.currentTarget.style.background = rowBg}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: posColor, fontWeight: 800 }}>{team.position}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 22 }}>{team.logo}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{team.name}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text2)' }}>{team.played}</div>
                  <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)', fontWeight: 700 }}>{team.wins}</div>
                  <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--gold)' }}>{team.draws}</div>
                  <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--red)' }}>{team.losses}</div>
                  <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{team.goalsFor}</div>
                  <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{team.goalsAgainst}</div>
                  <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 13, color: team.goalDifference >= 0 ? 'var(--accent)' : 'var(--red)', fontWeight: 700 }}>
                    {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {team.form.slice(-5).map((r, j) => (
                        <div key={j} style={{ width: 14, height: 14, borderRadius: 3, background: r === 'W' ? 'var(--accent)' : r === 'D' ? 'var(--gold)' : 'var(--red)', fontSize: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 800 }}>{r}</div>
                      ))}
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 15, color: 'var(--text)' }}>{team.points}</span>
                  </div>
                </Link>
              );
            })}
          </Card>
        </>
      )}
    </div>
  );
}
