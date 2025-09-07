import React, { useEffect, useRef, useState } from "react";
import { Search, User } from "lucide-react";

const DEFAULT_SEARCH_PX = 256; // desired full width (~w-64)

const Navbar = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [maxSearchWidth, setMaxSearchWidth] = useState(0);
    const [showDesktopNav, setShowDesktopNav] = useState(false);

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

        const headerRect = header.getBoundingClientRect();
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

        // We’ll cap the max width to our desired full width
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
        <header
            ref={headerRef}
            className="relative flex items-center justify-between px-6 py-4 border-b border-gray-300"
        >
            {/* Logo */}
            <div ref={logoRef} className="text-2xl font-bold">Logo</div>

            {/* Desktop Menu */}
            {showDesktopNav && (  
                    <nav
                ref={navRef}
                className="hidden md:flex gap-8 text-gray-700 font-medium"
            >
                <a href="#" className="hover:text-blue-600">Bikes</a>
                <a href="#" className="hover:text-blue-600">Motorbikes</a>
                <a href="#" className="hover:text-blue-600">Equipment</a>
                <a href="#" className="hover:text-blue-600">Protective Gear</a>
            </nav>
              )  }
            

            {/* Right side icons */}
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

            {/* Mobile Dropdown — always rendered; sits ABOVE the search via z-index */}
            <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-64 md:hidden z-40">
                <select
                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    defaultValue=""
                >
                    <option value="" disabled>Choose a category</option>
                    <option value="bikes">Bikes</option>
                    <option value="motorbikes">Motorbikes</option>
                    <option value="equipment">Equipment</option>
                    <option value="gear">Protective Gear</option>
                </select>
            </div>
        </header>
    );
};

export default Navbar;
