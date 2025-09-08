import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-gray-300 py-10 mt-12 rounded-t-2xl shadow-lg">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-wide">BikeBase</h2>
          <p className="mt-3 text-gray-400 text-sm">
            Your trusted hub for bikes, garages, and community rides.  
            Experience speed, power, and innovation with us.
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-lg font-semibold text-cyan-400 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-cyan-300 transition">Home</a></li>
            <li><a href="#" className="hover:text-cyan-300 transition">About Us</a></li>
            <li><a href="#" className="hover:text-cyan-300 transition">Services</a></li>
            <li><a href="#" className="hover:text-cyan-300 transition">Contact</a></li>
          </ul>
        </div>

        {/* Social Section */}
        <div>
          <h3 className="text-lg font-semibold text-cyan-400 mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-slate-700 rounded-full hover:bg-cyan-500 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="p-2 bg-slate-700 rounded-full hover:bg-cyan-500 transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="p-2 bg-slate-700 rounded-full hover:bg-cyan-500 transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="p-2 bg-slate-700 rounded-full hover:bg-cyan-500 transition">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BikeBase. All Rights Reserved.
      </div>
    </footer>
  );
}
