const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite Database
const db = new Database('database.db');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    team TEXT NOT NULL,
    github TEXT NOT NULL,
    ai_tool TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// ── ROUTES ──

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'MQR 2.0 Backend Online',
    database: 'SQLite Connected'
  });
});

// Get all registrations
app.get('/registrations', (req, res) => {
  const rows = db.prepare('SELECT * FROM registrations').all();
  res.json(rows);
});

// Add new registration
app.post('/register', (req, res) => {
  const { name, email, team, github, ai_tool } = req.body;
  const stmt = db.prepare(`
    INSERT INTO registrations (name, email, team, github, ai_tool)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = stmt.run(name, email, team, github, ai_tool);
  res.json({ 
    message: 'Registration successful',
    id: result.lastInsertRowid 
  });
});

// Delete registration
app.delete('/registrations/:id', (req, res) => {
  db.prepare('DELETE FROM registrations WHERE id = ?').run(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`MQR 2.0 Backend running on port ${PORT}`);
});