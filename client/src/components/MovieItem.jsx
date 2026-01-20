import React from 'react';

function MovieItem({ movie, onToggle, onDelete }) {
    return (
        <div
            className="glass-panel fade-in"
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '15px 20px',
                marginBottom: '10px',
                opacity: movie.watched ? 0.6 : 1,
                transition: 'all 0.3s ease'
            }}
        >
            <div
                onClick={() => onToggle(movie.id)}
                style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textDecoration: movie.watched ? 'line-through' : 'none',
                    color: movie.watched ? 'var(--text-secondary)' : 'var(--text-primary)'
                }}
            >
                <span style={{
                    marginRight: '15px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: '2px solid ' + (movie.watched ? 'var(--success-color)' : 'var(--text-secondary)'),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: movie.watched ? 'var(--success-color)' : 'transparent',
                    color: 'white',
                    fontSize: '14px'
                }}>
                    {movie.watched && '✓'}
                </span>
                <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>
                    {movie.title}
                </span>
            </div>

            <button
                onClick={() => onDelete(movie.id)}
                style={{
                    background: 'transparent',
                    color: 'var(--danger-color)',
                    fontSize: '1.2rem',
                    padding: '5px',
                    opacity: 0.7
                }}
                onMouseOver={(e) => e.target.style.opacity = '1'}
                onMouseOut={(e) => e.target.style.opacity = '0.7'}
                title="Delete"
            >
                🗑️
            </button>
        </div>
    );
}

export default MovieItem;
