import React from 'react';

function MovieCard({ movie, onClick }) {
    return (
        <div
            className="glass-panel fade-in"
            onClick={() => onClick(movie)}
            style={{
                width: '180px',
                flexShrink: 0,
                cursor: 'pointer',
                overflow: 'hidden',
                position: 'relative',
                transition: 'transform 0.2s ease',
                display: 'flex',
                flexDirection: 'column'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            <div style={{ position: 'relative', height: '270px' }}>
                <img
                    src={movie.poster || 'https://via.placeholder.com/200x300?text=No+Poster'}
                    alt={movie.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {movie.watched && (
                    <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'var(--success-color)',
                        color: 'white',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
                    }}>✓</div>
                )}
            </div>

            <div style={{ padding: '12px' }}>
                <h3 style={{
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginBottom: '5px'
                }}>
                    {movie.title}
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <span>{movie.year}</span>
                    <span>{movie.rating ? `⭐ ${movie.rating}` : ''}</span>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
