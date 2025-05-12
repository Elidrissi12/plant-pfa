// Plant Disease Types
export interface Disease {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  symptoms: string[];
  causes: string[];
  treatments: string[];
  prevention: string[];
  affectedPlants: string[];
  images: string[];
  severity: 'low' | 'medium' | 'high';
}

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  diseases: string[]; // IDs of diseases that affect this plant
  image: string;
}

// Geolocation Types
export interface DiseaseSighting {
  id: string;
  diseaseId: string;
  diseaseName: string;
  location: {
    lat: number;
    lng: number;
  };
  date: string;
  userId: string;
  verified: boolean;
  image?: string;
}

// Community Types
export interface Post {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  content: string;
  images: string[];
  createdAt: string;
  likes: number;
  comments: Comment[];
  tags: string[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  content: string;
  createdAt: string;
  likes: number;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  location?: {
    lat: number;
    lng: number;
    city?: string;
    country?: string;
  };
  joinedAt: string;
  plantCount: number;
  diagnosticCount: number;
}

// Diagnostic Types
export interface Diagnostic {
  id: string;
  plantId?: string;
  plantName: string;
  diseaseId?: string;
  diseaseName?: string;
  confidence: number;
  date: string;
  image: string;
  userId: string;
  notes?: string;
  treatmentApplied?: string[];
  status: 'healthy' | 'infected' | 'treated' | 'cured';
  location?: {
    lat: number;
    lng: number;
  };
}

// Weather Types
export interface WeatherData {
  location: string;
  date: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  wind: {
    speed: number;
    direction: string;
  };
  forecast: WeatherForecast[];
  alerts: WeatherAlert[];
}

export interface WeatherForecast {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  humidity: number;
  rainfall: number;
  description: string;
  icon: string;
}

export interface WeatherAlert {
  type: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
  startDate: string;
  endDate: string;
}

// Analytics Types
export interface AnalyticsData {
  mostCommonDiseases: {
    diseaseName: string;
    count: number;
  }[];
  mostAffectedPlants: {
    plantName: string;
    count: number;
  }[];
  diseaseTrends: {
    month: string;
    count: number;
  }[];
  geographicDistribution: {
    region: string;
    count: number;
  }[];
  preventionEffectiveness: {
    method: string;
    effectiveness: number;
  }[];
}