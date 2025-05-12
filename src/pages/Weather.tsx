import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Cloud, 
  Droplets, 
  Wind, 
  Thermometer,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useGeolocation } from '../hooks/useGeolocation';
import { getWeather, getWeatherIcon, type WeatherResponse } from '../services/weatherService';

const Weather: React.FC = () => {
  const { location, loading: locationLoading } = useGeolocation();
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async () => {
    if (!location) return;
    
    try {
      setLoading(true);
      const data = await getWeather(location.latitude, location.longitude);
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError("Erreur lors de la récupération des données météo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchWeatherData();
    }
  }, [location]);

  if (locationLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !weatherData) {
    return (
      <div className="bg-error-50 border border-error-200 text-error-700 px-6 py-4 rounded-lg">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          <p>{error || "Impossible de charger les données météo"}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Météo agricole</h1>
        <p className="text-gray-600">
          Consultez les prévisions météo et recevez des recommandations pour protéger vos cultures.
        </p>
      </div>

      {/* Current Weather */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-primary-500 mr-2" />
            <h2 className="text-xl font-semibold">Conditions actuelles</h2>
          </div>
          <button 
            onClick={fetchWeatherData}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <RefreshCw className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary-50 rounded-full">
              <Thermometer className="h-6 w-6 text-primary-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Température</p>
              <p className="text-2xl font-bold">{Math.round(weatherData.current.temp)}°C</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-50 rounded-full">
              <Droplets className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Humidité</p>
              <p className="text-2xl font-bold">{weatherData.current.humidity}%</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gray-50 rounded-full">
              <Wind className="h-6 w-6 text-gray-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Vent</p>
              <p className="text-2xl font-bold">{Math.round(weatherData.current.wind_speed)} km/h</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-50 rounded-full">
              <Cloud className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Conditions</p>
              <p className="text-lg font-medium">{weatherData.current.weather[0].description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Prévisions sur 5 jours</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {weatherData.daily.slice(0, 5).map((day, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium text-center mb-2">
                {format(new Date(day.dt * 1000), 'EEEE', { locale: fr })}
              </p>
              <div className="flex justify-center mb-2">
                <img 
                  src={getWeatherIcon(day.weather[0].icon)} 
                  alt={day.weather[0].description}
                  className="w-16 h-16"
                />
              </div>
              <p className="text-sm text-center text-gray-600 mb-3">
                {day.weather[0].description}
              </p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-blue-600">{Math.round(day.temp.min)}°</span>
                <span className="text-error-600">{Math.round(day.temp.max)}°</span>
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
  );
};

export default Weather;