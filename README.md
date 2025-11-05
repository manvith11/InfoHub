# InfoHub - ByteXL Assignment

A single-page application (SPA) that integrates three everyday utilities:
- 🌤️ **Real-time Weather Display**
- 💱 **Currency Converter** (INR to USD/EUR)
- 💬 **Motivational Quote Generator**

## Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS
- **Backend**: Node.js + Express
- **APIs**: OpenWeatherMap, ExchangeRate-API

## Project Structure

```
byteXL_assignment/
├── server/
│   ├── server.js              # Express backend server
│   ├── package.json
│   └── .env                   # Environment variables (create this)
└── server/client/             # React frontend
    ├── src/
    │   ├── components/
    │   │   ├── WeatherModule.jsx
    │   │   ├── CurrencyConverter.jsx
    │   │   └── QuoteGenerator.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (LTS version recommended)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `server` directory:
```env
OPENWEATHER_API_KEY=your_openweather_api_key_here
PORT=3001
```

4. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)

5. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd server/client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port Vite assigns)

## Deployment on Vercel

### Option 1: Deploy Frontend and Backend Separately

1. **Deploy Backend**:
   - Connect your GitHub repo to Vercel
   - Set root directory to `server`
   - Add environment variable `OPENWEATHER_API_KEY` in Vercel dashboard
   - Deploy

2. **Deploy Frontend**:
   - Create a new Vercel project
   - Set root directory to `server/client`
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Add environment variable `VITE_API_URL` with your backend URL

### Option 2: Deploy as Monorepo

1. Push your code to GitHub
2. Connect to Vercel
3. Configure build settings:
   - Root directory: `server/client`
   - Build command: `npm run build`
   - Output directory: `dist`
4. Add environment variables in Vercel dashboard
5. Configure API routes in `vercel.json`

## Features

- ✅ Single Page Application (SPA) with tabbed navigation
- ✅ Real-time weather data with city search
- ✅ Currency conversion with live exchange rates
- ✅ Random motivational quotes
- ✅ Loading states and error handling
- ✅ Responsive design with Tailwind CSS
- ✅ Modern, clean UI

## API Endpoints

- `GET /api/weather?city=London` - Get weather data for a city
- `GET /api/currency?amount=100` - Convert INR to USD/EUR
- `GET /api/quote` - Get a random motivational quote
- `GET /api/health` - Health check endpoint

## Notes

- The weather API requires an OpenWeatherMap API key
- Currency conversion uses ExchangeRate-API (free, no key required)
- Quotes are generated from a local array (can be replaced with external API)

## License

This project is created for ByteXL assignment submission.

