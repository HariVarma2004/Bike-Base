import React, { useState } from 'react';

// Reusable Components
const Logo = () => (
  <div className="flex items-center space-x-2">
    <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center">
      <div className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full"></div>
    </div>
    <span className="text-white text-lg md:text-xl font-bold">MOTOVEX</span>
  </div>
);

const NavItem = ({ children, active = false }) => (
  <a 
    href="#" 
    className={`px-2 py-1 md:px-4 md:py-2 rounded-lg transition-all duration-300 text-sm md:text-base ${
      active 
        ? 'text-cyan-400 bg-cyan-400/10' 
        : 'text-gray-300 hover:text-white hover:bg-white/5'
    }`}
  >
    {children}
  </a>
);

const ContactButton = () => (
  <button className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-3 py-2 md:px-6 md:py-3 rounded-full hover:from-cyan-400 hover:to-teal-400 transition-all duration-300 flex items-center space-x-1 md:space-x-2 text-sm md:text-base">
    <span>📞</span>
    <span className="hidden sm:inline">Contact us</span>
    <span className="sm:hidden">Call</span>
  </button>
);

const Navigation = ({ mobileMenuOpen, onToggleMobileMenu }) => {
  const MobileMenuButton = () => (
    <button
      onClick={onToggleMobileMenu}
      className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
    >
      <div className={w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}}></div>
      <div className={w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}}></div>
      <div className={w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}}></div>
    </button>
  );

  return (
    <nav className="relative z-10 flex items-center justify-between p-4 md:p-6">
      <Logo />
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <NavItem active>Home</NavItem>
        <NavItem>Bike</NavItem>
        <NavItem>Bike Sales</NavItem>
        <NavItem>Location</NavItem>
      </div>
      
      <div className="flex items-center space-x-4">
        <ContactButton />
        <MobileMenuButton />
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-gray-700/50 z-50">
          <div className="flex flex-col p-6 space-y-4">
            <NavItem active>Home</NavItem>
            <NavItem>Bike</NavItem>
            <NavItem>Bike Sales</NavItem>
            <NavItem>Location</NavItem>
          </div>
        </div>
      )}
    </nav>
  );
};

const StatCard = ({ value, unit, label, icon }) => (
  <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-xl md:rounded-2xl p-3 md:p-6 hover:border-cyan-400/50 transition-all duration-300">
    <div className="flex items-center justify-between mb-1 md:mb-2">
      <div className="text-xl md:text-3xl font-bold text-white">{value}</div>
      <div className="text-cyan-400 text-lg md:text-xl">{icon}</div>
    </div>
    <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">{unit}</div>
    <div className="text-xs text-gray-500 mt-1 hidden md:block">{label}</div>
  </div>
);

const BikeVariant = ({ color, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl border-2 transition-all duration-300 ${
      active 
        ? 'border-cyan-400 bg-cyan-400/20' 
        : 'border-gray-600 hover:border-gray-500'
    }`}
    style={{ backgroundColor: color }}
  >
  </button>
);

