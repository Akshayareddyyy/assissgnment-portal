const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const mysql = require('mysql2/promise');

const app = express();
const port = 5500;

app.use(cors());
app.use(express.json());

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// SIGNUP API
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    await db.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
    res.json({ success: true, message: 'Signup successful' });
  } catch (error) {
    console.error('❌ Signup error:', error);
    res.status(500).json({ success: false, message: 'Signup failed' });
  }
});

// LOGIN API
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    if (rows.length === 1) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
