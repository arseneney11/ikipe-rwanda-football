import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import { useFetch } from '../hooks/useFetch';
import { Card, Loader, ErrorMsg, Badge, StatCard } from '../components/UI';

export default function TeamDetail() {
  const { id } = useParams();
  const { data: team, loading, error } = useFetch(() => api.getTeam(id), [id]);
  const { data: players } = useFetch(() => api.getPlayers(`?team=${id}`), [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMsg />;
  if (!team) return null;

  return (
    <div className="animate-in">
      <Link to="/teams" style={{ fontSize: 13, color: 'var(--text3)', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
        ← Back to Teams
      </Link>

      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${team.primaryColor}22 0%, var(--surface) 60%)`,
        border: '1px solid var(--border)',
        borderRadius: 16, padding: '36px 40px', marginBottom: 28,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 72 }}>{team.logo}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: 'var(--text3)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>Rwanda Premier League</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 5vw, 52px)', letterSpacing: 2, lineHeight: 1 }}>{team.name}</h1>
            <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
              <Badge color="var(--gold)">{team.trophies} Trophies 🏆</Badge>
              <Badge color="var(--text2)">Est. {team.founded}</Badge>
              <Badge color="var(--accent)">📍 {team.city}</Badge>
            </div>
            <p style={{ color: 'var(--text2)', marginTop: 12, fontSize: 14, maxWidth: 500 }}>{team.description}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 60, lineHeight: 1, color: 'var(--accent)' }}>{team.points}</div>
            <div style={{ fontSize: 12, color: 'var(--text2)', letterSpacing: 1 }}>POINTS</div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginBottom: 28 }}>
        <StatCard label="Wins" value={team.wins} color="var(--accent)" />
        <StatCard label="Draws" value={team.draws} color="var(--gold)" />
        <StatCard label="Losses" value={team.losses} color="var(--red)" />
        <StatCard label="Goals For" value={team.goalsFor} color="var(--blue)" />
        <StatCard label="Goals Against" value={team.goalsAgainst} color="var(--text2)" />
        <StatCard label="Goal Diff" value={`${team.goalsFor - team.goalsAgainst > 0 ? '+' : ''}${team.goalsFor - team.goalsAgainst}`} color={team.goalsFor - team.goalsAgainst >= 0 ? 'var(--accent)' : 'var(--red)'} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Info */}
        <Card style={{ padding: 24 }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 16 }}>Club Info</h3>
          {[
            ['Head Coach', team.coach, '👨‍💼'],
            ['Stadium', team.stadium, '🏟️'],
            ['City', team.city, '📍'],
            ['Founded', team.founded, '📅'],
          ].map(([label, val, icon]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text3)', fontSize: 13 }}>{icon} {label}</span>
              <span style={{ fontWeight: 600, fontSize: 13 }}>{val}</span>
            </div>
          ))}
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--text3)', letterSpacing: 1, marginBottom: 8 }}>RECENT FORM</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {team.form.map((r, i) => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: 8, background: r === 'W' ? 'var(--accent)' : r === 'D' ? 'var(--gold)' : 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 800, fontSize: 14 }}>{r}</div>
              ))}
            </div>
          </div>
        </Card>

        {/* Players */}
        <Card style={{ padding: 24 }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 16 }}>Squad</h3>
          {players ? players.map(p => (
            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>{p.nationality} · Age {p.age}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Badge color={p.position === 'FW' ? 'var(--red)' : p.position === 'MF' ? 'var(--gold)' : p.position === 'DF' ? 'var(--blue)' : 'var(--text2)'}>{p.position}</Badge>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>⚽ {p.goals} · ⭐ {p.rating}</div>
              </div>
            </div>
          )) : <div style={{ color: 'var(--text3)', fontSize: 13 }}>Loading squad...</div>}
        </Card>
      </div>
    </div>
  );
}
