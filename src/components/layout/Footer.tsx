import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-primary-600" />
              <span className="font-bold text-xl text-primary-700">PlantGuard</span>
            </Link>
            <p className="mt-4 text-gray-600">
              Solution innovante pour la détection des maladies des plantes grâce à l'intelligence artificielle.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-base font-semibold mb-4">Fonctionnalités</h3>
            <ul className="space-y-2">
              <li><Link to="/diseases" className="text-gray-600 hover:text-primary-600 transition-colors">Dictionnaire des maladies</Link></li>
              <li><Link to="/geolocation" className="text-gray-600 hover:text-primary-600 transition-colors">Géolocalisation</Link></li>
              <li><Link to="/community" className="text-gray-600 hover:text-primary-600 transition-colors">Communauté</Link></li>
              <li><Link to="/prevention" className="text-gray-600 hover:text-primary-600 transition-colors">Conseils de prévention</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li><Link to="/analytics" className="text-gray-600 hover:text-primary-600 transition-colors">Analytiques</Link></li>
              <li><Link to="/history" className="text-gray-600 hover:text-primary-600 transition-colors">Historique des diagnostics</Link></li>
              <li><Link to="/weather" className="text-gray-600 hover:text-primary-600 transition-colors">Météo agricole</Link></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">Conditions d'utilisation</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} PlantGuard. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;