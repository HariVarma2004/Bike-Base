import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <>
      <header className="bg-white shadow-md">
        <nav className="container mx-auto flex items-center justify-between py-4 px-4">
          {/* Logo */}
          <div className="text-xl font-bold">Logo</div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex flex-1 justify-center gap-6 text-gray-700 font-medium">
            <li>
                Home
            </li>
            <li>
                About
            </li>
            <li>
                Services
            </li>
            <li>
                Contact
            </li>
          </ul>

          {/* Desktop Search + Profile */}
          <div className="hidden md:flex items-center gap-4 text-gray-600">
            <button className="hover:text-blue-600">search</button>
            <button className="hover:text-blue-600">Profile</button>
          </div>

          {/* Mobile Section (Search + Profile + Hamburger) */}
          <div className="md:hidden flex items-center gap-3">
            <button className="text-gray-600 hover:text-blue-600">Search</button>
            <button className="text-gray-600 hover:text-blue-600">Profile</button>
            <button
              className="text-gray-600 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md px-4 py-3">
            <ul className="flex flex-col gap-4 text-gray-700 font-medium">
              <li>
                  Home
              </li>
              <li>
                  About
              </li>
              <li>
                  Services
              </li>
              <li>
                  Contact
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;
