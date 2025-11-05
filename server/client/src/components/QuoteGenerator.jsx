import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3001' : 'https://infohub-backendnew.vercel.app');

const QuoteGenerator = () => {
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchQuote = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE_URL}/api/quote`);
      setQuote(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch quote');
      setQuote(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          💬 Motivational Quotes
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Get inspired with daily motivational quotes
        </p>

        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading quote...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {quote && !isLoading && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 mb-6">
            <div className="text-center">
              <div className="text-6xl mb-4">💭</div>
              <blockquote className="text-2xl font-medium text-gray-800 mb-6 italic">
                "{quote.text}"
              </blockquote>
              <div className="border-t border-gray-300 pt-4">
                <p className="text-lg font-semibold text-gray-700">
                  — {quote.author}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={fetchQuote}
            disabled={isLoading}
            className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-purple-300 transition-colors font-semibold text-lg shadow-md hover:shadow-lg"
          >
            {isLoading ? 'Loading...' : 'Get New Quote ✨'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteGenerator;

