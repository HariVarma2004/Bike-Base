import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const searchRef = useRef(null);

  const suggestions = [
    "Pulsar 150",
    "Splendor Plus",
    "Ducati Panigale",
    "TVS Apache RTR",
    "Royal Enfield Classic",
    "Yamaha R15",
    "KTM Duke",
    "Hero Honda",
    "Accessories",
    "Service Center",
  ];

  // Filter suggestions
  useEffect(() => {
    if (query.trim() === "") {
      setFilteredSuggestions([]);
      return;
    }
    const results = suggestions.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSuggestions(results);
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
    }
    if (e.key === "Escape") {
      setShowSuggestions(false);
      setExpanded(false);
    }
  };

  // Highlight matched text inside suggestions
  const highlightMatch = (text) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="font-semibold text-blue-600">
          {part}
        </span>
      ) : (
        part
      )
    );
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
                }}
              >
                {highlightMatch(item)}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;