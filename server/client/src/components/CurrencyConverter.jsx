import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3001' : '');

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(100);
  const [conversionData, setConversionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchConversion = async (inrAmount) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE_URL}/api/currency`, {
        params: { amount: inrAmount }
      });
      setConversionData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch currency conversion');
      setConversionData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConversion(amount);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount > 0) {
      fetchConversion(amount);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          💱 Currency Converter
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Convert Indian Rupee (INR) to USD and EUR
        </p>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount in INR
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                min="0"
                step="0.01"
                placeholder="Enter amount"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={isLoading || amount <= 0}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
              >
                {isLoading ? 'Loading...' : 'Convert'}
              </button>
            </div>
          </div>
        </form>

        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Fetching exchange rates...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {conversionData && !isLoading && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 mb-2">Converting</p>
                <p className="text-3xl font-bold text-gray-800">
                  ₹{conversionData.amount.toLocaleString('en-IN')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white rounded-lg p-5 shadow-sm text-center">
                  <div className="text-2xl mb-2">🇺🇸</div>
                  <p className="text-sm text-gray-500 mb-2">USD</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${conversionData.conversions.usd.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Rate: {conversionData.rates.usd.toFixed(4)}
                  </p>
                </div>

                <div className="bg-white rounded-lg p-5 shadow-sm text-center">
                  <div className="text-2xl mb-2">🇪🇺</div>
                  <p className="text-sm text-gray-500 mb-2">EUR</p>
                  <p className="text-2xl font-bold text-blue-600">
                    €{conversionData.conversions.eur.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Rate: {conversionData.rates.eur.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;

