import React, { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronRight, Plus, Minus, ArrowRight } from 'lucide-react';

interface PreventionCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface PreventionTip {
  id: string;
  category: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  effectiveness: number; // 1-5
  relatedPlants: string[];
  relatedDiseases?: string[];
}

const PreventionTips: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedTips, setExpandedTips] = useState<string[]>([]);
  
  const categories: PreventionCategory[] = [
    { 
      id: 'watering', 
      name: 'Arrosage', 
      description: 'Techniques d\'arrosage optimales pour prévenir les maladies', 
      icon: <span className="text-blue-500">💧</span> 
    },
    { 
      id: 'spacing', 
      name: 'Espacement', 
      description: 'Recommandations d\'espacement pour une bonne circulation de l\'air', 
      icon: <span className="text-green-500">↔️</span> 
    },
    { 
      id: 'soil', 
      name: 'Sol et nutrition', 
      description: 'Maintenir un sol sain pour des plantes résistantes', 
      icon: <span className="text-amber-500">🌱</span> 
    },
    { 
      id: 'pruning', 
      name: 'Taille et élagage', 
      description: 'Techniques de taille pour réduire les risques de maladies', 
      icon: <span className="text-red-500">✂️</span> 
    },
    { 
      id: 'natural', 
      name: 'Traitements naturels', 
      description: 'Solutions préventives naturelles contre les maladies', 
      icon: <span className="text-emerald-500">🍃</span> 
    },
    { 
      id: 'seasonal', 
      name: 'Soins saisonniers', 
      description: 'Interventions adaptées aux saisons', 
      icon: <span className="text-amber-500">🌞</span> 
    },
  ];
  
  const preventionTips: PreventionTip[] = [
    {
      id: 'tip-1',
      category: 'watering',
      title: 'Arrosage à la base des plantes',
      description: 'Arrosez toujours à la base des plantes plutôt que sur les feuilles. L\'humidité sur les feuilles favorise le développement de champignons et de maladies comme le mildiou. Arrosez tôt le matin pour que les plantes aient le temps de sécher pendant la journée.',
      difficulty: 'easy',
      effectiveness: 4,
      relatedPlants: ['Tomate', 'Concombre', 'Courgette'],
      relatedDiseases: ['Mildiou', 'Oïdium']
    },
    {
      id: 'tip-2',
      category: 'spacing',
      title: 'Espacement adéquat entre les plantes',
      description: 'Respectez les distances recommandées entre les plants pour favoriser une bonne circulation de l\'air. Un espacement insuffisant crée un environnement humide et confiné, idéal pour le développement des maladies. Pour les tomates, espacez d\'au moins 60-90 cm, pour les concombres 45-60 cm.',
      difficulty: 'medium',
      effectiveness: 5,
      relatedPlants: ['Tomate', 'Concombre', 'Poivron', 'Aubergine'],
      relatedDiseases: ['Oïdium', 'Botrytis']
    },
    {
      id: 'tip-3',
      category: 'soil',
      title: 'Rotation des cultures',
      description: 'Évitez de planter la même famille de végétaux au même endroit pendant plusieurs années consécutives. Cette pratique prévient l\'accumulation d\'agents pathogènes spécifiques dans le sol. Établissez un plan de rotation sur 3-4 ans en alternant les familles de plantes (solanacées, cucurbitacées, légumineuses, etc.).',
      difficulty: 'medium',
      effectiveness: 5,
      relatedPlants: ['Tomate', 'Pomme de terre', 'Haricot', 'Carotte'],
    },
    {
      id: 'tip-4',
      category: 'pruning',
      title: 'Suppression des feuilles basses',
      description: 'Pour les tomates et les concombres, retirez les feuilles basses qui touchent le sol ou qui jaunissent. Ces feuilles sont plus susceptibles d\'être infectées par des maladies transmises par le sol. Utilisez des outils propres et désinfectés pour éviter de propager des maladies.',
      difficulty: 'easy',
      effectiveness: 4,
      relatedPlants: ['Tomate', 'Concombre'],
      relatedDiseases: ['Alternariose', 'Mildiou']
    },
    {
      id: 'tip-5',
      category: 'natural',
      title: 'Purin d\'ortie préventif',
      description: 'Le purin d\'ortie renforce les défenses naturelles des plantes. Pour le préparer, faites macérer 1kg d\'orties fraîches dans 10L d\'eau pendant environ 2 semaines. Filtrez et diluez (1 volume de purin pour 10 volumes d\'eau) avant de pulvériser sur les plantes une fois par semaine en prévention.',
      difficulty: 'medium',
      effectiveness: 3,
      relatedPlants: ['Tomate', 'Pomme de terre', 'Fraisier', 'Rosier'],
      relatedDiseases: ['Mildiou', 'Rouille']
    },
    {
      id: 'tip-6',
      category: 'seasonal',
      title: 'Protection hivernale des arbres fruitiers',
      description: 'En automne, ramassez et détruisez les feuilles mortes et les fruits tombés pour éliminer les spores et les œufs de parasites. Appliquez un traitement d\'hiver à base d\'huile blanche sur les troncs et les branches pour éliminer les insectes hibernants et leurs œufs.',
      difficulty: 'medium',
      effectiveness: 4,
      relatedPlants: ['Pommier', 'Poirier', 'Pêcher', 'Abricotier'],
      relatedDiseases: ['Tavelure', 'Moniliose']
    },
  ];
  
  const filteredTips = preventionTips.filter(tip => {
    const matchesSearch = 
      tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || tip.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const toggleTip = (tipId: string) => {
    if (expandedTips.includes(tipId)) {
      setExpandedTips(expandedTips.filter(id => id !== tipId));
    } else {
      setExpandedTips([...expandedTips, tipId]);
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'text-success-500';
      case 'medium': return 'text-warning-500';
      case 'hard': return 'text-error-500';
      default: return 'text-gray-500';
    }
  };
  
  const getDifficultyLabel = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'Facile';
      case 'medium': return 'Moyen';
      case 'hard': return 'Difficile';
      default: return '';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Conseils de prévention</h1>
        <p className="text-gray-600">
          Découvrez les meilleures pratiques pour prévenir les maladies et maintenir vos plantes en bonne santé.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Rechercher un conseil..."
              className="input pr-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          
          <button className="btn-outline">
            <Filter size={18} className="mr-2" />
            Filtres avancés
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-20">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-lg">Catégories</h2>
            </div>
            <div className="p-2">
              <button
                className={`w-full text-left p-2 rounded-md mb-1 transition-colors ${
                  activeCategory === 'all' 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveCategory('all')}
              >
                Toutes les catégories
              </button>
              
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`w-full text-left p-2 rounded-md mb-1 transition-colors flex items-center ${
                    activeCategory === category.id 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
            
            <div className="p-4 bg-gray-50 border-t">
              <h3 className="font-medium text-sm mb-2">Légende difficulté</h3>
              <div className="space-y-1">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-success-500 mr-2"></span>
                  <span className="text-sm">Facile</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-warning-500 mr-2"></span>
                  <span className="text-sm">Moyen</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-error-500 mr-2"></span>
                  <span className="text-sm">Difficile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Prevention Tips */}
        <div className="lg:col-span-3">
          {/* Category Description (if specific category is selected) */}
          {activeCategory !== 'all' && (
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex items-center">
                <div className="text-2xl mr-3">
                  {categories.find(c => c.id === activeCategory)?.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">
                    {categories.find(c => c.id === activeCategory)?.name}
                  </h2>
                  <p className="text-gray-600">
                    {categories.find(c => c.id === activeCategory)?.description}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Tips List */}
          <div className="space-y-4">
            {filteredTips.map((tip) => {
              const isExpanded = expandedTips.includes(tip.id);
              
              return (
                <div 
                  key={tip.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden animate-fade-in"
                >
                  <button
                    className="w-full text-left p-4 flex justify-between items-center"
                    onClick={() => toggleTip(tip.id)}
                  >
                    <div className="flex items-center">
                      <div className="flex flex-col items-center mr-4">
                        <div className="text-2xl">
                          {categories.find(c => c.id === tip.category)?.icon}
                        </div>
                        <span className={`text-xs font-medium mt-1 ${getDifficultyColor(tip.difficulty)}`}>
                          {getDifficultyLabel(tip.difficulty)}
                        </span>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-lg">{tip.title}</h3>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <span 
                              key={i} 
                              className={`w-4 h-4 rounded-full mr-0.5 ${
                                i < tip.effectiveness 
                                  ? 'bg-primary-500' 
                                  : 'bg-gray-200'
                              }`}
                            ></span>
                          ))}
                          <span className="text-xs text-gray-500 ml-2">Efficacité</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      {isExpanded ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className="p-4 pt-0 border-t">
                      <p className="text-gray-700 mb-4 whitespace-pre-line">
                        {tip.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-6 mt-4">
                        {tip.relatedPlants && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-500 mb-2">Plantes concernées</h4>
                            <div className="flex flex-wrap gap-2">
                              {tip.relatedPlants.map((plant, i) => (
                                <span 
                                  key={i} 
                                  className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs"
                                >
                                  {plant}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {tip.relatedDiseases && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-500 mb-2">Maladies prévenues</h4>
                            <div className="flex flex-wrap gap-2">
                              {tip.relatedDiseases.map((disease, i) => (
                                <span 
                                  key={i} 
                                  className="px-2 py-1 bg-accent-50 text-accent-700 rounded-full text-xs"
                                >
                                  {disease}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <button className="text-primary-600 font-medium flex items-center hover:underline">
                          Voir les détails complets
                          <ArrowRight size={16} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            
            {filteredTips.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <p className="text-xl text-gray-500">
                  Aucun conseil ne correspond à votre recherche.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreventionTips;