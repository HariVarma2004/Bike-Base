// src/components/AboutSite.jsx
import { useNavigate } from "react-router-dom";

export default function AboutSite() {
  const navigate = useNavigate();

  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-12 bg-gradient-to-br from-[#0a0f1c] to-[#091621] text-white">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-cyan-400">
        Welcome to BikeBase
      </h2>

      {/* Short description */}
      <p className="max-w-2xl text-lg md:text-xl text-gray-300 mb-8">
        BikeBase is your one-stop hub for bikers — from exploring top models, 
        sharing experiences, to finding trusted garages and accessories.  
        Our mission is to build a strong biking community and marketplace.
      </p>

      {/* Contact Us button */}
      <button
        onClick={() => navigate("/contact")}
        className="btn btn-primary rounded-full px-8 py-3 font-medium shadow-lg hover:scale-105 transition-transform"
      >
        Contact Us
      </button>
    </section>
  );
}
