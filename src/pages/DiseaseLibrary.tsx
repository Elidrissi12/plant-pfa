import React, { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import type { Disease } from '../types';
import { mockDiseases } from '../data/mockData';

const DiseaseLibrary: React.FC = () => {
  const [diseases, setDiseases] = useState<Disease[]>(mockDiseases);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlant, setFilterPlant] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('');
  
  const filteredDiseases = diseases.filter(disease => {
    const matchesSearch = disease.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         disease.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPlant = filterPlant === '' || disease.affectedPlants.includes(filterPlant);
    const matchesSeverity = filterSeverity === '' || disease.severity === filterSeverity;
    
    return matchesSearch && matchesPlant && matchesSeverity;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dictionnaire des maladies</h1>
        <p className="text-gray-600">
          Base de données complète des maladies des plantes avec symptômes, causes et traitements.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Rechercher une maladie..."
              className="input pr-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          
          <div className="flex gap-4">
            <div className="relative">
              <select
                className="input appearance-none pr-10"
                value={filterPlant}
                onChange={(e) => setFilterPlant(e.target.value)}
              >
                <option value="">Toutes les plantes</option>
                <option value="Tomate">Tomate</option>
                <option value="Pomme de terre">Pomme de terre</option>
                <option value="Concombre">Concombre</option>
                <option value="Maïs">Maïs</option>
                <option value="Vigne">Vigne</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
            
            <div className="relative">
              <select
                className="input appearance-none pr-10"
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
              >
                <option value="">Toutes les sévérités</option>
                <option value="low">Faible</option>
                <option value="medium">Moyenne</option>
                <option value="high">Élevée</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
            
            <button className="btn-outline">
              <Filter size={18} className="mr-2" />
              Filtres
            </button>
          </div>
        </div>
      </div>

      {/* Disease Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDiseases.map((disease, index) => (
          <div 
            key={disease.id} 
            className="card card-hover animate-fade-in overflow-hidden" 
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={disease.images[0]} 
                alt={disease.name} 
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-semibold text-xl">{disease.name}</h3>
                <p className="text-white/80 text-sm italic">{disease.scientificName}</p>
              </div>
              <div className={`absolute top-4 right-4 px-2 py-1 rounded text-xs font-medium text-white
                ${disease.severity === 'low' ? 'bg-success-500' : 
                  disease.severity === 'medium' ? 'bg-warning-500' : 'bg-error-500'}`}
              >
                {disease.severity === 'low' ? 'Faible' : 
                  disease.severity === 'medium' ? 'Moyenne' : 'Élevée'}
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-500 mb-2">Plantes affectées</h4>
                <div className="flex flex-wrap gap-2">
                  {disease.affectedPlants.map((plant, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs"
                    >
                      {plant}
                    </span>
                  ))}
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-3">{disease.description}</p>
              
              <button className="w-full btn-primary">
                Voir les détails
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredDiseases.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">Aucune maladie ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
};

export default DiseaseLibrary;