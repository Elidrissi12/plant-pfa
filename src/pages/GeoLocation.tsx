import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { MapPin, Layers, ZoomIn, ZoomOut, Filter } from 'lucide-react';
import type { DiseaseSighting } from '../types';
import { mockDiseaseSightings } from '../data/mockData';

// Custom position control component
const LocateMe: React.FC = () => {
  const map = useMap();
  
  const locateUser = () => {
    map.locate({ setView: true, maxZoom: 10 });
  };
  
  return (
    <button 
      onClick={locateUser}
      className="bg-white p-2 rounded-md shadow-md hover:bg-gray-100"
      title="Ma position"
    >
      <MapPin size={20} className="text-primary-600" />
    </button>
  );
};

const GeoLocation: React.FC = () => {
  const [sightings, setSightings] = useState<DiseaseSighting[]>(mockDiseaseSightings);
  const [filterDisease, setFilterDisease] = useState('');
  const [mapCenter, setMapCenter] = useState<[number, number]>([46.603354, 1.888334]); // Center of France
  const [mapZoom, setMapZoom] = useState(5);

  // Get marker color based on disease severity
  const getMarkerColor = (diseaseName: string) => {
    const severityMap: {[key: string]: string} = {
      'Mildiou': '#ef4444', // error-500
      'Oïdium': '#f97316', // orange-500
      'Rouille': '#f59e0b', // amber-500
      'Tache noire': '#84cc16', // lime-500
      'Botrytis': '#10b981', // emerald-500
    };
    
    return severityMap[diseaseName] || '#3b82f6'; // default: blue-500
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Géolocalisation des maladies</h1>
        <p className="text-gray-600">
          Visualisez la distribution géographique des maladies pour mieux protéger vos cultures.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Map Controls */}
        <div className="p-4 border-b flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-3">
            <select
              className="input max-w-xs"
              value={filterDisease}
              onChange={(e) => setFilterDisease(e.target.value)}
            >
              <option value="">Toutes les maladies</option>
              <option value="Mildiou">Mildiou</option>
              <option value="Oïdium">Oïdium</option>
              <option value="Rouille">Rouille</option>
              <option value="Tache noire">Tache noire</option>
              <option value="Botrytis">Botrytis</option>
            </select>
            
            <button className="btn-outline">
              <Filter size={18} className="mr-2" />
              Plus de filtres
            </button>
          </div>
          
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-4">
              {sightings.filter(s => !filterDisease || s.diseaseName === filterDisease).length} signalements
            </span>
            <button className="btn-primary">
              <MapPin size={18} className="mr-2" />
              Ajouter un signalement
            </button>
          </div>
        </div>
        
        {/* Map */}
        <div className="h-[600px] relative z-0">
          <MapContainer 
            center={mapCenter} 
            zoom={mapZoom} 
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {sightings
              .filter(s => !filterDisease || s.diseaseName === filterDisease)
              .map((sighting) => (
                <Marker 
                  key={sighting.id} 
                  position={[sighting.location.lat, sighting.location.lng]}
                  // In a real app, we would use custom icons here
                >
                  <Popup>
                    <div className="p-1">
                      <h3 className="font-medium">{sighting.diseaseName}</h3>
                      <p className="text-sm text-gray-600">Signalé le {new Date(sighting.date).toLocaleDateString()}</p>
                      {sighting.image && (
                        <img 
                          src={sighting.image} 
                          alt={sighting.diseaseName} 
                          className="mt-2 rounded w-full max-w-[200px]"
                        />
                      )}
                    </div>
                  </Popup>
                </Marker>
            ))}
            
            {/* Map Controls */}
            <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
              <LocateMe />
              <button 
                onClick={() => {}} 
                className="bg-white p-2 rounded-md shadow-md hover:bg-gray-100"
                title="Changer de carte"
              >
                <Layers size={20} />
              </button>
              <button 
                onClick={() => {}} 
                className="bg-white p-2 rounded-md shadow-md hover:bg-gray-100"
                title="Zoom avant"
              >
                <ZoomIn size={20} />
              </button>
              <button 
                onClick={() => {}} 
                className="bg-white p-2 rounded-md shadow-md hover:bg-gray-100"
                title="Zoom arrière"
              >
                <ZoomOut size={20} />
              </button>
            </div>
          </MapContainer>
        </div>
        
        {/* Legend */}
        <div className="p-4 border-t">
          <h3 className="font-medium mb-2">Légende</h3>
          <div className="flex flex-wrap gap-4">
            {['Mildiou', 'Oïdium', 'Rouille', 'Tache noire', 'Botrytis'].map((disease) => (
              <div key={disease} className="flex items-center">
                <span 
                  className="w-4 h-4 rounded-full mr-2" 
                  style={{ backgroundColor: getMarkerColor(disease) }}
                ></span>
                <span className="text-sm">{disease}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeoLocation;