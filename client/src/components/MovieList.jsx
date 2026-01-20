import React from 'react';
import MovieCard from './MovieCard';

function MovieList({ movies, onOpenDetails }) {
    if (movies.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🎬</div>
                <p style={{ fontSize: '1.2rem' }}>Your watchlist is empty.</p>
                <p style={{ fontSize: '0.9rem', marginTop: '5px' }}>Search and add movies to get started!</p>
            </div>
        );
    }

    // Sort: Unwatched first, then by added date
    const sortedMovies = [...movies].sort((a, b) => {
        if (a.watched === b.watched) {
            return new Date(b.addedAt) - new Date(a.addedAt);
        }
        return a.watched ? 1 : -1;
    });

    return (
        <div style={{
            marginTop: '30px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center'
        }}>
            {sortedMovies.map(movie => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={onOpenDetails}
                />
            ))}
        </div>
    );
}

export default MovieList;
