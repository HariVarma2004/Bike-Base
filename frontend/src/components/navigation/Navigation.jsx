import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const DEFAULT_SEARCH_PX = 256; // desired full width (~w-64)

const Navigation = ({ mobileMenuOpen, onToggleMobileMenu }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [maxSearchWidth, setMaxSearchWidth] = useState(0);
  const [, setShowDesktopNav] = useState(false);

  const inputRef = useRef(null);
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const rightRef = useRef(null); // wrapper for icons

  // Autofocus when opened
  useEffect(() => {
    if (showSearch) inputRef.current?.focus();
  }, [showSearch]);

  // Compute how much space is available so the search doesn't overlap nav.
  // It will shrink if space is tight.
  const measure = () => {
    const header = headerRef.current;
    const nav = navRef.current;
    const logo = logoRef.current;
    const right = rightRef.current;
    if (!header || !right) return;

    const rightRect = right.getBoundingClientRect();
    const navRect = nav?.getBoundingClientRect();
    const logoRect = logo?.getBoundingClientRect();

    // Gap we want to preserve between search and its neighbors
    const GAP = 12;

    // Left boundary the search shouldn't cross:
    // - If desktop nav exists (md+), use its right edge.
    // - Else (mobile), just use the header's left padding area.
    const leftBoundary = navRect ? navRect.right + 15 : logoRect.right + 15;
    
    // Available horizontal space between the left boundary and the icon group (rightRef)
    let available = rightRect.left - leftBoundary - GAP;
    if (available < 0) available = 0;

    // We'll cap the max width to our desired full width
    const allowed = Math.min(DEFAULT_SEARCH_PX, available);

    setMaxSearchWidth(allowed);
  };

  useEffect(() => {
    const checkDesktop = () => {
      if (window.innerWidth >= 768) {
        setShowDesktopNav(true);   // md and above
      } else {
        setShowDesktopNav(false);  // below md
      }
    };

    checkDesktop(); // run once on mount
    window.addEventListener("resize", checkDesktop);

    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    // re-measure whenever the nav might wrap or show/hide (responsive)
    measure();
  }, [showSearch]);

  // Close on click outside or Esc
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showSearch &&
        headerRef.current &&
        !headerRef.current.contains(e.target)
      ) {
        setShowSearch(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === "Escape") setShowSearch(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [showSearch]);

  return (
    <nav 
      ref={headerRef}
      className="navbar relative z-20 px-4 md:px-8 py-4 flex items-center justify-between bg-base-100 shadow-sm"
    >
      {/* ✅ Logo */}
      <div 
        ref={logoRef}
        className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent tracking-wide"
      >
        MOTOVEX
      </div>

      {/* ✅ Desktop Navigation */}
      <div 
        ref={navRef}
        className="hidden md:flex gap-8 items-center ml-auto"
      >
        <Link
          to="/"
          className="hover:text-blue-500 text-gray-700 font-medium transition-colors"
        >
          Home
        </Link>

        <Link
          to="/about"
          className="hover:text-blue-500 text-gray-700 font-medium transition-colors"
        >
          About Us
        </Link>

        <Link
          to="/contact"
          className="hover:text-blue-500 text-gray-700 font-medium transition-colors"
        >
          Contact
        </Link>
      </div>

      {/* ✅ Right side icons */}
      <div
        ref={rightRef}
        className="flex items-center gap-4 text-gray-600 relative"
      >
        {/* Toggle button */}
        <button
          aria-label="Toggle search"
          className="p-1 hover:text-blue-600"
          onClick={() => {
            setShowSearch((s) => !s);
            // measure on toggle to ensure correct width
            setTimeout(measure, 0);
          }}
        >
          <Search size={22} />
        </button>

        <User size={22} className="cursor-pointer hover:text-blue-600" />

        {/* Absolutely positioned search that expands LEFT from the icon group.
          It's layered below the mobile dropdown (z-30 vs dropdown z-40). */}
        <div
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2 overflow-hidden z-30"
          style={{
            maxWidth: showSearch ? `${maxSearchWidth}px` : "0px",
            opacity: showSearch ? 1 : 0,
            transition: "max-width 300ms ease, opacity 200ms ease",
          }}
        >
          <div className="w-[256px] max-w-full">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-1 border border-gray-300 rounded-lg shadow-sm 
                 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* ✅ Mobile Menu Button */}
      <button
        className="btn btn-ghost btn-circle md:hidden text-2xl"
        onClick={onToggleMobileMenu}
        aria-label="Toggle Mobile Menu"
      >
        {mobileMenuOpen ? "✕" : "☰"}
      </button>

      {/* ✅ Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden"
          >
            <div className="menu menu-vertical p-5 space-y-4">
              <Link
                to="/"
                className="hover:text-blue-500 text-gray-700 font-medium"
                onClick={onToggleMobileMenu}
              >
                Home
              </Link>

              <Link
                to="/about"
                className="hover:text-blue-500 text-gray-700 font-medium"
                onClick={onToggleMobileMenu}
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className="hover:text-blue-500 text-gray-700 font-medium"
                onClick={onToggleMobileMenu}
              >
                Contact
              </Link>

              {/* ✅ Mobile Search */}
              <div className="pt-3 border-t border-gray-200">
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                      focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;