const Navigation = ({ mobileMenuOpen, onToggleMobileMenu }) => {
  return (
    <nav className="relative z-20 px-4 md:px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-cyan-400">MOTOVEX</div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-8">
        <a href="#" className="text-gray-300 hover:text-cyan-500 transition">Home</a>
        <a href="#" className="text-gray-300 hover:text-cyan-500 transition">Models</a>
        <a href="#" className="text-gray-300 hover:text-cyan-500 transition">Features</a>
        <a href="contact.js" className="text-gray-300 hover:text-cyan-500 transition">Contact</a>
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

export default Navigation;