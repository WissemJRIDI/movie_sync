const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const axios = require('axios');
const richMovies = require('./richData');

const app = express();
app.use(cors());

// Serve static files from the React client
app.use(express.static('../client/dist'));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for simplicity in this demo
        methods: ["GET", "POST"]
    }
});

// In-memory data store
let movies = [];

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Send current movies to the new client
    socket.emit('get_movies', movies);

    // Search Event
    socket.on('search_movie', async (query) => {
        if (!query) return;
        const lowerQuery = query.toLowerCase();

        // 1. Check Local Rich Data
        const localMatches = richMovies.filter(m =>
            m.title.toLowerCase().includes(lowerQuery)
        );

        // 2. Fetch from External Free API
        let apiMatches = [];
        try {
            const response = await axios.get(`https://imdb.iamidiotareyoutoo.com/search?q=${encodeURIComponent(query)}`);
            if (response.data && response.data.description) {
                apiMatches = response.data.description.map(item => ({
                    id: item['#IMDB_ID'],
                    title: item['#TITLE'],
                    year: item['#YEAR'],
                    poster: item['#IMG_POSTER'],
                    backdrop: null, // API doesn't provide this usually
                    overview: `Starring ${item['#ACTORS']}`, // Fallback overview
                    cast: item['#ACTORS'] ? item['#ACTORS'].split(', ') : [],
                    trailer: null,
                    rating: item['#RANK'] ? 'N/A' : 'N/A', // Rank isn't rating
                    isApi: true
                }));
            }
        } catch (error) {
            console.error('API Search Error:', error.message);
        }

        // Combine: Prefer local rich data if IDs match (though local IDs are IMDB IDs so we can de-dupe)
        const combined = [...localMatches];
        const localIds = new Set(localMatches.map(m => m.id));

        apiMatches.forEach(m => {
            if (!localIds.has(m.id)) {
                combined.push(m);
            }
        });

        socket.emit('search_results', combined);
    });

    socket.on('add_movie', (movie) => {
        // Basic validation
        if (!movie || !movie.title) return;

        // Check if already in list
        if (movies.some(m => m.id === movie.id)) return;

        // Add timestamp and defaults
        const newMovie = {
            watched: false,
            addedAt: new Date().toISOString(),
            ...movie
        };

        movies.push(newMovie);
        io.emit('movie_added', newMovie); // Broadcast to all
    });

    socket.on('remove_movie', (id) => {
        movies = movies.filter(m => m.id !== id);
        io.emit('movie_removed', id);
    });

    socket.on('toggle_watched', (id) => {
        const movie = movies.find(m => m.id === id);
        if (movie) {
            movie.watched = !movie.watched;
            io.emit('movie_updated', movie);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Handle React routing, return all requests to React app
app.get(/.*/, (req, res) => {
    res.sendFile(require('path').resolve(__dirname, '../client/dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
