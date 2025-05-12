import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <AlertCircle size={64} className="text-primary-500 mb-6" />
      <h1 className="text-4xl font-bold mb-4">Page non trouvée</h1>
      <p className="text-gray-600 max-w-md mb-8">
        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link to="/" className="btn-primary">
        <Home size={18} className="mr-2" />
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;