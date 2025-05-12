import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DiseaseLibrary from './pages/DiseaseLibrary';
import GeoLocation from './pages/GeoLocation';
import Community from './pages/Community';
import PreventionTips from './pages/PreventionTips';
import Analytics from './pages/Analytics';
import DiagnosticHistory from './pages/DiagnosticHistory';
import Weather from './pages/Weather';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="diseases" element={<DiseaseLibrary />} />
            <Route path="geolocation" element={<GeoLocation />} />
            <Route path="community" element={<Community />} />
            <Route path="prevention" element={<PreventionTips />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="history" element={<DiagnosticHistory />} />
            <Route path="weather" element={<Weather />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;