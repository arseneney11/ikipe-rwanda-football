import React from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useFetch } from '../hooks/useFetch';
import { PageHeader, StatCard, Card, SectionTitle, FormBadges, Loader, ErrorMsg, Badge, Grid } from '../components/UI';

function MatchCard({ match }) {
  const isUpcoming = match.status === 'upcoming';
  return (
    <Card style={{ padding: '16px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Badge color={isUpcoming ? 'var(--blue)' : 'var(--accent)'}>{match.competition}</Badge>
        <span style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>{match.date}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ flex: 1, textAlign: 'right' }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>{match.homeTeam}</div>
        </div>
        <div style={{
          textAlign: 'center', minWidth: 80,
          background: isUpcoming ? 'var(--surface2)' : 'rgba(0,229,160,0.1)',
          border: `1px solid ${isUpcoming ? 'var(--border)' : 'rgba(0,229,160,0.3)'}`,
          borderRadius: 8, padding: '8px 12px',
        }}>
          {isUpcoming
            ? <div style={{ fontSize: 12, color: 'var(--text3)', fontWeight: 600 }}>vs</div>
            : <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: 2, color: 'var(--text)' }}>
                {match.homeScore} — {match.awayScore}
              </div>
          }
        </div>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>{match.awayTeam}</div>
        </div>
      </div>
      {match.scorers && match.scorers.length > 0 && (
        <div style={{ marginTop: 10, fontSize: 11, color: 'var(--text3)', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
          ⚽ {match.scorers.join('  ·  ')}
        </div>
      )}
    </Card>
  );
}

function NewsCard({ article }) {
  const categoryColor = {
    'Breaking News': 'var(--red)',
    'Transfer News': 'var(--gold)',
    'National Team': 'var(--blue)',
    'Infrastructure': 'var(--text2)',
    'Player News': 'var(--accent)',
    'Community': '#a78bfa',
  }[article.category] || 'var(--accent)';

  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 10 }} hover>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <Badge color={categoryColor}>{article.category}</Badge>
        {article.featured && <span style={{ fontSize: 10, color: 'var(--gold)', fontWeight: 700, letterSpacing: 1 }}>★ FEATURED</span>}
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.4, color: 'var(--text)' }}>{article.title}</h3>
      <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6, flex: 1 }}>{article.summary.slice(0, 120)}…</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>
        <span>by {article.author}</span>
        <span style={{ fontFamily: 'var(--font-mono)' }}>{article.date} · {article.readTime}</span>
      </div>
    </Card>
  );
}

