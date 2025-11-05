import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3001' : '');

const WeatherModule = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState('London');

  const fetchWeather = async (cityName = city) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE_URL}/api/weather`, {
        params: { city: cityName }
      });
      setWeatherData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🌤️ Weather Information
        </h2>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
            >
              {isLoading ? 'Loading...' : 'Search'}
            </button>
          </div>
        </form>

        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {weatherData && !isLoading && (
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {weatherData.city}
              </h3>
              <div className="text-6xl font-bold text-blue-600 mb-2">
                {weatherData.temperature}°C
              </div>
              <p className="text-xl text-gray-600 capitalize">
                {weatherData.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Condition</p>
                <p className="text-lg font-semibold text-gray-800">
                  {weatherData.condition}
                </p>
              </div>
              {weatherData.humidity !== undefined && (
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Humidity</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {weatherData.humidity}%
                  </p>
                </div>
              )}
              {weatherData.windSpeed !== undefined && (
                <div className="bg-white rounded-lg p-4 shadow-sm col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Wind Speed</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {weatherData.windSpeed} m/s
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherModule;

