const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock quotes array (can be replaced with API call)
const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" }
];

// Quote API endpoint
app.get('/api/quote', (req, res) => {
  try {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.json(randomQuote);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch quote.' });
  }
});

// Weather API endpoint
app.get('/api/weather', async (req, res) => {
  try {
    const city = req.query.city || 'London'; // Default to London
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      // Fallback to mock data if API key is not set
      res.json({
        city: city,
        temperature: 22,
        condition: 'Partly Cloudy',
        description: 'Mock weather data - Please set OPENWEATHER_API_KEY in .env file'
      });
      return;
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const weatherData = {
      city: response.data.name,
      temperature: Math.round(response.data.main.temp),
      condition: response.data.weather[0].main,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind?.speed || 0
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Weather API Error:', error.message);
    res.status(500).json({ 
      error: 'Could not fetch weather data.',
      message: error.response?.data?.message || 'Please check your API key or city name.'
    });
  }
});

// Currency API endpoint
app.get('/api/currency', async (req, res) => {
  try {
    const amount = parseFloat(req.query.amount) || 100;
    
    if (isNaN(amount) || amount < 0) {
      return res.status(400).json({ error: 'Invalid amount. Please provide a valid number.' });
    }

    // Using ExchangeRate-API (free, no API key required)
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/INR');
    
    const rates = response.data.rates;
    const usdRate = rates.USD;
    const eurRate = rates.EUR;

    const result = {
      amount: amount,
      currency: 'INR',
      conversions: {
        usd: parseFloat((amount * usdRate).toFixed(2)),
        eur: parseFloat((amount * eurRate).toFixed(2))
      },
      rates: {
        usd: usdRate,
        eur: eurRate
      }
    };

    res.json(result);
  } catch (error) {
    console.error('Currency API Error:', error.message);
    res.status(500).json({ 
      error: 'Could not fetch currency data.',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'InfoHub API is running' });
});

// Start server only when run directly (local dev). On Vercel, we export the app.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
}

module.exports = app;