export default function Home() {
  const { data: stats, loading: sLoading, error: sError } = useFetch(api.getStats);
  const { data: matches, loading: mLoading } = useFetch(api.getRecent);
  const { data: upcoming, loading: uLoading } = useFetch(api.getUpcoming);
  const { data: news, loading: nLoading } = useFetch(() => api.getNews('?featured=true'));
  const { data: standings, loading: stLoading } = useFetch(api.getStandings);

  return (
    <div className="animate-in">
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, var(--surface) 0%, var(--bg3) 50%, var(--surface) 100%)',
        border: '1px solid var(--border)',
        borderRadius: 16, padding: '36px 40px', marginBottom: 32,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -40, right: -40,
          width: 200, height: 200,
          background: 'radial-gradient(circle, rgba(0,229,160,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          <div className="live-badge"><div className="live-dot" /><span>SEASON LIVE</span></div>
          <span style={{ fontSize: 12, color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>2024 / 2025</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 68px)', letterSpacing: 3, lineHeight: 1, color: 'var(--text)' }}>
          RWANDA PREMIER
        </h1>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 68px)', letterSpacing: 3, lineHeight: 1, color: 'var(--accent)' }}>
          LEAGUE
        </h1>
        <p style={{ color: 'var(--text2)', marginTop: 16, fontSize: 15, maxWidth: 500 }}>
          The definitive intelligence platform for Rwandan football. Live standings, player stats, transfer news and everything in between.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
          <Link to="/standings" style={{
            padding: '11px 24px', background: 'var(--accent)', color: '#000',
            borderRadius: 8, fontSize: 13, fontWeight: 700, letterSpacing: 1,
            transition: 'opacity 0.2s',
          }}>VIEW STANDINGS</Link>
          <Link to="/matches" style={{
            padding: '11px 24px', background: 'transparent',
            border: '1px solid var(--border2)', color: 'var(--text)',
            borderRadius: 8, fontSize: 13, fontWeight: 600, letterSpacing: 1,
          }}>ALL MATCHES</Link>
        </div>
      </div>

      {/* Season stats */}
      {sError && <ErrorMsg />}
      {sLoading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12, marginBottom: 32 }}>
          {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{ height: 100, borderRadius: 12 }} />)}
        </div>
      ) : stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12, marginBottom: 32 }}>
          <StatCard label="Matches Played" value={stats.matchesPlayed} icon="📊" />
          <StatCard label="Total Goals" value={stats.totalGoals} color="var(--gold)" icon="⚽" />
          <StatCard label="Avg Goals/Game" value={stats.avgGoalsPerGame} color="var(--blue)" icon="📈" />
          <StatCard label="Top Scorer" value={stats.topScorer?.name.split(' ').pop()} sub={`${stats.topScorer?.goals} goals · ${stats.topScorer?.team}`} color="var(--red)" icon="🥅" />
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        {/* Recent results */}
        <div>
          <SectionTitle action={{ label: 'All matches', href: '/matches' }}>Recent Results</SectionTitle>
          {mLoading ? <div className="skeleton" style={{ height: 300, borderRadius: 12 }} /> :
            matches?.slice(0, 4).map(m => <div key={m.id} style={{ marginBottom: 10 }}><MatchCard match={m} /></div>)
          }
        </div>

        {/* Upcoming */}
        <div>
          <SectionTitle action={{ label: 'Full schedule', href: '/matches' }}>Upcoming Fixtures</SectionTitle>
          {uLoading ? <div className="skeleton" style={{ height: 300, borderRadius: 12 }} /> :
            upcoming?.slice(0, 4).map(m => <div key={m.id} style={{ marginBottom: 10 }}><MatchCard match={m} /></div>)
          }
        </div>
      </div>

      {/* Mini standings */}
      <div style={{ marginBottom: 32 }}>
        <SectionTitle action={{ label: 'Full table', href: '/standings' }}>League Table — Top 5</SectionTitle>
        {stLoading ? <div className="skeleton" style={{ height: 200, borderRadius: 12 }} /> : standings && (
          <Card style={{ overflow: 'hidden' }}>
            {/* Table header */}
            <div style={{ display: 'grid', gridTemplateColumns: '36px 1fr 40px 40px 40px 40px 40px 80px', gap: 8, padding: '10px 20px', borderBottom: '1px solid var(--border)', fontSize: 11, color: 'var(--text3)', letterSpacing: 1, fontWeight: 700, textTransform: 'uppercase' }}>
              <div>#</div><div>Club</div><div style={{textAlign:'center'}}>P</div><div style={{textAlign:'center'}}>W</div><div style={{textAlign:'center'}}>D</div><div style={{textAlign:'center'}}>L</div><div style={{textAlign:'center'}}>GD</div><div style={{textAlign:'center'}}>Form</div>
            </div>
            {standings.slice(0, 5).map((team, i) => (
              <Link key={team.id} to={`/teams/${team.id}`} style={{
                display: 'grid',
                gridTemplateColumns: '36px 1fr 40px 40px 40px 40px 40px 80px',
                gap: 8, padding: '12px 20px',
                borderBottom: i < 4 ? '1px solid var(--border)' : 'none',
                alignItems: 'center',
                background: i === 0 ? 'rgba(0,229,160,0.04)' : 'transparent',
                transition: 'background 0.15s',
                cursor: 'pointer',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
                onMouseLeave={e => e.currentTarget.style.background = i === 0 ? 'rgba(0,229,160,0.04)' : 'transparent'}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: i === 0 ? 'var(--accent)' : 'var(--text3)', fontWeight: 700 }}>{team.position}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{team.logo}</span>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{team.name}</span>
                </div>
                <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text2)' }}>{team.played}</div>
                <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)' }}>{team.wins}</div>
                <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--gold)' }}>{team.draws}</div>
                <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--red)' }}>{team.losses}</div>
                <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 13, color: team.goalDifference >= 0 ? 'var(--accent)' : 'var(--red)' }}>{team.goalDifference > 0 ? '+' : ''}{team.goalDifference}</div>
                <div style={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  {team.form.slice(-5).map((r, j) => (
                    <div key={j} style={{ width: 16, height: 16, borderRadius: 3, background: r === 'W' ? 'var(--accent)' : r === 'D' ? 'var(--gold)' : 'var(--red)', fontSize: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 800 }}>{r}</div>
                  ))}
                </div>
              </Link>
            ))}
          </Card>
        )}
      </div>

      {/* Latest News */}
      <div>
        <SectionTitle action={{ label: 'All news', href: '/news' }}>Featured News</SectionTitle>
        {nLoading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 180, borderRadius: 12 }} />)}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {news?.slice(0, 3).map(a => <NewsCard key={a.id} article={a} />)}
          </div>
        )}
      </div>
    </div>
  );
}
