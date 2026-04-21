import React from 'react';

export function PageHeader({ title, subtitle, accent }) {
  return (
    <div style={{ marginBottom: 32 }} className="animate-in">
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 5vw, 52px)',
          letterSpacing: 2, color: 'var(--text)',
          lineHeight: 1,
        }}>{title}</h1>
        {accent && (
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(20px, 3vw, 32px)',
            color: 'var(--accent)', letterSpacing: 2,
          }}>{accent}</span>
        )}
      </div>
      {subtitle && (
        <p style={{ color: 'var(--text2)', marginTop: 8, fontSize: 14 }}>{subtitle}</p>
      )}
    </div>
  );
}

export function Card({ children, style = {}, onClick, hover = true }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        background: 'var(--surface)',
        border: `1px solid ${hovered ? 'var(--border2)' : 'var(--border)'}`,
        borderRadius: 12,
        transition: 'all 0.2s',
        transform: hovered && onClick ? 'translateY(-2px)' : 'none',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function StatCard({ label, value, sub, color = 'var(--accent)', icon }) {
  return (
    <Card style={{ padding: '20px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--text3)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>{label}</div>
          <div style={{ fontSize: 32, fontFamily: 'var(--font-display)', color, letterSpacing: 1, lineHeight: 1 }}>{value}</div>
          {sub && <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 6 }}>{sub}</div>}
        </div>
        {icon && <span style={{ fontSize: 28, opacity: 0.6 }}>{icon}</span>}
      </div>
    </Card>
  );
}

export function Loader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 60 }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        border: '3px solid var(--border)',
        borderTopColor: 'var(--accent)',
        animation: 'spin 0.8s linear infinite',
      }} />
    </div>
  );
}

export function ErrorMsg({ msg }) {
  return (
    <div style={{
      padding: 24, background: 'rgba(255,59,92,0.08)',
      border: '1px solid rgba(255,59,92,0.3)',
      borderRadius: 10, color: 'var(--red)', textAlign: 'center',
    }}>
      ⚠️ {msg || 'Failed to load data. Make sure the backend is running on port 4000.'}
    </div>
  );
}

export function Badge({ children, color = 'var(--accent)', bg }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 10px',
      borderRadius: 20,
      fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
      color,
      background: bg || `${color}18`,
      border: `1px solid ${color}30`,
    }}>
      {children}
    </span>
  );
}

export function FormBadges({ form = [] }) {
  const colors = { W: 'var(--accent)', D: 'var(--gold)', L: 'var(--red)' };
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {form.map((r, i) => (
        <div key={i} style={{
          width: 22, height: 22, borderRadius: 4,
          background: colors[r] || '#555',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 800, color: '#000',
        }}>{r}</div>
      ))}
    </div>
  );
}

export function SectionTitle({ children, action }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
      <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text2)' }}>
        {children}
      </h2>
      {action && (
        <a href={action.href} style={{ fontSize: 12, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 4 }}>
          {action.label} →
        </a>
      )}
    </div>
  );
}

export function Grid({ cols = 3, gap = 16, children, style = {} }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fill, minmax(${cols === 4 ? '220px' : cols === 2 ? '300px' : '260px'}, 1fr))`,
      gap,
      ...style,
    }}>
      {children}
    </div>
  );
}

export function SkeletonGrid({ count = 6, height = 160 }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
      {Array(count).fill(0).map((_, i) => (
        <div key={i} className="skeleton" style={{ height, borderRadius: 12 }} />
      ))}
    </div>
  );
}
