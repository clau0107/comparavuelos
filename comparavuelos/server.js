require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({ default: fn }) => fn(...args));

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const SK_HOST = process.env.SK_HOST;
const SK_KEY = process.env.SK_KEY;

// Autosuggest de prueba
app.get('/api/autosuggest', async (req, res) => {
  const q = req.query.query || '';
  if (!q) return res.json([]);

  res.json([
    { name: "Buenos Aires", code: "BUE", placeId: "BUE" },
    { name: "Madrid", code: "MAD", placeId: "MAD" }
  ]);
});

// Search de prueba
app.post('/api/search', (req, res) => {
  res.json([
    {
      from: "BUE",
      to: "MAD",
      price: 1500,
      currency: "USD",
      airline: "Aerolíneas Argentinas",
      bookingUrl: "https://ejemplo.com"
    }
  ]);
});

app.listen(PORT, () => console.log(`API running on port ${PORT}`));
