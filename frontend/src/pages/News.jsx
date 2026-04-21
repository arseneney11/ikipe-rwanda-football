import React, { useState } from 'react';
import { api } from '../api';
import { useFetch } from '../hooks/useFetch';
import { PageHeader, Card, Loader, ErrorMsg, Badge } from '../components/UI';

const categories = ['All', 'Breaking News', 'Transfer News', 'National Team', 'Infrastructure', 'Player News', 'Community'];
const catColors = {
  'Breaking News': 'var(--red)', 'Transfer News': 'var(--gold)',
  'National Team': 'var(--blue)', 'Infrastructure': 'var(--text2)',
  'Player News': 'var(--accent)', 'Community': '#a78bfa',
};

export default function News() {
  const [cat, setCat] = useState('All');
  const { data: news, loading, error } = useFetch(api.getNews);

  const filtered = news
    ? cat === 'All' ? news : news.filter(n => n.category === cat)
    : [];

  return (
    <div className="animate-in">
      <PageHeader title="LATEST" accent="NEWS" subtitle="Breaking stories, transfers and analysis from Rwandan football" />

      <div style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
        {categories.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            padding: '6px 14px', borderRadius: 20,
            border: `1px solid ${cat === c ? (catColors[c] || 'var(--accent)') : 'var(--border)'}`,
            background: cat === c ? `${(catColors[c] || '#00E5A0')}18` : 'transparent',
            color: cat === c ? (catColors[c] || 'var(--accent)') : 'var(--text2)',
            fontSize: 12, fontWeight: 600, transition: 'all 0.15s',
          }}>{c}</button>
        ))}
      </div>

      {loading && <Loader />}
      {error && <ErrorMsg />}

      {/* Featured article */}
      {filtered.length > 0 && filtered[0].featured && (
        <Card style={{
          padding: '32px',
          marginBottom: 20,
          background: 'linear-gradient(135deg, var(--surface2) 0%, var(--surface) 100%)',
          border: '1px solid var(--border2)',
        }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'center' }}>
            <Badge color={catColors[filtered[0].category] || 'var(--accent)'}>{filtered[0].category}</Badge>
            <span style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 700 }}>★ FEATURED STORY</span>
          </div>
          <h2 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 800, lineHeight: 1.3, marginBottom: 12 }}>{filtered[0].title}</h2>
          <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{filtered[0].summary}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text3)' }}>
            <span>By {filtered[0].author}</span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>{filtered[0].date} · {filtered[0].readTime} read</span>
          </div>
        </Card>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {filtered.slice(filtered[0]?.featured ? 1 : 0).map(article => (
          <Card key={article.id} style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }} hover>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Badge color={catColors[article.category] || 'var(--accent)'}>{article.category}</Badge>
              {article.featured && <span style={{ fontSize: 10, color: 'var(--gold)', fontWeight: 700 }}>★</span>}
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.4 }}>{article.title}</h3>
            <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6, flex: 1 }}>{article.summary.slice(0, 130)}…</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text3)', paddingTop: 10, borderTop: '1px solid var(--border)', marginTop: 4 }}>
              <span>{article.author}</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{article.date} · {article.readTime}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
