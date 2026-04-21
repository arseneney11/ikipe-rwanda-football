import React from 'react';
import { api } from '../api';
import { useFetch } from '../hooks/useFetch';
import { PageHeader, Card, Loader, ErrorMsg, Badge } from '../components/UI';

export default function Transfers() {
  const { data: transfers, loading, error } = useFetch(api.getTransfers);

  const completed = transfers?.filter(t => t.status === 'completed') || [];
  const rumours = transfers?.filter(t => t.status === 'rumour') || [];

  return (
    <div className="animate-in">
      <PageHeader title="TRANSFER" accent="WINDOW" subtitle="Official transfers and rumours in the Rwanda Premier League" />

      {loading && <Loader />}
      {error && <ErrorMsg />}

      {transfers && (
        <>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginBottom: 28 }}>
            {[
              { label: 'Transfers Completed', value: completed.length, color: 'var(--accent)' },
              { label: 'Transfer Rumours', value: rumours.length, color: 'var(--gold)' },
              { label: 'Most Active Club', value: 'APR FC', color: 'var(--red)' },
            ].map(s => (
              <Card key={s.label} style={{ padding: '18px 20px' }}>
                <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: s.color }}>{s.value}</div>
              </Card>
            ))}
          </div>

          {/* Completed */}
          <h2 style={{ fontSize: 12, letterSpacing: 2, color: 'var(--text3)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>
            ✅ Confirmed Transfers
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            {completed.map(t => (
              <Card key={t.id} style={{ padding: '18px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{t.player}</div>
                    <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>{t.date}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4 }}>FROM</div>
                      <Badge color="var(--red)">{t.from}</Badge>
                    </div>
                    <div style={{ fontSize: 20, color: 'var(--text3)' }}>→</div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4 }}>TO</div>
                      <Badge color="var(--accent)">{t.to}</Badge>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4 }}>FEE</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--gold)', fontSize: 14 }}>{t.fee}</div>
                    <Badge color="var(--blue)" style={{ marginTop: 4 }}>{t.type}</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Rumours */}
          {rumours.length > 0 && (
            <>
              <h2 style={{ fontSize: 12, letterSpacing: 2, color: 'var(--text3)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>
                🔥 Transfer Rumours
              </h2>
              {rumours.map(t => (
                <Card key={t.id} style={{ padding: '18px 24px', border: '1px solid rgba(255,215,0,0.2)', background: 'rgba(255,215,0,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 24 }}>🔥</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 16 }}>{t.player}</div>
                      <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>Rumoured departure from {t.from}</div>
                    </div>
                    <Badge color="var(--gold)">RUMOUR</Badge>
                  </div>
                </Card>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}
