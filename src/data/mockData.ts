import type { 
  Disease, 
  DiseaseSighting, 
  Post, 
  Comment, 
  Diagnostic,
  WeatherData,
  AnalyticsData
} from '../types';

// Mock diseases data
export const mockDiseases: Disease[] = [
  {
    id: 'disease-1',
    name: 'Mildiou',
    scientificName: 'Phytophthora infestans',
    description: 'Le mildiou est une maladie fongique qui affecte principalement les tomates et les pommes de terre. Il se développe dans des conditions humides et fraîches.',
    symptoms: [
      'Taches brunes ou vertes foncées sur les feuilles',
      'Duvet blanc sur la face inférieure des feuilles',
      'Pourriture des fruits',
      'Flétrissement rapide des plants'
    ],
    causes: [
      'Humidité élevée',
      'Températures fraîches (10-25°C)',
      'Mauvaise circulation d\'air',
      'Arrosage par le haut'
    ],
    treatments: [
      'Fongicides à base de cuivre',
      'Élimination des parties infectées',
      'Amélioration de la circulation d\'air'
    ],
    prevention: [
      'Rotation des cultures',
      'Arrosage à la base des plantes',
      'Espacement adéquat',
      'Utilisation de variétés résistantes'
    ],
    affectedPlants: ['Tomate', 'Pomme de terre', 'Aubergine'],
    images: [
      'https://images.pexels.com/photos/7728096/pexels-photo-7728096.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/7728097/pexels-photo-7728097.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    severity: 'high'
  },
  {
    id: 'disease-2',
    name: 'Oïdium',
    scientificName: 'Erysiphe cichoracearum',
    description: 'L\'oïdium est une maladie fongique qui se manifeste par un feutrage blanc sur les feuilles et les tiges. Il prospère dans des conditions chaudes et sèches.',
    symptoms: [
      'Feutrage blanc poudreux sur les feuilles',
      'Déformation des feuilles',
      'Ralentissement de la croissance',
      'Jaunissement des feuilles'
    ],
    causes: [
      'Temps chaud et sec',
      'Humidité nocturne',
      'Mauvaise circulation d\'air',
      'Excès d\'azote'
    ],
    treatments: [
      'Fongicides à base de soufre',
      'Pulvérisation de bicarbonate de soude',
      'Huiles essentielles de thym ou d\'origan'
    ],
    prevention: [
      'Espacement adéquat des plants',
      'Arrosage à la base des plantes',
      'Utilisation de variétés résistantes',
      'Éviter l\'excès d\'azote'
    ],
    affectedPlants: ['Concombre', 'Courgette', 'Rosier', 'Vigne'],
    images: [
      'https://images.pexels.com/photos/6231898/pexels-photo-6231898.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/6231937/pexels-photo-6231937.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    severity: 'medium'
  },
  {
    id: 'disease-3',
    name: 'Rouille',
    scientificName: 'Puccinia spp.',
    description: 'La rouille est une maladie fongique caractérisée par des pustules de couleur rouille sur les feuilles et les tiges. Elle peut affecter de nombreuses plantes.',
    symptoms: [
      'Pustules orangées ou brunes sur les feuilles',
      'Jaunissement des feuilles',
      'Défoliation prématurée',
      'Ralentissement de la croissance'
    ],
    causes: [
      'Humidité élevée',
      'Températures modérées',
      'Mauvaise circulation d\'air',
      'Présence de plantes hôtes alternatives'
    ],
    treatments: [
      'Fongicides à base de cuivre',
      'Élimination des parties infectées',
      'Pulvérisation de bicarbonate de soude'
    ],
    prevention: [
      'Rotation des cultures',
      'Espacement adéquat',
      'Élimination des plantes hôtes alternatives',
      'Arrosage à la base des plantes'
    ],
    affectedPlants: ['Haricot', 'Rosier', 'Céréales', 'Ail', 'Poireau'],
    images: [
      'https://images.pexels.com/photos/6231904/pexels-photo-6231904.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/6231905/pexels-photo-6231905.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    severity: 'medium'
  },
  {
    id: 'disease-4',
    name: 'Tache noire',
    scientificName: 'Diplocarpon rosae',
    description: 'La tache noire est une maladie fongique qui affecte principalement les rosiers. Elle se caractérise par des taches noires circulaires sur les feuilles.',
    symptoms: [
      'Taches noires circulaires sur les feuilles',
      'Jaunissement autour des taches',
      'Défoliation prématurée',
      'Affaiblissement du plant'
    ],
    causes: [
      'Humidité élevée',
      'Arrosage par le haut',
      'Mauvaise circulation d\'air',
      'Débris végétaux contaminés'
    ],
    treatments: [
      'Fongicides à base de cuivre',
      'Pulvérisation de purin de prêle',
      'Élimination des feuilles infectées'
    ],
    prevention: [
      'Arrosage à la base des plantes',
      'Nettoyage des débris végétaux',
      'Espacement adéquat',
      'Utilisation de variétés résistantes'
    ],
    affectedPlants: ['Rosier'],
    images: [
      'https://images.pexels.com/photos/7190194/pexels-photo-7190194.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/7190197/pexels-photo-7190197.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    severity: 'medium'
  },
  {
    id: 'disease-5',
    name: 'Botrytis',
    scientificName: 'Botrytis cinerea',
    description: 'Le botrytis, aussi appelé pourriture grise, est un champignon qui s\'attaque à de nombreuses plantes, surtout en conditions humides et fraîches.',
    symptoms: [
      'Moisissure grise duveteuse sur les fruits et fleurs',
      'Pourriture des tiges, feuilles et fruits',
      'Taches brunes sur les feuilles',
      'Flétrissement des fleurs'
    ],
    causes: [
      'Humidité élevée',
      'Températures fraîches',
      'Mauvaise circulation d\'air',
      'Blessures sur la plante'
    ],
    treatments: [
      'Fongicides spécifiques',
      'Élimination des parties infectées',
      'Amélioration de la ventilation'
    ],
    prevention: [
      'Espacement adéquat',
      'Arrosage à la base des plantes',
      'Éviter les blessures',
      'Protection contre l\'humidité excessive'
    ],
    affectedPlants: ['Tomate', 'Fraise', 'Vigne', 'Laitue', 'Plantes d\'ornement'],
    images: [
      'https://images.pexels.com/photos/7190274/pexels-photo-7190274.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/7190275/pexels-photo-7190275.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    severity: 'high'
  },
  {
    id: 'disease-6',
    name: 'Alternariose',
    scientificName: 'Alternaria solani',
    description: 'L\'alternariose est une maladie fongique qui provoque des taches brunes concentriques sur les feuilles et peut affecter les fruits des solanacées.',
    symptoms: [
      'Taches brunes concentriques sur les feuilles',
      'Jaunissement autour des taches',
      'Taches sombres déprimées sur les fruits',
      'Défoliation'
    ],
    causes: [
      'Humidité élevée',
      'Températures chaudes',
      'Sol contaminé',
      'Plants affaiblis'
    ],
    treatments: [
      'Fongicides à base de cuivre',
      'Élimination des parties infectées',
      'Rotation des cultures'
    ],
    prevention: [
      'Utilisation de semences saines',
      'Rotation des cultures',
      'Arrosage à la base',
      'Espacement adéquat'
    ],
    affectedPlants: ['Tomate', 'Pomme de terre', 'Carotte', 'Chou'],
    images: [
      'https://images.pexels.com/photos/12497775/pexels-photo-12497775.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/12497776/pexels-photo-12497776.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    severity: 'medium'
  }
];

// Mock disease sightings for geolocation
export const mockDiseaseSightings: DiseaseSighting[] = [
  {
    id: 'sighting-1',
    diseaseId: 'disease-1',
    diseaseName: 'Mildiou',
    location: {
      lat: 48.8566,
      lng: 2.3522
    },
    date: '2024-07-10T14:23:00Z',
    userId: 'user-1',
    verified: true,
    image: 'https://images.pexels.com/photos/7728096/pexels-photo-7728096.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'sighting-2',
    diseaseId: 'disease-2',
    diseaseName: 'Oïdium',
    location: {
      lat: 45.7640,
      lng: 4.8357
    },
    date: '2024-07-08T09:15:00Z',
    userId: 'user-2',
    verified: true,
    image: 'https://images.pexels.com/photos/6231898/pexels-photo-6231898.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'sighting-3',
    diseaseId: 'disease-1',
    diseaseName: 'Mildiou',
    location: {
      lat: 43.2965,
      lng: 5.3698
    },
    date: '2024-07-07T16:42:00Z',
    userId: 'user-3',
    verified: true
  },
  {
    id: 'sighting-4',
    diseaseId: 'disease-3',
    diseaseName: 'Rouille',
    location: {
      lat: 47.2184,
      lng: -1.5536
    },
    date: '2024-07-05T11:30:00Z',
    userId: 'user-4',
    verified: true,
    image: 'https://images.pexels.com/photos/6231904/pexels-photo-6231904.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'sighting-5',
    diseaseId: 'disease-5',
    diseaseName: 'Botrytis',
    location: {
      lat: 44.8378,
      lng: -0.5792
    },
    date: '2024-07-03T14:15:00Z',
    userId: 'user-5',
    verified: true
  },
  {
    id: 'sighting-6',
    diseaseId: 'disease-2',
    diseaseName: 'Oïdium',
    location: {
      lat: 48.5734,
      lng: 7.7521
    },
    date: '2024-07-01T10:23:00Z',
    userId: 'user-6',
    verified: true
  },
  {
    id: 'sighting-7',
    diseaseId: 'disease-4',
    diseaseName: 'Tache noire',
    location: {
      lat: 43.6109,
      lng: 3.8772
    },
    date: '2024-06-28T15:30:00Z',
    userId: 'user-7',
    verified: true,
    image: 'https://images.pexels.com/photos/7190194/pexels-photo-7190194.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'sighting-8',
    diseaseId: 'disease-1',
    diseaseName: 'Mildiou',
    location: {
      lat: 50.6292,
      lng: 3.0573
    },
    date: '2024-06-25T09:47:00Z',
    userId: 'user-8',
    verified: true
  }
];

// Mock comments for community posts
export const mockComments: Comment[] = [
  {
    id: 'comment-1',
    userId: 'user-2',
    userName: 'Sophie Dubois',
    userImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'J\'ai eu le même problème l\'année dernière. Le purin d\'orties a bien fonctionné pour moi !',
    createdAt: '2024-07-10T11:45:00Z',
    likes: 3
  },
  {
    id: 'comment-2',
    userId: 'user-3',
    userName: 'Jean Martin',
    userImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'As-tu essayé de traiter avec du bicarbonate de soude ? C\'est très efficace contre l\'oïdium.',
    createdAt: '2024-07-10T12:15:00Z',
    likes: 5
  },
  {
    id: 'comment-3',
    userId: 'user-4',
    userName: 'Marie Lambert',
    userImage: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'Superbes tomates ! Quelle variété cultives-tu ?',
    createdAt: '2024-07-09T16:30:00Z',
    likes: 2
  },
  {
    id: 'comment-4',
    userId: 'user-5',
    userName: 'Pierre Durand',
    userImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'Je recommande aussi de faire une rotation des cultures pour éviter ce problème à l\'avenir.',
    createdAt: '2024-07-10T13:05:00Z',
    likes: 4
  }
];

// Mock community posts
export const mockPosts: Post[] = [
  {
    id: 'post-1',
    userId: 'user-1',
    userName: 'Thomas Bernard',
    userImage: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'Mes plants de tomates présentent des taches brunes sur les feuilles et commencent à flétrir. Quelqu\'un sait-il de quoi il pourrait s\'agir ? J\'ai peur que ce soit du mildiou.',
    images: [
      'https://images.pexels.com/photos/7728096/pexels-photo-7728096.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/7728097/pexels-photo-7728097.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    createdAt: '2024-07-10T10:30:00Z',
    likes: 8,
    comments: [mockComments[0], mockComments[1], mockComments[3]],
    tags: ['tomate', 'maladie', 'aide']
  },
  {
    id: 'post-2',
    userId: 'user-6',
    userName: 'Lucie Moreau',
    userImage: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'Récolte du jour ! Mes tomates sont enfin mûres. J\'ai utilisé du compost maison cette année et le résultat est impressionnant.',
    images: [
      'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    createdAt: '2024-07-09T15:45:00Z',
    likes: 15,
    comments: [mockComments[2]],
    tags: ['récolte', 'tomate', 'compost', 'succès']
  },
  {
    id: 'post-3',
    userId: 'user-3',
    userName: 'Jean Martin',
    userImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'J\'ai planté ces rosiers il y a deux mois et ils sont maintenant couverts de taches noires. Est-ce que quelqu\'un connaît un remède naturel pour cette maladie ?',
    images: [
      'https://images.pexels.com/photos/7190194/pexels-photo-7190194.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    createdAt: '2024-07-08T09:20:00Z',
    likes: 7,
    comments: [],
    tags: ['rosier', 'maladie', 'tache noire', 'remède naturel']
  },
  {
    id: 'post-4',
    userId: 'user-7',
    userName: 'Emma Petit',
    userImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'J\'ai commencé à utiliser des purins de plantes comme traitement préventif cette année. Ortie, consoude et prêle. Mes plants n\'ont jamais été aussi vigoureux !',
    images: [],
    createdAt: '2024-07-07T14:10:00Z',
    likes: 12,
    comments: [],
    tags: ['purin', 'prévention', 'ortie', 'méthode naturelle']
  }
];

// Mock diagnostic history
export const mockDiagnostics: Diagnostic[] = [
  {
    id: 'diagnostic-1',
    plantName: 'Tomate Roma',
    diseaseId: 'disease-1',
    diseaseName: 'Mildiou',
    confidence: 92,
    date: '2024-07-10T14:23:00Z',
    image: 'https://images.pexels.com/photos/7728096/pexels-photo-7728096.jpeg?auto=compress&cs=tinysrgb&w=300',
    userId: 'current-user',
    notes: 'Symptômes observés sur les feuilles basses, progression rapide vers le haut.',
    treatmentApplied: ['Fongicide à base de cuivre', 'Élimination des feuilles infectées'],
    status: 'treated',
    location: {
      lat: 48.8566,
      lng: 2.3522
    }
  },
  {
    id: 'diagnostic-2',
    plantName: 'Concombre',
    diseaseId: 'disease-2',
    diseaseName: 'Oïdium',
    confidence: 87,
    date: '2024-07-02T09:45:00Z',
    image: 'https://images.pexels.com/photos/6231898/pexels-photo-6231898.jpeg?auto=compress&cs=tinysrgb&w=300',
    userId: 'current-user',
    notes: 'Feutrage blanc sur les feuilles, particulièrement sur les plus âgées.',
    treatmentApplied: ['Pulvérisation de bicarbonate de soude', 'Amélioration de la ventilation'],
    status: 'cured',
    location: {
      lat: 48.8566,
      lng: 2.3522
    }
  },
  {
    id: 'diagnostic-3',
    plantName: 'Rosier Pierre de Ronsard',
    diseaseId: 'disease-4',
    diseaseName: 'Tache noire',
    confidence: 95,
    date: '2024-06-20T16:30:00Z',
    image: 'https://images.pexels.com/photos/7190194/pexels-photo-7190194.jpeg?auto=compress&cs=tinysrgb&w=300',
    userId: 'current-user',
    treatmentApplied: ['Fongicide', 'Suppression des feuilles atteintes'],
    status: 'treated',
    location: {
      lat: 48.8566,
      lng: 2.3522
    }
  },
  {
    id: 'diagnostic-4',
    plantName: 'Fraisier Charlotte',
    diseaseId: 'disease-5',
    diseaseName: 'Botrytis',
    confidence: 89,
    date: '2024-06-15T10:15:00Z',
    image: 'https://images.pexels.com/photos/7190274/pexels-photo-7190274.jpeg?auto=compress&cs=tinysrgb&w=300',
    userId: 'current-user',
    notes: 'Pourriture grise sur quelques fruits et certaines feuilles.',
    treatmentApplied: ['Élimination des parties infectées', 'Réduction de l\'arrosage', 'Amélioration de la ventilation'],
    status: 'cured',
    location: {
      lat: 48.8566,
      lng: 2.3522
    }
  },
  {
    id: 'diagnostic-5',
    plantName: 'Basilic Genovese',
    diseaseId: null,
    diseaseName: null,
    confidence: 98,
    date: '2024-06-10T15:45:00Z',
    image: 'https://images.pexels.com/photos/977903/pexels-photo-977903.jpeg?auto=compress&cs=tinysrgb&w=300',
    userId: 'current-user',
    notes: 'Plante en parfaite santé, aucun signe de maladie.',
    status: 'healthy',
    location: {
      lat: 48.8566,
      lng: 2.3522
    }
  },
  {
    id: 'diagnostic-6',
    plantName: 'Courgette',
    diseaseId: 'disease-2',
    diseaseName: 'Oïdium',
    confidence: 91,
    date: '2024-05-28T11:20:00Z',
    image: 'https://images.pexels.com/photos/6231937/pexels-photo-6231937.jpeg?auto=compress&cs=tinysrgb&w=300',
    userId: 'current-user',
    treatmentApplied: ['Pulvérisation de lait dilué', 'Suppression des feuilles les plus atteintes'],
    status: 'infected',
    location: {
      lat: 48.8566,
      lng: 2.3522
    }
  },
  {
    id: 'diagnostic-7',
    plantName: 'Tomate Cerise',
    diseaseId: null,
    diseaseName: null,
    confidence: 96,
    date: '2024-05-20T14:10:00Z',
    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=300',
    userId: 'current-user',
    notes: 'Plants vigoureux sans symptômes de maladie.',
    status: 'healthy',
    location: {
      lat: 48.8566,
      lng: 2.3522
    }
  }
];

// Mock weather data
export const mockWeatherData: WeatherData = {
  location: 'Paris, France',
  date: '2024-07-11T08:30:00Z',
  temperature: 24,
  humidity: 78,
  rainfall: 0,
  wind: {
    speed: 15,
    direction: 'SO'
  },
  forecast: [
    {
      date: '2024-07-11T12:00:00Z',
      temperature: {
        min: 18,
        max: 27
      },
      humidity: 78,
      rainfall: 0,
      description: 'Partiellement nuageux',
      icon: 'partly-cloudy'
    },
    {
      date: '2024-07-12T12:00:00Z',
      temperature: {
        min: 17,
        max: 25
      },
      humidity: 85,
      rainfall: 3.5,
      description: 'Averses éparses',
      icon: 'rain'
    },
    {
      date: '2024-07-13T12:00:00Z',
      temperature: {
        min: 16,
        max: 23
      },
      humidity: 90,
      rainfall: 8.2,
      description: 'Pluie modérée',
      icon: 'rain'
    },
    {
      date: '2024-07-14T12:00:00Z',
      temperature: {
        min: 18,
        max: 24
      },
      humidity: 75,
      rainfall: 1.2,
      description: 'Quelques averses',
      icon: 'rain'
    },
    {
      date: '2024-07-15T12:00:00Z',
      temperature: {
        min: 19,
        max: 26
      },
      humidity: 65,
      rainfall: 0,
      description: 'Ensoleillé',
      icon: 'sunny'
    }
  ],
  alerts: [
    {
      type: 'Risque élevé de mildiou',
      severity: 'high',
      message: 'Les conditions actuelles (humidité élevée et températures modérées) favorisent le développement du mildiou. Surveillez vos plants de tomates et pommes de terre.',
      startDate: '2024-07-11T00:00:00Z',
      endDate: '2024-07-13T23:59:59Z'
    },
    {
      type: 'Alerte pluie',
      severity: 'medium',
      message: 'Précipitations modérées à fortes prévues pour les 48 prochaines heures. Assurez-vous que vos cultures ont un bon drainage.',
      startDate: '2024-07-12T00:00:00Z',
      endDate: '2024-07-13T23:59:59Z'
    }
  ]
};

// Mock analytics data
export const mockAnalyticsData: AnalyticsData = {
  mostCommonDiseases: [
    { diseaseName: 'Mildiou', count: 32 },
    { diseaseName: 'Oïdium', count: 28 },
    { diseaseName: 'Botrytis', count: 20 },
    { diseaseName: 'Rouille', count: 15 },
    { diseaseName: 'Tache noire', count: 12 }
  ],
  mostAffectedPlants: [
    { plantName: 'Tomate', count: 45 },
    { plantName: 'Vigne', count: 28 },
    { plantName: 'Rosier', count: 25 },
    { plantName: 'Pomme de terre', count: 20 },
    { plantName: 'Concombre', count: 18 },
    { plantName: 'Autres', count: 42 }
  ],
  diseaseTrends: [
    { month: 'Jan', count: 22 },
    { month: 'Fév', count: 18 },
    { month: 'Mar', count: 25 },
    { month: 'Avr', count: 32 },
    { month: 'Mai', count: 48 },
    { month: 'Juin', count: 65 },
    { month: 'Juil', count: 72 }
  ],
  geographicDistribution: [
    { region: 'Île-de-France', count: 45 },
    { region: 'Provence-Alpes-Côte d\'Azur', count: 38 },
    { region: 'Nouvelle-Aquitaine', count: 35 },
    { region: 'Occitanie', count: 32 },
    { region: 'Autres régions', count: 28 }
  ],
  preventionEffectiveness: [
    { method: 'Rotation des cultures', effectiveness: 85 },
    { method: 'Utilisation de variétés résistantes', effectiveness: 78 },
    { method: 'Espacement optimal', effectiveness: 72 },
    { method: 'Arrosage à la base', effectiveness: 68 },
    { method: 'Traitements préventifs', effectiveness: 62 },
    { method: 'Paillage', effectiveness: 58 }
  ]
};