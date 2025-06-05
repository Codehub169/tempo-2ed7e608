import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';

import apiRoutes from './routes.js';
import { initDb } from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(cors()); // Enable CORS for all routes. Adjust as needed for production.
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Serve frontend static files
const frontendDistPath = resolve(__dirname, '..', 'frontend', 'dist');
app.use(express.static(frontendDistPath));

// API routes
app.use('/api', apiRoutes);

// Catch-all route for SPA: serve index.html for any other GET request
app.get('*', (req, res) => {
  res.sendFile(join(frontendDistPath, 'index.html'));
});

async function startServer() {
  try {
    await initDb(); // Initialize database and create tables/seed data if necessary
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Frontend served from: ${frontendDistPath}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
