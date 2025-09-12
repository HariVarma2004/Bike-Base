// src/components/AboutUs/AboutSite.jsx
import { useNavigate } from "react-router-dom";
import HeroCon1 from "../../assets/Herocon3.jpg"; // make sure this path is correct

export default function AboutSite() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-12 text-white overflow-hidden">
      {/* Background image fills the whole section */}
      <img
        src={HeroCon1}
        alt="Motovex Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content on top */}
      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-cyan-400">
          Welcome to Motovex
        </h2>

        <p className="max-w-2xl text-lg md:text-xl text-gray-200 mb-8">
          Motovex is your one-stop hub for bikers — from exploring top models,
          sharing experiences, to finding trusted garages and accessories.
          Our mission is to build a strong biking community and marketplace.
        </p>

        <button
          onClick={() => navigate("/contact")}
          className="btn btn-primary rounded-full px-8 py-3 font-medium shadow-lg hover:scale-105 transition-transform"
        >
          Contact Us
        </button>
      </div>
    </section>
  );
}
