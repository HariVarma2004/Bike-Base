import React, { useState } from 'react';

// Navigation Component
const Navigation = ({ mobileMenuOpen, onToggleMobileMenu }) => {
  return (
    <nav className="relative z-20 px-4 md:px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-cyan-400">MOTOVEX</div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-8">
        <a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a>
        <a href="#" className="text-gray-300 hover:text-white transition-colors">Models</a>
        <a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a>
        <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
      </div>
      
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-gray-300 focus:outline-none"
        onClick={onToggleMobileMenu}
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-gray-800 md:hidden">
          <div className="flex flex-col space-y-4 p-4">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Models</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
};

// Bike Variant Component
const BikeVariant = ({ color, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 rounded-full border-2 ${active ? 'border-white' : 'border-gray-500'} transition-all duration-300 flex items-center justify-center`}
      style={{ backgroundColor: color }}
      aria-label={`Select ${color} variant`}
    >
      {active && <span className="text-white">✓</span>}
    </button>
  );
};

// Stat Card Component
const StatCard = ({ value, unit, label, icon }) => {
  return (
    <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-cyan-400 font-semibold">{unit}</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
    </div>
  );
};

// Main Component
const MotovexLanding = () => {
  const [activeVariant, setActiveVariant] = useState(0);
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
        <div className="block md:hidden">
          {/* Hero Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-white to-gray-300 leading-none mb-6">
              MOTOVEX
            </h1>
            
            {/* Mobile Bike Image */}
            <div className="relative mx-auto w-64 sm:w-72 h-40 sm:h-48 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-teal-400/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl h-full flex items-center justify-center border border-gray-600 shadow-2xl">
                <div className="text-3xl sm:text-4xl">🏍</div>
              </div>
            </div>

            {/* Mobile Bike Variants */}
            <div className="flex justify-center space-x-3 mb-8">
              {bikeVariants.map((variant, index) => (
                <BikeVariant
                  key={index}
                  color={variant.color}
                  active={activeVariant === index}
                  onClick={() => setActiveVariant(index)}
                />
              ))}
            </div>
          </div>

          {/* Mobile Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <StatCard 
              value="420" 
              unit="MILE" 
              label="Range"
              icon="⚡"
            />
            <StatCard 
              value="310" 
              unit="KM/H" 
              label="Speed"
              icon="🏍"
            />
            <StatCard 
              value="2024" 
              unit="YEAR" 
              label="Model"
              icon="📅"
            />
          </div>

          {/* Mobile Product Info */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-3 text-cyan-400">Motovex H2R</h2>
            <p className="text-gray-300 leading-relaxed text-sm mb-4">
              The Motovex H2R is a futuristic electric superbike featuring a sleek aerodynamic body and cutting-edge LED lighting.
            </p>
            
            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div>
                <div className="text-gray-400">Battery</div>
                <div className="text-white font-semibold">72V 40Ah</div>
              </div>
              <div>
                <div className="text-gray-400">Motor</div>
                <div className="text-white font-semibold">8000W</div>
              </div>
              <div>
                <div className="text-gray-400">Weight</div>
                <div className="text-white font-semibold">180kg</div>
              </div>
              <div>
                <div className="text-gray-400">Charge</div>
                <div className="text-white font-semibold">4 hours</div>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-3 rounded-xl hover:from-cyan-400 hover:to-teal-400 transition-all duration-300 font-semibold">
              Learn More
            </button>
          </div>
        </div>

        {/* Desktop Layout - Only show on screens md and larger */}
        <div className="hidden md:flex items-center justify-between">
          {/* Left Side - Stats */}
          <div className="flex flex-col space-y-6">
            <StatCard 
              value="420" 
              unit="MILEAGE" 
              label="Range per charge"
              icon="⚡"
            />
            <StatCard 
              value="310" 
              unit="KM/H" 
              label="Top Speed"
              icon="🏍"
            />
            <StatCard 
              value="2024" 
              unit="YEAR" 
              label="Latest Model"
              icon="📅"
            />
          </div>

          {/* Center - Hero Title */}
          <div className="text-center flex-1 mx-12">
            <h1 className="text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-white to-gray-300 leading-none mb-8">
              MOTOVEX
            </h1>
            
            {/* Desktop Bike Image */}
            <div className="relative mx-auto w-80 lg:w-96 h-56 lg:h-64 mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-teal-400/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-gray-700 to-gray-800 rounded-3xl h-full flex items-center justify-center border border-gray-600 shadow-2xl">
                <div className="text-5xl lg:text-6xl">🏍</div>
              </div>
            </div>

            {/* Desktop Bike Variants */}
            <div className="flex justify-center space-x-4">
              {bikeVariants.map((variant, index) => (
                <BikeVariant
                  key={index}
                  color={variant.color}
                  active={activeVariant === index}
                  onClick={() => setActiveVariant(index)}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="w-80">
            <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">Motovex H2R</h2>
              <p className="text-gray-300 leading-relaxed">
                The Motovex H2R is a futuristic electric superbike featuring a sleek aerodynamic body and cutting-edge LED lighting. Perfect for high-performance riding, it's made for speed lovers and tech enthusiasts.
              </p>
              
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Battery</div>
                    <div className="text-white font-semibold">72V 40Ah</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Motor</div>
                    <div className="text-white font-semibold">8000W</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Weight</div>
                    <div className="text-white font-semibold">180kg</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Charge Time</div>
                    <div className="text-white font-semibold">4 hours</div>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-3 rounded-xl hover:from-cyan-400 hover:to-teal-400 transition-all duration-300 font-semibold">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-72 md:w-96 h-24 md:h-32 bg-gradient-to-t from-cyan-500/20 to-transparent blur-2xl md:blur-3xl"></div>
    </div>
  );
};

export default MotovexLanding;