import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieSearch from './components/MovieSearch';
import MovieDetails from './components/MovieDetails';
import './index.css';

// Connect to server (auto-detects host in production, defaults to localhost in dev if proxy not set)
const socket = io(window.location.hostname === 'localhost' ? 'http://localhost:3000' : '/');

function App() {
  const [movies, setMovies] = useState([]);
  const [connected, setConnected] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));

    socket.on('get_movies', (initialMovies) => setMovies(initialMovies));
    socket.on('movie_added', (newMovie) => setMovies(prev => [...prev, newMovie]));
    socket.on('movie_removed', (id) => {
      setMovies(prev => prev.filter(m => m.id !== id));
      if (selectedMovie && selectedMovie.id === id) setSelectedMovie(null);
    });

    socket.on('movie_updated', (updatedMovie) => {
      setMovies(prev => prev.map(m => m.id === updatedMovie.id ? updatedMovie : m));
      if (selectedMovie && selectedMovie.id === updatedMovie.id) {
        setSelectedMovie(updatedMovie);
      }
    });

    socket.on('search_results', (results) => setSearchResults(results));

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('get_movies');
      socket.off('movie_added');
      socket.off('movie_removed');
      socket.off('movie_updated');
      socket.off('search_results');
    };
  }, [selectedMovie]);

  const handleSearch = (query) => {
    socket.emit('search_movie', query);
  };

  const handleAddMovie = (movie) => {
    socket.emit('add_movie', movie);
    setIsSearchOpen(false);
    setSearchResults(null);
  };

  const handleToggleWatched = (id) => {
    socket.emit('toggle_watched', id);
  };

  const handleDeleteMovie = (id) => {
    socket.emit('remove_movie', id);
  };

  return (
    <div>
      <Header />

      {!connected && (
        <div style={{ textAlign: 'center', color: 'var(--danger-color)', marginBottom: '20px' }}>
          Disconnected...
        </div>
      )}

      {/* Floating Action Button for Add */}
      <button
        onClick={() => setIsSearchOpen(true)}
        style={{
          display: 'block',
          width: '100%',
          padding: '15px',
          background: 'var(--accent-color)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 5px 20px var(--accent-glow)',
          marginBottom: '20px'
        }}
        onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
      >
        + Add Movie
      </button>

      <MovieList
        movies={movies}
        onOpenDetails={setSelectedMovie}
      />

      <MovieSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
        results={searchResults}
        onAdd={handleAddMovie}
      />

      <MovieDetails
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onToggle={handleToggleWatched}
        onDelete={handleDeleteMovie}
      />
    </div>
  );
}

export default App;
