const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/intern', (req, res) => {
  res.json({
    name: "Akshaya",
    referralCode: "akshaya2025",
    donations: 1500
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
