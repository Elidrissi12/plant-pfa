import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Calendar,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Leaf,
  Clock,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Diagnostic } from '../types';
import { mockDiagnostics } from '../data/mockData';

const DiagnosticHistory: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>(mockDiagnostics);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortField, setSortField] = useState<'date' | 'plantName' | 'status'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<Diagnostic | null>(null);
  
  // Filter and sort diagnostics
  const filteredDiagnostics = diagnostics
    .filter(diagnostic => {
      const matchesSearch = 
        diagnostic.plantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (diagnostic.diseaseName?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
      
      const matchesStatus = statusFilter === '' || diagnostic.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Sort by selected field
      if (sortField === 'date') {
        return sortDirection === 'asc' 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortField === 'plantName') {
        return sortDirection === 'asc' 
          ? a.plantName.localeCompare(b.plantName)
          : b.plantName.localeCompare(a.plantName);
      } else {
        return sortDirection === 'asc' 
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      }
    });
  
  // Group diagnostics by month
  const diagnosticsByMonth: Record<string, Diagnostic[]> = {};
  
  filteredDiagnostics.forEach(diagnostic => {
    const date = new Date(diagnostic.date);
    const monthYear = format(date, 'MMMM yyyy', { locale: fr });
    
    if (!diagnosticsByMonth[monthYear]) {
      diagnosticsByMonth[monthYear] = [];
    }
    
    diagnosticsByMonth[monthYear].push(diagnostic);
  });
  
  // Sort function
  const toggleSort = (field: 'date' | 'plantName' | 'status') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  // Get sort icon
  const getSortIcon = (field: 'date' | 'plantName' | 'status') => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };
  
  // Get status badge color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'healthy': return 'bg-success-100 text-success-700';
      case 'infected': return 'bg-error-100 text-error-700';
      case 'treated': return 'bg-warning-100 text-warning-700';
      case 'cured': return 'bg-primary-100 text-primary-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  // Get status label
  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'healthy': return 'Saine';
      case 'infected': return 'Infectée';
      case 'treated': return 'En traitement';
      case 'cured': return 'Guérie';
      default: return status;
    }
  };
  
  // View diagnostic details
  const viewDiagnostic = (diagnostic: Diagnostic) => {
    setSelectedDiagnostic(diagnostic);
  };
  
  // Timeline items for the selected diagnostic
  const timelineItems = selectedDiagnostic ? [
    {
      date: selectedDiagnostic.date,
      title: 'Diagnostic initial',
      description: selectedDiagnostic.diseaseName 
        ? `Maladie détectée : ${selectedDiagnostic.diseaseName} (confiance: ${selectedDiagnostic.confidence}%)`
        : 'Plante en bonne santé',
      icon: <AlertCircle size={16} />,
      color: selectedDiagnostic.status === 'healthy' ? 'bg-success-500' : 'bg-error-500'
    },
    ...(selectedDiagnostic.status === 'treated' || selectedDiagnostic.status === 'cured' ? [
      {
        date: (() => {
          // For demo, add 5 days to original date
          const date = new Date(selectedDiagnostic.date);
          date.setDate(date.getDate() + 5);
          return date.toISOString();
        })(),
        title: 'Traitement appliqué',
        description: selectedDiagnostic.treatmentApplied?.join(', ') || 'Traitement standard',
        icon: <Leaf size={16} />,
        color: 'bg-warning-500'
      }
    ] : []),
    ...(selectedDiagnostic.status === 'cured' ? [
      {
        date: (() => {
          // For demo, add 15 days to original date
          const date = new Date(selectedDiagnostic.date);
          date.setDate(date.getDate() + 15);
          return date.toISOString();
        })(),
        title: 'Guérison confirmée',
        description: 'La plante a récupéré et ne présente plus de symptômes',
        icon: <Leaf size={16} />,
        color: 'bg-success-500'
      }
    ] : [])
  ] : [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Historique des diagnostics</h1>
        <p className="text-gray-600">
          Suivez l'évolution de vos plantes et l'efficacité des traitements au fil du temps.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Rechercher par plante ou maladie..."
              className="input pr-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          
          <div className="flex gap-3">
            <select
              className="input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Tous les statuts</option>
              <option value="healthy">Saine</option>
              <option value="infected">Infectée</option>
              <option value="treated">En traitement</option>
              <option value="cured">Guérie</option>
            </select>
            
            <button className="btn-outline">
              <Calendar size={18} className="mr-2" />
              Date
            </button>
            
            <button className="btn-outline">
              <Filter size={18} className="mr-2" />
              Plus de filtres
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Diagnostics List */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
          {/* Table header */}
          <div className="border-b">
            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-600">
              <div 
                className="col-span-3 sm:col-span-2 flex items-center cursor-pointer"
                onClick={() => toggleSort('date')}
              >
                <span>Date</span>
                <span className="ml-1">{getSortIcon('date')}</span>
              </div>
              <div 
                className="col-span-5 sm:col-span-4 flex items-center cursor-pointer"
                onClick={() => toggleSort('plantName')}
              >
                <span>Plante</span>
                <span className="ml-1">{getSortIcon('plantName')}</span>
              </div>
              <div className="col-span-4 sm:col-span-3 hidden sm:block">Maladie</div>
              <div 
                className="col-span-4 sm:col-span-2 flex items-center cursor-pointer"
                onClick={() => toggleSort('status')}
              >
                <span>Statut</span>
                <span className="ml-1">{getSortIcon('status')}</span>
              </div>
              <div className="col-span-1 text-right">Actions</div>
            </div>
          </div>
          
          {/* Table body */}
          <div className="divide-y">
            {Object.keys(diagnosticsByMonth).length > 0 ? (
              Object.entries(diagnosticsByMonth).map(([month, monthDiagnostics]) => (
                <div key={month}>
                  <div className="bg-gray-50 p-3 font-medium text-gray-600">
                    {month}
                  </div>
                  
                  {monthDiagnostics.map((diagnostic) => (
                    <div 
                      key={diagnostic.id} 
                      className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="col-span-3 sm:col-span-2 text-sm text-gray-600">
                        {format(new Date(diagnostic.date), 'dd MMM yyyy', { locale: fr })}
                      </div>
                      <div className="col-span-5 sm:col-span-4 font-medium">
                        {diagnostic.plantName}
                      </div>
                      <div className="col-span-4 sm:col-span-3 text-gray-600 hidden sm:block">
                        {diagnostic.diseaseName || 'Aucune maladie'}
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(diagnostic.status)}`}>
                          {getStatusLabel(diagnostic.status)}
                        </span>
                      </div>
                      <div className="col-span-1 text-right">
                        <button 
                          className="text-primary-600 hover:text-primary-800"
                          onClick={() => viewDiagnostic(diagnostic)}
                        >
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                Aucun diagnostic ne correspond à votre recherche.
              </div>
            )}
          </div>
        </div>
        
        {/* Diagnostic Details */}
        <div className="lg:col-span-1">
          {selectedDiagnostic ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-20">
              <div className="p-4 border-b bg-gray-50">
                <h2 className="font-semibold text-lg">Détails du diagnostic</h2>
              </div>
              
              <div className="p-4">
                <div className="mb-6">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-lg">{selectedDiagnostic.plantName}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedDiagnostic.status)}`}>
                      {getStatusLabel(selectedDiagnostic.status)}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Diagnostiqué le {format(new Date(selectedDiagnostic.date), 'dd MMMM yyyy', { locale: fr })}
                  </p>
                </div>
                
                {/* Plant Image */}
                <div className="mb-6">
                  <img 
                    src={selectedDiagnostic.image} 
                    alt={selectedDiagnostic.plantName} 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                
                {/* Diagnostic Information */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-500 mb-2">Diagnostic</h4>
                  <p className="text-gray-800 mb-2">
                    {selectedDiagnostic.diseaseName || 'Aucune maladie détectée'}
                  </p>
                  {selectedDiagnostic.diseaseName && (
                    <div className="bg-gray-50 p-3 rounded-lg text-sm">
                      <div className="flex justify-between mb-1">
                        <span>Confiance:</span>
                        <span className="font-medium">{selectedDiagnostic.confidence}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full" 
                          style={{ width: `${selectedDiagnostic.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Notes */}
                {selectedDiagnostic.notes && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-500 mb-2">Notes</h4>
                    <p className="text-gray-800 text-sm">{selectedDiagnostic.notes}</p>
                  </div>
                )}
                
                {/* Treatments */}
                {selectedDiagnostic.treatmentApplied && selectedDiagnostic.treatmentApplied.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-500 mb-2">Traitements appliqués</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-800">
                      {selectedDiagnostic.treatmentApplied.map((treatment, i) => (
                        <li key={i}>{treatment}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Timeline */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-3">Chronologie</h4>
                  <div className="space-y-4">
                    {timelineItems.map((item, i) => (
                      <div key={i} className="relative pl-6">
                        {/* Timeline connector */}
                        {i < timelineItems.length - 1 && (
                          <div className="absolute left-[11px] top-[20px] bottom-0 w-0.5 bg-gray-200"></div>
                        )}
                        
                        {/* Timeline point */}
                        <div className={`absolute left-0 top-1 h-[22px] w-[22px] rounded-full flex items-center justify-center ${item.color} text-white`}>
                          {item.icon}
                        </div>
                        
                        <div>
                          <h5 className="font-medium">{item.title}</h5>
                          <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                          <p className="text-xs text-gray-500 flex items-center">
                            <Clock size={12} className="mr-1" />
                            {format(new Date(item.date), 'dd MMM yyyy', { locale: fr })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
              <div className="mb-4">
                <Leaf size={48} className="mx-auto text-gray-300" />
              </div>
              <h3 className="text-lg font-medium mb-2">Aucun diagnostic sélectionné</h3>
              <p>Cliquez sur un diagnostic dans la liste pour afficher ses détails ici.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiagnosticHistory;