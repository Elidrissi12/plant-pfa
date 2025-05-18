import React, { useState, useEffect } from 'react';

// App Component
export default function App() {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for weather (replace with real API if needed)
  const mockWeatherData = {
    current: {
      temp: 21.5,
      humidity: 60,
      wind_speed: 15,
      weather: [
        {
          description: 'Partiellement nuageux',
          icon: 'cloud-sun',
        },
      ],
    },
    daily: [
      {
        dt: Math.floor(Date.now() / 1000),
        temp: { min: 18, max: 24 },
        humidity: 55,
        pop: 0.1,
        weather: [
          {
            description: 'Soleil',
            icon: 'sun',
          },
        ],
      },
      {
        dt: Math.floor((Date.now() + 86400) / 1000),
        temp: { min: 19, max: 25 },
        humidity: 60,
        pop: 0.3,
        weather: [
          {
            description: 'Nuages épars',
            icon: 'cloud',
          },
        ],
      },
      {
        dt: Math.floor((Date.now() + 2 * 86400) / 1000),
        temp: { min: 20, max: 27 },
        humidity: 65,
        pop: 0.6,
        weather: [
          {
            description: 'Pluie légère',
            icon: 'cloud-drizzle',
          },
        ],
      },
      {
        dt: Math.floor((Date.now() + 3 * 86400) / 1000),
        temp: { min: 17, max: 22 },
        humidity: 70,
        pop: 0.9,
        weather: [
          {
            description: 'Pluie modérée',
            icon: 'cloud-rain',
          },
        ],
      },
      {
        dt: Math.floor((Date.now() + 4 * 86400) / 1000),
        temp: { min: 16, max: 20 },
        humidity: 75,
        pop: 0.2,
        weather: [
          {
            description: 'Éclaircies',
            icon: 'sun-cloud',
          },
        ],
      },
    ],
  };

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        fetchData();
      },
      () => {
        setError("Impossible d'accéder à la localisation");
        setLoading(false);
      }
    );
  }, []);

  const fetchData = () => {
    setTimeout(() => {
      setWeatherData(mockWeatherData);
      setLoading(false);
    }, 1000);
  };

  const getWeatherIcon = (iconName) => {
    switch (iconName) {
      case 'sun':
        return <SunIcon />;
      case 'cloud':
        return <CloudIcon />;
      case 'cloud-sun':
        return <CloudSunIcon />;
      case 'cloud-drizzle':
        return <DrizzleIcon />;
      case 'cloud-rain':
        return <RainIcon />;
      case 'sun-cloud':
        return <SunCloudIcon />;
      default:
        return <ThermometerIcon />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg m-4 max-w-md mx-auto">
        <div className="flex items-center">
          <AlertTriangleIcon />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">Météo agricole</h1>
          <p className="text-gray-600 mt-2">Consultez les prévisions météo et protégez vos cultures.</p>
        </div>

        {/* Current Weather */}
        <div className="bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <MapPinIcon />
              <h2 className="text-2xl font-semibold ml-2">Conditions actuelles</h2>
            </div>
            <button
              onClick={fetchData}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <RefreshIcon />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <ThermometerIcon />
              </div>
              <div>
                <p className="text-sm text-gray-500">Température</p>
                <p className="text-2xl font-bold">{Math.round(weatherData.current.temp)}°C</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <DropletIcon />
              </div>
              <div>
                <p className="text-sm text-gray-500">Humidité</p>
                <p className="text-2xl font-bold">{weatherData.current.humidity}%</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <WindIcon />
              </div>
              <div>
                <p className="text-sm text-gray-500">Vent</p>
                <p className="text-2xl font-bold">{Math.round(weatherData.current.wind_speed)} km/h</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <CloudIcon />
              </div>
              <div>
                <p className="text-sm text-gray-500">Conditions</p>
                <p className="text-lg font-medium">{weatherData.current.weather[0].description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Forecast */}
        <div className="bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-6">Prévisions sur 5 jours</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {weatherData.daily.map((day, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                <p className="font-medium text-center mb-2 capitalize">
                  {new Date(day.dt * 1000).toLocaleDateString('fr-FR', { weekday: 'long' })}
                </p>
                <div className="flex justify-center mb-2">
                  <div className="w-16 h-16 flex items-center justify-center">
                    {getWeatherIcon(day.weather[0].icon)}
                  </div>
                </div>
                <p className="text-sm text-center text-gray-600 mb-3">
                  {day.weather[0].description}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-blue-600">{Math.round(day.temp.min)}°</span>
                  <span className="text-red-600">{Math.round(day.temp.max)}°</span>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Humidité: {day.humidity}%</span>
                    <span>Pluie: {Math.round(day.pop * 100)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom Icons as SVGs
function MapPinIcon() {
  return (
    <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function ThermometerIcon() {
  return (
    <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function DropletIcon() {
  return (
    <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
    </svg>
  );
}

function WindIcon() {
  return (
    <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14v6m-3-3h6M6 10h.01M6 6h.01M6 2h.01M6 18h.01M18 18h.01M18 14h.01M18 10h.01M18 6h.01M18 2h.01" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg className="h-6 w-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg className="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function DrizzleIcon() {
  return (
    <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 12V7m0 10v-1m-6 1h12a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function RainIcon() {
  return (
    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 12V7m0 10v-1m-6 1h12a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function CloudSunIcon() {
  return (
    <svg className="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15zM12 9v3m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function SunCloudIcon() {
  return (
    <svg className="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15zM12 9v3m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function AlertTriangleIcon() {
  return (
    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}