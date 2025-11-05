import { useState } from 'react';
import WeatherModule from './components/WeatherModule';
import CurrencyConverter from './components/CurrencyConverter';
import QuoteGenerator from './components/QuoteGenerator';

function App() {
  const [activeTab, setActiveTab] = useState('weather');

  const tabs = [
    { id: 'weather', label: '🌤️ Weather', component: <WeatherModule /> },
    { id: 'currency', label: '💱 Currency', component: <CurrencyConverter /> },
    { id: 'quote', label: '💬 Quotes', component: <QuoteGenerator /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            InfoHub
          </h1>
          <p className="text-xl text-gray-600">
            Your all-in-one utility hub
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-lg shadow-md p-2 flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto">
          {tabs.find((tab) => tab.id === activeTab)?.component}
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 py-6 text-gray-600">
          <p>InfoHub - Weather • Currency • Quotes</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
