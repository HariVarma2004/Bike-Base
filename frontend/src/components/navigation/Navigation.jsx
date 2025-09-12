import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Search, User, X, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const DEFAULT_SEARCH_PX = 300;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const Navigation = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [maxSearchWidth, setMaxSearchWidth] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const centerRef = useRef(null);
  const rightRef = useRef(null);
  const inputRef = useRef(null);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    if (showSearch) {
      inputRef.current?.focus();
      measure();
    }
  }, [showSearch]);

  // Fetch bike suggestions based on search query
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length < 2) {
        setSearchSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/bikes/search?q=${searchQuery}`);
        setSearchSuggestions(response.data);


        // For production with real API:
        /*
        const response = await axios.get(`${API_BASE_URL}/api/bikes/search?q=${searchQuery}`);
        setSearchSuggestions(response.data);
        */
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
        setSearchSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const measure = () => {
    const logo = logoRef.current;
    const center = centerRef.current;
    const right = rightRef.current;
    if (!logo || !right) return;

    const logoRect = logo.getBoundingClientRect();
    const centerRect = center?.getBoundingClientRect();
    const rightRect = right.getBoundingClientRect();

    const GAP = 12;
    const centerRight = centerRect ? centerRect.right : logoRect.right + 16;
    const leftBoundary = Math.max(logoRect.right, centerRight);

    let available = rightRect.left - leftBoundary - GAP;
    if (available < 0) available = 0;

    setMaxSearchWidth(Math.min(DEFAULT_SEARCH_PX, Math.floor(available)));
  };

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showSearch && searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSearch(false);
        setSearchSuggestions([]);
      }
      if (mobileMenuOpen && headerRef.current && !headerRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };

    const handleKey = (e) => {
      if (e.key === "Escape") {
        setShowSearch(false);
        setSearchSuggestions([]);
        setMobileMenuOpen(false);
      } else if (e.key === "Enter" && showSearch && searchQuery.trim() && searchSuggestions.length > 0) {
        handleBikeSelect(searchSuggestions[0]);
      } else if (e.key === "Enter" && showSearch && searchQuery.trim()) {
        handleSearchSubmit(e);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [showSearch, searchQuery, searchSuggestions, mobileMenuOpen]);

  // Handle bike selection from suggestions
  const handleBikeSelect = (bike) => {
    setSearchQuery("");
    setSearchSuggestions([]);
    setShowSearch(false);
    navigate(`/explore/bikespecs/${bike._id}`);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && searchSuggestions.length > 0) {
      handleBikeSelect(searchSuggestions[0]);
    } else if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setSearchSuggestions([]);
      setShowSearch(false);
    }
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/blog", label: "Blog" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact Us" },
  ];

  return (
    <>
      <nav
        ref={headerRef}
        className="navbar bg-base-100 shadow-md px-6 py-3 fixed top-0 left-0 right-0 z-50"
        data-theme="forest"
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between relative">
          {/* Left: Logo */}
          <div ref={logoRef} className="flex items-center flex-shrink-0 min-w-[120px]">
            <Link
              to="/"
              className="text-2xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-wide"
              onClick={() => setMobileMenuOpen(false)}
            >
              MOTOVEX
            </Link>
          </div>

          {/* Center Links (Desktop Only) */}
          <div
            ref={centerRef}
            className="hidden md:flex gap-6 items-center absolute left-1/2 transform -translate-x-1/2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="btn btn-ghost normal-case text-base hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div ref={rightRef} className="flex items-center gap-3 relative">
            {/* Search Container */}
            <div ref={searchContainerRef} className="relative">
              {/* Search Toggle */}
              <button
                aria-label="Toggle search"
                className="btn btn-ghost btn-circle"
                onClick={() => {
                  setShowSearch((s) => !s);
                  setSearchSuggestions([]);
                  setSearchQuery("");
                }}
              >
                <Search size={22} className="text-primary" />
              </button>

              {/* Search Overlay */}
              <AnimatePresence>
                {showSearch && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-3 bg-base-100 border border-primary rounded-lg shadow-xl p-4 w-80 z-50"
                  >
                    <form onSubmit={handleSearchSubmit} className="relative mb-2">
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search bikes by name, brand, or category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input input-bordered input-primary w-full pr-10 bg-base-100"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary"
                      >
                        <Search size={18} />
                      </button>
                    </form>

                    {/* Search Suggestions */}
                    {searchSuggestions.length > 0 && (
                      <div className="bg-base-100 rounded-lg max-h-60 overflow-y-auto">
                        {searchSuggestions.map((bike) => (
                          <div
                            key={bike._id}
                            className="p-3 hover:bg-base-200 cursor-pointer transition-colors border-b border-base-200 last:border-b-0 rounded-lg"
                            onClick={() => handleBikeSelect(bike)}
                          >
                            <div className="font-medium text-primary">{bike.name}</div>
                            <div className="text-sm text-base-content/70">
                              {bike.brand} • {bike.category}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {isLoading && (
                      <div className="p-3 text-center">
                        <span className="loading loading-spinner loading-sm text-primary"></span>
                      </div>
                    )}

                    {searchQuery.length >= 2 && !isLoading && searchSuggestions.length === 0 && (
                      <div className="p-3 text-center text-base-content/70">
                        No bikes found matching "{searchQuery}"
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Icon - Now routes to Login */}
            <Link to="/login" className="btn btn-ghost btn-circle">
              <User size={22} className="text-primary" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="btn btn-ghost btn-circle md:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              <Menu size={22} className="text-primary" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-base-200 z-50 flex flex-col p-6"
            data-theme="forest"
          >
            {/* Close button */}
            <button
              className="btn btn-ghost btn-circle self-end mb-6"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close mobile menu"
            >
              <X size={28} className="text-primary" />
            </button>

            {/* Mobile Links */}
            <ul className="menu text-lg space-y-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-primary hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-primary hover:text-secondary transition-colors"
                >
                  Login
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add padding to the top of your page content to account for fixed navbar */}
      <div className="h-20"></div>
    </>
  );
};

export default Navigation;