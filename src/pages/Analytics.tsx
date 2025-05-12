import React, { useState } from 'react';
import { 
  Calendar, 
  Maximize2, 
  Download, 
  Filter, 
  ChevronDown, 
  Globe, 
  BarChart2,
  PieChart,
  TrendingUp
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import type { AnalyticsData } from '../types';
import { mockAnalyticsData } from '../data/mockData';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics: React.FC = () => {
  const [analyticsData] = useState<AnalyticsData>(mockAnalyticsData);
  const [timeRange, setTimeRange] = useState('6months');
  
  // Bar chart data for most common diseases
  const diseaseChartData = {
    labels: analyticsData.mostCommonDiseases.map(d => d.diseaseName),
    datasets: [
      {
        label: 'Occurrences',
        data: analyticsData.mostCommonDiseases.map(d => d.count),
        backgroundColor: '#40916c',
        borderColor: '#2d6a4f',
        borderWidth: 1,
      },
    ],
  };
  
  // Pie chart data for most affected plants
  const plantChartData = {
    labels: analyticsData.mostAffectedPlants.map(p => p.plantName),
    datasets: [
      {
        label: 'Occurrences',
        data: analyticsData.mostAffectedPlants.map(p => p.count),
        backgroundColor: [
          '#40916c',
          '#52b788',
          '#74c69d',
          '#95d5b2',
          '#b7e4c7',
          '#d8f3dc',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Line chart data for disease trends
  const trendChartData = {
    labels: analyticsData.diseaseTrends.map(t => t.month),
    datasets: [
      {
        label: 'Maladies détectées',
        data: analyticsData.diseaseTrends.map(t => t.count),
        borderColor: '#40916c',
        backgroundColor: 'rgba(64, 145, 108, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };
  
  // Donut chart for geographic distribution
  const geoChartData = {
    labels: analyticsData.geographicDistribution.map(g => g.region),
    datasets: [
      {
        label: 'Occurrences',
        data: analyticsData.geographicDistribution.map(g => g.count),
        backgroundColor: [
          '#ff7e0d',
          '#ff9d33',
          '#ffbf6b',
          '#ffd39d',
          '#ffe7ce',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Bar chart for prevention effectiveness
  const preventionChartData = {
    labels: analyticsData.preventionEffectiveness.map(p => p.method),
    datasets: [
      {
        label: 'Efficacité (%)',
        data: analyticsData.preventionEffectiveness.map(p => p.effectiveness),
        backgroundColor: '#52b788',
        borderColor: '#40916c',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tableau de bord analytique</h1>
        <p className="text-gray-600">
          Visualisez et analysez les tendances des maladies des plantes pour mieux comprendre et prévenir.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              className="input appearance-none pr-10"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="1month">Dernier mois</option>
              <option value="3months">3 derniers mois</option>
              <option value="6months">6 derniers mois</option>
              <option value="1year">Dernière année</option>
              <option value="all">Toutes les données</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
          
          <button className="btn-outline">
            <Calendar size={18} className="mr-2" />
            Personnaliser
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="btn-outline">
            <Filter size={18} className="mr-2" />
            Filtrer
          </button>
          <button className="btn-outline">
            <Download size={18} className="mr-2" />
            Exporter
          </button>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Most Common Diseases */}
        <div className="bg-white rounded-lg shadow-md p-4 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Maladies les plus fréquentes</h2>
              <p className="text-sm text-gray-500">Top 5 des maladies détectées</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <Maximize2 size={18} />
            </button>
          </div>
          
          <div className="h-80">
            <Bar 
              data={diseaseChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }} 
            />
          </div>
        </div>
        
        {/* Most Affected Plants */}
        <div className="bg-white rounded-lg shadow-md p-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Plantes les plus touchées</h2>
              <p className="text-sm text-gray-500">Répartition par type de plante</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <Maximize2 size={18} />
            </button>
          </div>
          
          <div className="h-80 flex items-center justify-center">
            <div className="w-64 h-64">
              <Pie 
                data={plantChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                  },
                }} 
              />
            </div>
          </div>
        </div>
        
        {/* Disease Trend */}
        <div className="bg-white rounded-lg shadow-md p-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Évolution temporelle</h2>
              <p className="text-sm text-gray-500">Tendance des détections sur la période</p>
            </div>
            <div className="flex items-center">
              <span className="flex items-center text-sm text-primary-600 mr-4">
                <TrendingUp size={16} className="mr-1" />
                +12.5%
              </span>
              <button className="text-gray-400 hover:text-gray-600">
                <Maximize2 size={18} />
              </button>
            </div>
          </div>
          
          <div className="h-80">
            <Line 
              data={trendChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }} 
            />
          </div>
        </div>
        
        {/* Geographic Distribution */}
        <div className="bg-white rounded-lg shadow-md p-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Distribution géographique</h2>
              <p className="text-sm text-gray-500">Répartition par région</p>
            </div>
            <div className="flex items-center">
              <button className="text-primary-600 text-sm font-medium mr-4 flex items-center">
                <Globe size={16} className="mr-1" />
                Voir sur la carte
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <Maximize2 size={18} />
              </button>
            </div>
          </div>
          
          <div className="h-80 flex items-center justify-center">
            <div className="w-64 h-64">
              <Doughnut 
                data={geoChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                  },
                  cutout: '60%',
                }} 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Charts */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Efficacité des méthodes de prévention</h2>
            <p className="text-sm text-gray-500">Pourcentage de réussite des différentes approches</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <Maximize2 size={18} />
          </button>
        </div>
        
        <div className="h-80">
          <Bar 
            data={preventionChartData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                  ticks: {
                    callback: function(value) {
                      return value + '%';
                    }
                  }
                },
              },
            }} 
          />
        </div>
      </div>
      
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          { 
            title: 'Diagnostics totaux', 
            value: '1,248', 
            change: '+12.3%', 
            isPositive: false,
            icon: <BarChart2 size={20} className="text-primary-500" />,
            color: 'bg-primary-50 text-primary-700'
          },
          { 
            title: 'Maladies uniques', 
            value: '42', 
            change: '+5.1%', 
            isPositive: false,
            icon: <PieChart size={20} className="text-accent-500" />,
            color: 'bg-accent-50 text-accent-700'
          },
          { 
            title: 'Taux de prévention', 
            value: '68%', 
            change: '+7.5%', 
            isPositive: true,
            icon: <TrendingUp size={20} className="text-success-500" />,
            color: 'bg-success-50 text-success-700'
          },
          { 
            title: 'Régions actives', 
            value: '24', 
            change: '+2', 
            isPositive: true,
            icon: <Globe size={20} className="text-secondary-500" />,
            color: 'bg-secondary-50 text-secondary-700'
          },
        ].map((stat, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-md p-4 animate-fade-in" 
            style={{ animationDelay: `${0.5 + index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center`}>
                {stat.icon}
              </div>
              <span className={`text-sm font-medium ${
                stat.isPositive ? 'text-success-600' : 'text-error-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm mt-4">{stat.title}</h3>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;