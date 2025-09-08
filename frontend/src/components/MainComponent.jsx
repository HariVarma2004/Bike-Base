import React, { useState } from 'react';
import Navigation from './navigation/Navigation.jsx';
import BikeVariant from './ui/BikeVariant.jsx';
import StatCard from './ui/StatCard.jsx';
import MobileLayout from './layout/MobileLayout.jsx';
import DesktopLayout from './layout/DesktopLayout.jsx';



// Main Component
const MotovexLanding = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const bikeVariants = [
    { color: '#3B82F6', name: 'Blue' },
    { color: '#EF4444', name: 'Red' },
    { color: '#10B981', name: 'Green' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(6,182,212,0.05)_50%,transparent_100%)]"></div>

      {/* Navigation */}
      <Navigation
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Main Content */}
      <div className="relative z-10 px-4 md:px-6 py-6 md:py-12">
        {/* Mobile Layout - Only show on screens smaller than md */}
        <MobileLayout />
        {/* Desktop Layout - Only show on screens md and larger */}
        <DesktopLayout />
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-72 md:w-96 h-24 md:h-32 bg-gradient-to-t from-cyan-500/20 to-transparent blur-2xl md:blur-3xl"></div>
    </div>
  );
};

export default MotovexLanding;