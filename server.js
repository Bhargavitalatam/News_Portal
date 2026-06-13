import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Gzip compression
app.use(compression());

// Resolve static directory: serve 'dist' if it exists (built React SPA), fallback to 'public'
const staticDir = fs.existsSync(path.join(__dirname, 'dist')) ? 'dist' : 'public';
console.log(`[PulseNews] Serving static assets from: ${staticDir}`);

app.use(express.static(path.join(__dirname, staticDir)));

// Optional route mapping for compatibility
app.use('/public', express.static(path.join(__dirname, staticDir)));

// Root route redirect to /articles
app.get('/', (req, res) => {
  res.redirect('/articles');
});

// SPA fallback: Return index.html for articles, article detail, and search pages
app.get(['/articles', '/article/*', '/search'], (req, res) => {
  res.sendFile(path.join(__dirname, staticDir, 'index.html'));
});

// Generic wildcard fallback for any other path
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, staticDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[PulseNews] Web Server running at http://localhost:${PORT}`);
  console.log(`[PulseNews] Articles list: http://localhost:${PORT}/articles`);
});
