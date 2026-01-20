import React from 'react';

function Header() {
    return (
        <header className="glass-panel" style={{
            padding: '20px',
            marginBottom: '30px',
            textAlign: 'center',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
            <h1 style={{
                color: 'var(--accent-color)',
                textShadow: '0 0 20px var(--accent-glow)',
                fontSize: '2.5rem'
            }}>
                CineSync
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '5px' }}>
                Synchronized Watchlist
            </p>
        </header>
    );
}

export default Header;
