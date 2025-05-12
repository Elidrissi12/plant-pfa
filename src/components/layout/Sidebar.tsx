import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  X, 
  FileText, 
  MapPin, 
  Users, 
  ShieldCheck, 
  BarChart2, 
  Clock, 
  Cloud, 
  Home, 
  Camera
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navItems: NavItem[] = [
    { path: '/', label: 'Accueil', icon: <Home size={20} /> },
    { path: '/diseases', label: 'Dictionnaire des maladies', icon: <FileText size={20} /> },
    { path: '/geolocation', label: 'Géolocalisation', icon: <MapPin size={20} /> },
    { path: '/community', label: 'Communauté', icon: <Users size={20} /> },
    { path: '/prevention', label: 'Conseils de prévention', icon: <ShieldCheck size={20} /> },
    { path: '/analytics', label: 'Analytiques', icon: <BarChart2 size={20} /> },
    { path: '/history', label: 'Historique des diagnostics', icon: <Clock size={20} /> },
    { path: '/weather', label: 'Météo agricole', icon: <Cloud size={20} /> },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-primary-700">Menu</h2>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
              onClick={() => {
                if (window.innerWidth < 1024) {
                  toggleSidebar();
                }
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 mt-auto border-t">
          <button className="btn-primary w-full">
            <Camera size={18} className="mr-2" />
            <span>Diagnostiquer une plante</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;