import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';

const nav = [
  { to: '/',          icon: '⚡', label: 'Dashboard' },
  { to: '/standings', icon: '🏆', label: 'Standings' },
  { to: '/matches',   icon: '⚽', label: 'Matches' },
  { to: '/teams',     icon: '🛡️',  label: 'Teams' },
  { to: '/players',   icon: '⭐', label: 'Players' },
  { to: '/transfers', icon: '🔄', label: 'Transfers' },
  { to: '/news',      icon: '📰', label: 'News' },
];

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
          zIndex: 40, display: 'none'
        }} className="mobile-overlay" />
      )}

      {/* Sidebar */}
      <aside style={{
        width: collapsed ? 68 : 220,
        minHeight: '100vh',
        background: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        transition: 'width 0.25s ease',
        position: 'sticky', top: 0, flexShrink: 0,
        zIndex: 50, overflow: 'hidden',
      }}>
        {/* Logo */}
        <div style={{
          padding: collapsed ? '20px 0' : '24px 20px',
          borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          gap: 10,
        }}>
          {!collapsed && (
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--accent)', letterSpacing: 2 }}>IKIPE</div>
              <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: 1.5, textTransform: 'uppercase' }}>Rwanda Football</div>
            </div>
          )}
          {collapsed && <span style={{ fontSize: 22 }}>⚽</span>}
          <button onClick={() => setCollapsed(!collapsed)} style={{
            color: 'var(--text3)', fontSize: 14, padding: 4,
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}
          >
            {collapsed ? '▶' : '◀'}
          </button>
        </div>

        {/* Season badge */}
        {!collapsed && (
          <div style={{ margin: '12px 16px', padding: '8px 12px', background: 'rgba(0,229,160,0.08)', border: '1px solid rgba(0,229,160,0.2)', borderRadius: 6 }}>
            <div style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: 1.5, fontWeight: 700 }}>SEASON 2024/25</div>
            <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 2 }}>Rwanda Premier League</div>
          </div>
        )}

        {/* Nav links */}
        <nav style={{ flex: 1, padding: '8px 0' }}>
          {nav.map(({ to, icon, label }) => (
            <NavLink key={to} to={to} end={to === '/'} style={({ isActive }) => ({
              display: 'flex', alignItems: 'center',
              gap: 12, padding: collapsed ? '14px 0' : '12px 20px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              color: isActive ? 'var(--accent)' : 'var(--text2)',
              background: isActive ? 'rgba(0,229,160,0.08)' : 'transparent',
              borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent',
              transition: 'all 0.2s',
              fontSize: 14, fontWeight: isActive ? 700 : 400,
              whiteSpace: 'nowrap',
            })}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div style={{ padding: 16, borderTop: '1px solid var(--border)' }}>
            <div style={{ fontSize: 10, color: 'var(--text3)', lineHeight: 1.8 }}>
              <div>IKIPI v1.0.0</div>
              <div>Rwanda Football Intelligence</div>
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <header style={{
          height: 56, background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center',
          padding: '0 24px', gap: 16,
          position: 'sticky', top: 0, zIndex: 30,
        }}>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div className="live-dot" />
            <span style={{ fontSize: 11, color: 'var(--text2)', letterSpacing: 1 }}>RPL LIVE</span>
          </div>
          <div style={{
            padding: '4px 12px',
            background: 'rgba(0,229,160,0.1)',
            border: '1px solid rgba(0,229,160,0.25)',
            borderRadius: 20,
            fontSize: 11, color: 'var(--accent)',
            fontWeight: 700, letterSpacing: 1,
          }}>
            MATCHDAY 28
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: '28px 28px', maxWidth: 1400 }}>
          <Outlet />
        </main>

        <footer style={{
          borderTop: '1px solid var(--border)',
          padding: '16px 28px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 12, color: 'var(--text3)',
        }}>
          <span>© 2025 IKIPE — Rwanda Football Intelligence Platform</span>
          <span>Powered by <span style={{ color: 'var(--accent)' }}>Node.js + React</span></span>
        </footer>
      </div>
    </div>
  );
}
