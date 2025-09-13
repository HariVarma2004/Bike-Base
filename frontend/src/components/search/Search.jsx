import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://bike-base-backend-2rde.onrender.com";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Fetch suggestions from backend
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim() === "") {
        setFilteredSuggestions([]);
        return;
      }
      try {
        const res = await axios.get(`${API_BASE_URL}/api/bikes/suggestions?q=${query}`);
        setFilteredSuggestions(res.data);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
        setFilteredSuggestions([]);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 300); // debounce
    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Close search if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setShowSuggestions(false);
      navigate(`/search?q=${query}`);
    }
    if (e.key === "Escape") {
      setShowSuggestions(false);
      setExpanded(false);
    }
  };

  return (
    <div ref={searchRef} className="relative flex items-center">
      {/* Search Icon */}
      <button
        className="p-2 text-gray-700 hover:text-blue-500 transition-colors"
        onClick={() => setExpanded((prev) => !prev)}
        aria-label="Search"
      >
        <FiSearch size={20} />
      </button>

      {/* Expanding Search Input */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "14rem", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden ml-2"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base text-gray-800"
              autoFocus
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute left-10 top-full mt-2 w-56 md:w-72 bg-white border border-gray-200 rounded-lg shadow-xl z-30 max-h-56 overflow-y-auto"
          >
            {filteredSuggestions.map((item, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer text-gray-800 hover:bg-blue-500 hover:text-white transition-all duration-200"
                onClick={() => {
                  setQuery(item);
                  setShowSuggestions(false);
                  setExpanded(false);
                  navigate(`/search?q=${item}`);
                }}
              >
                {item}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
