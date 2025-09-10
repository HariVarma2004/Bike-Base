import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// import logoImg from "../assets/motovex-logo.png";

const DEFAULT_SEARCH_PX = 300;

const Navigation = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [maxSearchWidth, setMaxSearchWidth] = useState(0);

  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const centerRef = useRef(null);
  const rightRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (showSearch) inputRef.current?.focus();
  }, [showSearch]);

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
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [showSearch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showSearch && headerRef.current && !headerRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setShowSearch(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [showSearch]);

  return (
    <>
      <nav
        ref={headerRef}
        className="navbar bg-base-100 shadow-md px-6 py-3 relative z-30"
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between relative">
          {/* ✅ Left: Logo */}
          <div ref={logoRef} className="flex items-center flex-shrink-0 min-w-[120px]">
            {/* <img src={logoImg} alt="MOTOVEX" className="h-10 w-auto" /> */}
            <span className="text-2xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-wide">
              MOTOVEX
            </span>
          </div>

          {/* ✅ Center Links (Desktop Only) */}
          <div
            ref={centerRef}
            className="hidden md:flex gap-8 items-center absolute left-1/2 transform -translate-x-1/2"
          >
            <Link to="/" className="btn btn-ghost normal-case text-lg">
              Home
            </Link>
            <Link to="/about" className="btn btn-ghost normal-case text-lg">
              About Us
            </Link>
            <Link to="/contact" className="btn btn-ghost normal-case text-lg">
              Contact Us
            </Link>
          </div>

          {/* ✅ Right Icons */}
          <div ref={rightRef} className="flex items-center gap-3 relative">
            {/* Expanding Search */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: showSearch ? maxSearchWidth : 0,
                opacity: showSearch ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                className="input input-bordered w-full max-w-xs"
              />
            </motion.div>

            {/* Search Toggle */}
            <button
              aria-label="Toggle search"
              className="btn btn-ghost btn-circle"
              onClick={() => {
                setShowSearch((s) => !s);
                setTimeout(measure, 0);
              }}
            >
              <Search size={22} />
            </button>

            {/* User Icon */}
            <button className="btn btn-ghost btn-circle">
              <User size={22} />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="btn btn-ghost btn-circle md:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-base-200 z-40 flex flex-col p-6"
          >
            {/* Close button */}
            <button
              className="btn btn-ghost self-end mb-6"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close mobile menu"
            >
              <X size={28} />
            </button>

            {/* Mobile Links */}
            <ul className="menu text-lg space-y-4">
              <li>
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
