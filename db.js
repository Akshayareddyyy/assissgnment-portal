// db.js
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'akshayareddy', // ✅ replace with actual password
  database: 'weatherapp',
});

module.exports = db;
