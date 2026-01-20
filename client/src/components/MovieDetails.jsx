import React from 'react';

// Simple helper to extract youtube ID
const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

function MovieDetails({ movie, onClose, onDelete, onToggle }) {
    if (!movie) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.9)',
            backdropFilter: 'blur(8px)',
            zIndex: 1100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
        }} onClick={onClose}>
            <div
                className="glass-panel fade-in"
                style={{
                    width: '100%',
                    maxWidth: '900px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    position: 'relative',
                    padding: 0,
                    background: 'var(--bg-color)',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Backdrop Banner */}
                <div style={{
                    height: '300px',
                    background: `url(${movie.backdrop || movie.poster}) center/cover no-repeat`,
                    position: 'relative'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'linear-gradient(to bottom, transparent 0%, var(--bg-color) 100%)'
                    }}></div>
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            fontSize: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        ×
                    </button>
                </div>

                <div style={{ padding: '30px', marginTop: '-80px', position: 'relative' }}>
                    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                        {/* Poster - Floats over banner */}
                        <img
                            src={movie.poster}
                            alt={movie.title}
                            style={{
                                width: '200px',
                                borderRadius: '12px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                                border: '2px solid rgba(255,255,255,0.1)'
                            }}
                        />

                        <div style={{ flex: 1, minWidth: '300px' }}>
                            <h1 style={{ fontSize: '3rem', lineHeight: 1.1, marginBottom: '10px' }}>{movie.title}</h1>

                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '20px', color: 'var(--text-secondary)' }}>
                                <span>{movie.year}</span>
                                {movie.rating && <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px', color: '#fbbf24' }}>★ {movie.rating}</span>}
                                {movie.isApi && <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>API Source</span>}
                            </div>

                            {/* Actions */}
                            <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
                                <button
                                    onClick={() => { onToggle(movie.id); }}
                                    style={{
                                        flex: 1,
                                        padding: '12px',
                                        borderRadius: '8px',
                                        background: movie.watched ? 'var(--success-color)' : 'var(--text-primary)',
                                        color: movie.watched ? 'white' : 'var(--bg-color)',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {movie.watched ? '✓ Watched' : '+ Mark as Watched'}
                                </button>
                                <button
                                    onClick={() => { onDelete(movie.id); onClose(); }}
                                    style={{
                                        padding: '12px 20px',
                                        borderRadius: '8px',
                                        background: 'rgba(239, 68, 68, 0.2)',
                                        color: 'var(--danger-color)',
                                        border: '1px solid var(--danger-color)'
                                    }}
                                >
                                    Remove
                                </button>
                            </div>

                            <p style={{ lineHeight: 1.6, fontSize: '1.1rem', marginBottom: '20px' }}>
                                {movie.overview}
                            </p>

                            {movie.cast && movie.cast.length > 0 && (
                                <div style={{ marginBottom: '20px' }}>
                                    <h3 style={{ marginBottom: '10px', color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Cast</h3>
                                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                        {movie.cast.map(actor => (
                                            <span key={actor} style={{ background: 'rgba(255,255,255,0.05)', padding: '5px 10px', borderRadius: '20px', fontSize: '0.9rem' }}>
                                                {actor}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {movie.trailer && (
                                <div>
                                    <h3 style={{ marginBottom: '10px', color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Trailer</h3>
                                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: '12px', overflow: 'hidden', background: 'black' }}>
                                        <iframe
                                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                            src={movie.trailer}
                                            title="Movie Trailer"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;
