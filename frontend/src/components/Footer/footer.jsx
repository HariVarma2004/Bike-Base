import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <div data-theme="forest">
    <footer className="bg-base-200 text-base-content py-10 mt-12 rounded-t-2xl shadow-lg">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-extrabold text-primary tracking-wide">BikeBase</h2>
          <p className="mt-3 text-sm opacity-80">
            Your trusted hub for bikes, garages, and community rides.  
            Experience speed, power, and innovation with us.
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-lg font-semibold text-secondary mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-primary transition">Home</a></li>
            <li><a href="#" className="hover:text-primary transition">About Us</a></li>
            <li><a href="#" className="hover:text-primary transition">Services</a></li>
            <li><a href="#" className="hover:text-primary transition">Contact</a></li>
          </ul>
        </div>

        {/* Social Section */}
        <div>
          <h3 className="text-lg font-semibold text-secondary mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="btn btn-circle btn-sm bg-neutral hover:bg-primary text-white">
              <Facebook size={18} />
            </a>
            <a href="#" className="btn btn-circle btn-sm bg-neutral hover:bg-primary text-white">
              <Twitter size={18} />
            </a>
            <a href="#" className="btn btn-circle btn-sm bg-neutral hover:bg-primary text-white">
              <Instagram size={18} />
            </a>
            <a href="#" className="btn btn-circle btn-sm bg-neutral hover:bg-primary text-white">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-base-300 pt-6 text-center text-sm opacity-70">
        © {new Date().getFullYear()} BikeBase. All Rights Reserved.
      </div>
    </footer>
    </div>
  );
}
