import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  Map, 
  Users, 
  ShieldCheck, 
  BarChart2, 
  Clock, 
  Cloud, 
  Camera, 
  ChevronRight 
} from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative -mt-16 py-24 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Détection intelligente des maladies des plantes
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Protégez vos cultures avec l'intelligence artificielle. Obtenez des diagnostics précis et des recommandations personnalisées.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="btn-lg bg-white text-primary-700 hover:bg-gray-100 transition-colors w-full sm:w-auto">
                <Camera size={20} className="mr-2" />
                Diagnostiquer une plante
              </button>
              <Link to="/diseases" className="btn-lg bg-primary-600 hover:bg-primary-500 text-white transition-colors w-full sm:w-auto">
                Explorer le dictionnaire
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-white opacity-10 rounded-full"></div>
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-white opacity-5 rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-white opacity-5 rounded-full"></div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Fonctionnalités clés</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Une solution complète pour la détection, la prévention et le suivi des maladies des plantes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: <Leaf />, 
                title: 'Dictionnaire des maladies', 
                description: 'Base de données complète des maladies des plantes avec symptômes, causes et traitements.', 
                link: '/diseases' 
              },
              { 
                icon: <Map />, 
                title: 'Géolocalisation', 
                description: 'Visualisez la distribution géographique des maladies pour mieux protéger vos cultures.', 
                link: '/geolocation' 
              },
              { 
                icon: <Users />, 
                title: 'Communauté', 
                description: 'Partagez vos expériences et obtenez des conseils de la communauté.', 
                link: '/community' 
              },
              { 
                icon: <ShieldCheck />, 
                title: 'Conseils de prévention', 
                description: 'Recommandations personnalisées pour prévenir les maladies des plantes.', 
                link: '/prevention' 
              },
              { 
                icon: <BarChart2 />, 
                title: 'Analytiques', 
                description: 'Visualisez les tendances et statistiques sur les maladies des plantes.', 
                link: '/analytics' 
              },
              { 
                icon: <Clock />, 
                title: 'Historique des diagnostics', 
                description: 'Suivez l\'évolution de vos plantes et l\'efficacité des traitements.', 
                link: '/history' 
              },
              { 
                icon: <Cloud />, 
                title: 'Météo agricole', 
                description: 'Prévisions météo avec des recommandations pour protéger vos cultures.', 
                link: '/weather' 
              },
              { 
                icon: <Camera />, 
                title: 'Diagnostic IA', 
                description: 'Identification précise des maladies grâce à l\'intelligence artificielle.', 
                link: '#' 
              },
            ].map((feature, index) => (
              <div key={index} className="card card-hover p-6 flex flex-col h-full animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{feature.description}</p>
                <Link 
                  to={feature.link} 
                  className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center group"
                >
                  Découvrir
                  <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Prêt à protéger vos cultures ?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Commencez dès maintenant à diagnostiquer et prévenir les maladies de vos plantes avec notre technologie avancée.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="btn-lg btn-primary w-full sm:w-auto">
                <Camera size={20} className="mr-2" />
                Diagnostiquer une plante
              </button>
              <button className="btn-lg btn-outline w-full sm:w-auto">
                Créer un compte
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;