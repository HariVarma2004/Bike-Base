import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Navigation = ({ mobileMenuOpen, onToggleMobileMenu }) => {
  return (
    <nav className="navbar relative z-20 px-4 md:px-6 py-4">
      {/* Logo */}
      <div className="text-2xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-wide">
        MOTOVEX
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-8 ml-auto">
        <Link
          to="/"
          className="link link-hover text-base-content/80 hover:text-primary font-medium transition-colors"
        >
          Home
        </Link>

        {/* Dummy Items */}
        <span className="link link-hover text-base-content/80 hover:text-primary font-medium cursor-pointer">
          Models
        </span>
        <span className="link link-hover text-base-content/80 hover:text-primary font-medium cursor-pointer">
          Features
        </span>

        <Link
          to="/about"
          className="link link-hover text-base-content/80 hover:text-primary font-medium transition-colors"
        >
          About Us
        </Link>
        <Link
          to="/contact"
          className="link link-hover text-base-content/80 hover:text-primary font-medium transition-colors"
        >
          Contact
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="btn btn-ghost btn-circle md:hidden text-xl"
        onClick={onToggleMobileMenu}
        aria-label="Toggle Mobile Menu"
      >
        {mobileMenuOpen ? "✕" : "☰"}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 right-0 bg-base-200/95 border-t border-base-300 shadow-lg md:hidden"
          >
            <div className="menu menu-vertical p-4">
              <Link
                to="/"
                className="link link-hover text-base-content/80 hover:text-primary font-medium"
                onClick={onToggleMobileMenu}
              >
                Home
              </Link>

              {/* Dummy Items */}
              <span
                className="link link-hover text-base-content/80 hover:text-primary font-medium cursor-pointer"
                onClick={onToggleMobileMenu}
              >
                Models
              </span>
              <span
                className="link link-hover text-base-content/80 hover:text-primary font-medium cursor-pointer"
                onClick={onToggleMobileMenu}
              >
                Features
              </span>

              <Link
                to="/about"
                className="link link-hover text-base-content/80 hover:text-primary font-medium"
                onClick={onToggleMobileMenu}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="link link-hover text-base-content/80 hover:text-primary font-medium"
                onClick={onToggleMobileMenu}
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
