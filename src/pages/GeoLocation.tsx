import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Types
type DiseaseSighting = {
  id: string;
  diseaseName: string;
  date: string;
  location: {
    lat: number;
    lng: number;
  };
  image?: string;
};

// Mock data
const mockDiseaseSightings: DiseaseSighting[] = [
  {
    id: '1',
    diseaseName: 'Mildiou',
    date: '2024-03-15',
    location: { lat: 48.8566, lng: 2.3522 }, // Paris
    image: 'https://placehold.co/200x100?text=Mildiou+Paris '
  },
  {
    id: '2',
    diseaseName: 'Oïdium',
    date: '2024-03-10',
    location: { lat: 45.7640, lng: 4.8357 }, // Lyon
    image: 'https://placehold.co/200x100?text=O ïdium+Lyon'
  },
  {
    id: '3',
    diseaseName: 'Rouille',
    date: '2024-03-20',
    location: { lat: 44.8378, lng: -0.5792 }, // Bordeaux
    image: 'https://placehold.co/200x100?text=Rouille+Bordeaux '
  },
  {
    id: '4',
    diseaseName: 'Tache noire',
    date: '2024-03-18',
    location: { lat: 43.6047, lng: 1.4442 }, // Toulouse
    image: 'https://placehold.co/200x100?text=Tache+Noire+Toulouse '
  },
  {
    id: '5',
    diseaseName: 'Botrytis',
    date: '2024-03-22',
    location: { lat: 47.2184, lng: -1.5536 }, // Nantes
    image: 'https://placehold.co/200x100?text=Botrytis+Nantes '
  }
];

// Custom Icons as SVGs
function MapPinIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}

function ZoomInIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 12h4" />
    </svg>
  );
}

function ZoomOutIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 12h4" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  );
}

export default function App() {
  const [filterDisease, setFilterDisease] = useState('');
  const [mapCenter] = useState<[number, number]>([46.603354, 1.888334]); // France center
  const [mapZoom] = useState(5);

  const getMarkerColor = (diseaseName: string) => {
    const severityMap: { [key: string]: string } = {
      'Mildiou': '#ef4444', // red-500
      'Oïdium': '#f97316', // orange-500
      'Rouille': '#f59e0b', // amber-500
      'Tache noire': '#84cc16', // lime-500
      'Botrytis': '#10b981', // emerald-500
    };
    return severityMap[diseaseName] || '#3b82f6'; // blue-500
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Géolocalisation des maladies</h1>
          <p className="text-gray-600">
            Visualisez la distribution géographique des maladies pour mieux protéger vos cultures.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Controls */}
          <div className="p-4 border-b flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-3">
              <select
                value={filterDisease}
                onChange={(e) => setFilterDisease(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              >
                <option value="">Toutes les maladies</option>
                <option value="Mildiou">Mildiou</option>
                <option value="Oïdium">Oïdium</option>
                <option value="Rouille">Rouille</option>
                <option value="Tache noire">Tache noire</option>
                <option value="Botrytis">Botrytis</option>
              </select>
              <button className="flex items-center px-3 py-2 border border-gray-300 rounded hover:bg-gray-100 transition">
                <FilterIcon />
                Plus de filtres
              </button>
            </div>

            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-4">
                {mockDiseaseSightings.filter(s => !filterDisease || s.diseaseName === filterDisease).length} signalements
              </span>
              <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                <MapPinIcon />
                Ajouter un signalement
              </button>
            </div>
          </div>

          {/* Map */}
          <div className="h-[600px] relative z-0">
            <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright ">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {mockDiseaseSightings
                .filter((s) => !filterDisease || s.diseaseName === filterDisease)
                .map((sighting) => (
                  <Marker key={sighting.id} position={[sighting.location.lat, sighting.location.lng]}>
                    <Popup>
                      <div className="p-1">
                        <h3 className="font-medium">{sighting.diseaseName}</h3>
                        <p className="text-sm text-gray-600">
                          Signalé le {new Date(sighting.date).toLocaleDateString()}
                        </p>
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

              {/* Custom Map Controls */}
              <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
                <button
                  onClick={() => alert('Changer de carte')}
                  className="bg-white p-2 rounded shadow hover:bg-gray-100"
                  title="Changer de carte"
                >
                  <LayersIcon />
                </button>
                <button
                  onClick={() => alert('Zoom avant')}
                  className="bg-white p-2 rounded shadow hover:bg-gray-100"
                  title="Zoom avant"
                >
                  <ZoomInIcon />
                </button>
                <button
                  onClick={() => alert('Zoom arrière')}
                  className="bg-white p-2 rounded shadow hover:bg-gray-100"
                  title="Zoom arrière"
                >
                  <ZoomOutIcon />
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
    </div>
  );
}