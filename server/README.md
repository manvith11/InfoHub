# InfoHub Backend Server

Express.js backend server for the InfoHub application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```env
OPENWEATHER_API_KEY=your_api_key_here
PORT=3001
```

3. Start the server:
```bash
npm start
```

## API Endpoints

### GET /api/weather
Get weather information for a city.

**Query Parameters:**
- `city` (optional): City name (default: "London")

**Example:**
```
GET /api/weather?city=Mumbai
```

**Response:**
```json
{
  "city": "Mumbai",
  "temperature": 28,
  "condition": "Clear",
  "description": "clear sky",
  "humidity": 65,
  "windSpeed": 3.5
}
```

### GET /api/currency
Convert INR to USD and EUR.

**Query Parameters:**
- `amount` (optional): Amount in INR (default: 100)

**Example:**
```
GET /api/currency?amount=1000
```

**Response:**
```json
{
  "amount": 1000,
  "currency": "INR",
  "conversions": {
    "usd": 12.05,
    "eur": 11.08
  },
  "rates": {
    "usd": 0.01205,
    "eur": 0.01108
  }
}
```

### GET /api/quote
Get a random motivational quote.

**Example:**
```
GET /api/quote
```

**Response:**
```json
{
  "text": "The only way to do great work is to love what you do.",
  "author": "Steve Jobs"
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "InfoHub API is running"
}
```

