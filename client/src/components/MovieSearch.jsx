import React, { useState, useEffect } from 'react';

function MovieSearch({ isOpen, onClose, onSearch, results, onAdd }) {
    const [query, setQuery] = useState('');
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        if (query.length > 2) {
            const timeoutId = setTimeout(() => {
                setSearching(true);
                onSearch(query);
            }, 500);
            return () => clearTimeout(timeoutId);
        }
    }, [query]);

    useEffect(() => {
        if (results) setSearching(false);
    }, [results]);

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(5px)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '80px'
        }} onClick={onClose}>
            <div
                className="glass-panel slide-down"
                style={{ width: '90%', maxWidth: '600px', height: 'fit-content', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <input
                        autoFocus
                        type="text"
                        placeholder="Search for a movie..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        style={{
                            width: '100%',
                            background: 'transparent',
                            border: 'none',
                            fontSize: '1.2rem',
                            color: 'var(--text-primary)',
                            outline: 'none'
                        }}
                    />
                </div>

                <div style={{ overflowY: 'auto', padding: '10px' }}>
                    {searching && <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>Searching...</div>}

                    {!searching && results && results.map(movie => (
                        <div
                            key={movie.id}
                            onClick={() => { onAdd(movie); onClose(); }}
                            style={{
                                display: 'flex',
                                padding: '10px',
                                cursor: 'pointer',
                                borderRadius: '8px',
                                transition: 'background 0.2s',
                                gap: '15px'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            <img
                                src={movie.poster || 'https://via.placeholder.com/50x75'}
                                style={{ width: '50px', height: '75px', objectFit: 'cover', borderRadius: '4px' }}
                                alt=""
                            />
                            <div>
                                <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{movie.title}</div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{movie.year}</div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '4px', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {movie.overview}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MovieSearch;
