import React, { useState } from 'react';
import { api } from '../api';
import { useFetch } from '../hooks/useFetch';
import { PageHeader, Card, Loader, ErrorMsg, Badge } from '../components/UI';

const positions = ['All', 'FW', 'MF', 'DF', 'GK'];
const posColor = { FW: 'var(--red)', MF: 'var(--gold)', DF: 'var(--blue)', GK: 'var(--text2)' };

export default function Players() {
  const [posFilter, setPosFilter] = useState('All');
  const [sortBy, setSortBy] = useState('goals');
  const { data: players, loading, error } = useFetch(api.getPlayers);

  const filtered = players
    ? players
        .filter(p => posFilter === 'All' || p.position === posFilter)
        .sort((a, b) => b[sortBy] - a[sortBy])
    : [];

  return (
    <div className="animate-in">
      <PageHeader title="PLAYERS" accent={`— ${players?.length || ''}`} subtitle="Player ratings, statistics and market values for RPL 2024/25" />

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {positions.map(pos => (
            <button key={pos} onClick={() => setPosFilter(pos)} style={{
              padding: '6px 14px', borderRadius: 20,
              border: `1px solid ${posFilter === pos ? 'var(--accent)' : 'var(--border)'}`,
              background: posFilter === pos ? 'rgba(0,229,160,0.12)' : 'transparent',
              color: posFilter === pos ? 'var(--accent)' : 'var(--text2)',
              fontSize: 12, fontWeight: 600, transition: 'all 0.15s',
            }}>{pos}</button>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {['goals', 'assists', 'rating'].map(s => (
            <button key={s} onClick={() => setSortBy(s)} style={{
              padding: '6px 14px', borderRadius: 20,
              border: `1px solid ${sortBy === s ? 'var(--gold)' : 'var(--border)'}`,
              background: sortBy === s ? 'rgba(255,215,0,0.1)' : 'transparent',
              color: sortBy === s ? 'var(--gold)' : 'var(--text2)',
              fontSize: 12, fontWeight: 600, textTransform: 'capitalize', transition: 'all 0.15s',
            }}>Sort: {s}</button>
          ))}
        </div>
      </div>

      {loading && <Loader />}
      {error && <ErrorMsg />}

      {/* Top scorer highlight */}
      {!loading && filtered.length > 0 && sortBy === 'goals' && posFilter === 'All' && (
        <div style={{ marginBottom: 24 }}>
          <Card style={{
            padding: '24px 32px',
            background: 'linear-gradient(135deg, rgba(255,215,0,0.08) 0%, var(--surface) 100%)',
            border: '1px solid rgba(255,215,0,0.25)',
            display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap'
          }}>
            <div style={{ fontSize: 48 }}>👑</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, letterSpacing: 2, color: 'var(--gold)', fontWeight: 700, marginBottom: 4 }}>TOP SCORER — SEASON 2024/25</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, letterSpacing: 1, color: 'var(--text)' }}>{filtered[0]?.name}</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', marginTop: 4 }}>{filtered[0]?.team} · {filtered[0]?.nationality} · Age {filtered[0]?.age}</div>
            </div>
            <div style={{ display: 'flex', gap: 32 }}>
              {[['Goals', filtered[0]?.goals, 'var(--red)'], ['Assists', filtered[0]?.assists, 'var(--accent)'], ['Rating', filtered[0]?.rating, 'var(--gold)']].map(([l, v, c]) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: c, lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)', letterSpacing: 1 }}>{l}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Players grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {filtered.map((player, i) => (
          <Card key={player.id} style={{ padding: 20 }} hover>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: 1, marginBottom: 4 }}>#{i + 1}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700 }}>{player.name}</h3>
                <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 3 }}>{player.team}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Badge color={posColor[player.position] || 'var(--text2)'}>{player.position}</Badge>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 6, fontFamily: 'var(--font-mono)' }}>⭐ {player.rating}</div>
              </div>
            </div>

            <p style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 14, lineHeight: 1.5 }}>{player.bio}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, paddingTop: 12, borderTop: '1px solid var(--border)', textAlign: 'center' }}>
              {[['⚽ Goals', player.goals, 'var(--red)'], ['🎯 Assists', player.assists, 'var(--accent)'], ['🏳️ Caps', player.caps, 'var(--blue)']].map(([label, val, color]) => (
                <div key={label}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color, lineHeight: 1 }}>{val}</div>
                  <div style={{ fontSize: 9, color: 'var(--text3)', letterSpacing: 0.5, marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
              <span style={{ color: 'var(--text3)' }}>{player.nationality} · Age {player.age}</span>
              <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{player.marketValue}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
