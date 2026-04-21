import React from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useFetch } from '../hooks/useFetch';
import { PageHeader, Card, Loader, ErrorMsg, Badge, Grid } from '../components/UI';

export default function Teams() {
  const { data: teams, loading, error } = useFetch(api.getTeams);

  return (
    <div className="animate-in">
      <PageHeader title="CLUBS" accent={`— ${teams?.length || ''}`} subtitle="All teams competing in the Rwanda Premier League 2024/25" />
      {loading && <Loader />}
      {error && <ErrorMsg />}
      {teams && (
        <Grid cols={3}>
          {teams.map(team => (
            <Link key={team.id} to={`/teams/${team.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card style={{ padding: '24px', cursor: 'pointer', height: '100%' }} hover>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <span style={{ fontSize: 40 }}>{team.logo}</span>
                  <div style={{ textAlign: 'right' }}>
                    <Badge color="var(--gold)">{team.trophies} 🏆</Badge>
                    <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 6, fontFamily: 'var(--font-mono)' }}>est. {team.founded}</div>
                  </div>
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{team.name}</h2>
                <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, marginBottom: 8 }}>📍 {team.city}</div>
                <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 16 }}>{team.description.slice(0, 90)}…</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                  {[['W', team.wins, 'var(--accent)'], ['D', team.draws, 'var(--gold)'], ['L', team.losses, 'var(--red)']].map(([label, val, color]) => (
                    <div key={label} style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color, lineHeight: 1 }}>{val}</div>
                      <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: 1 }}>{label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 3 }}>
                    {team.form.map((r, i) => (
                      <div key={i} style={{ width: 18, height: 18, borderRadius: 4, background: r === 'W' ? 'var(--accent)' : r === 'D' ? 'var(--gold)' : 'var(--red)', fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 800 }}>{r}</div>
                    ))}
                  </div>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text)' }}>{team.points} <span style={{ fontSize: 11, color: 'var(--text3)' }}>pts</span></span>
                </div>
              </Card>
            </Link>
          ))}
        </Grid>
      )}
    </div>
  );
}
