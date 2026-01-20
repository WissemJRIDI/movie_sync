# Movie Sync

A real-time movie watchlist application that allows users to search, add, and track movies they want to watch. The application supports real-time synchronization across multiple clients using Socket.io.

## Features

- **Real-time Synchronization:** Updates are instantly reflected across all connected clients.
- **Movie Search:** Search for movies using a combined local database and external API.
- **Watchlist Management:** Add movies, mark them as watched, and remove them from the list.
- **Rich Data:** Automatically fetches movie details like posters, years, and cast members.

## Tech Stack

- **Frontend:** React 19, Vite, Socket.io-client
- **Backend:** Node.js, Express, Socket.io, Axios
- **Styling:** CSS Variables, Responsive Design

## Prerequisites

- Node.js (v16.0.0 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository.
2. Install dependencies for both client and server:

   ```bash
   npm run install-all
   ```

   Or manually:

   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

## Usage

### Development

To run the application in development mode, you need to start both the client and server.

1. Start the backend server:

   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000`.

2. In a new terminal, start the frontend client:

   ```bash
   cd client
   npm run dev
   ```

   The client will be available at the URL provided by Vite (usually `http://localhost:5173`).

### Production

To build and serve the application for production:

1. Build the client:

   ```bash
   npm run build
   ```

2. Start the server (which serves the built client):

   ```bash
   npm start
   ```

   Access the application at `http://localhost:3000`.

## Project Structure

- `client/`: React frontend application.
- `server/`: Node.js backend server.
- `server/richData.js`: Local fallback data for movie searches.

## License

ISC
