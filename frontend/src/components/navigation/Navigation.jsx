import { motion, AnimatePresence } from "framer-motion";

const Navigation = ({ mobileMenuOpen, onToggleMobileMenu }) => {
  return (
    <nav className="navbar relative z-20 px-4 md:px-6 py-4">
      {/* Logo */}
      <div className="text-2xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-wide">
        MOTOVEX
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-8 ml-auto">
        {["Home", "Models", "Features", "Contact"].map((item) => (
          <a
            key={item}
            href="#"
            className="link link-hover text-base-content/80 hover:text-primary font-medium transition-colors"
          >
            {item}
          </a>
        ))}
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
              {["Home", "Models", "Features", "Contact"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="link link-hover text-base-content/80 hover:text-primary font-medium"
                  onClick={onToggleMobileMenu} // auto-close
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
