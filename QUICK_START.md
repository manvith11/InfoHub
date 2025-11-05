# Quick Start Guide

## Get Started in 5 Minutes

### 1. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
# Copy the example below and add your OpenWeatherMap API key
```

Create `server/.env`:
```env
OPENWEATHER_API_KEY=your_api_key_here
PORT=3001
```

Get your free API key: https://openweathermap.org/api

```bash
# Start backend server
npm start
```

Backend will run on: http://localhost:3001

### 2. Frontend Setup

Open a new terminal:

```bash
# Navigate to client directory
cd server/client

# Install dependencies
npm install

# Start frontend
npm run dev
```

Frontend will run on: http://localhost:5173

### 3. Test the Application

1. Open http://localhost:5173 in your browser
2. Click through the three tabs:
   - 🌤️ Weather - Try searching for "Mumbai", "London", "New York"
   - 💱 Currency - Convert different INR amounts
   - 💬 Quotes - Click "Get New Quote" multiple times

### 4. Verify API Endpoints

Test backend directly:
- http://localhost:3001/api/health
- http://localhost:3001/api/quote
- http://localhost:3001/api/weather?city=Mumbai
- http://localhost:3001/api/currency?amount=1000

## Troubleshooting

**Backend won't start?**
- Check if port 3001 is already in use
- Verify Node.js is installed: `node --version`
- Check `.env` file exists in `server/` directory

**Frontend won't start?**
- Check if port 5173 is already in use
- Verify all dependencies are installed
- Check that backend is running on port 3001

**API calls failing?**
- Ensure backend is running
- Check browser console for CORS errors
- Verify OpenWeatherMap API key is correct

**Weather not showing?**
- If API key is missing, weather will show mock data with a message
- Get a free API key from OpenWeatherMap
- Add it to `server/.env` file

## Next Steps

- Review `README.md` for detailed documentation
- Check `DEPLOYMENT.md` for Vercel deployment instructions
- Prepare your demo video following the checklist in `DEPLOYMENT.md`

