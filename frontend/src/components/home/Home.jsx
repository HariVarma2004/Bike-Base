import React, { useState, useEffect } from "react";
import Hero5 from "../../assets/Hero5.jpg";
import Hero6 from "../../assets/Hero6.jpg";
import Hero7 from "../../assets/Hero7.jpg";
import Hero8 from "../../assets/Hero8.jpg";
import Hero9 from "../../assets/Hero9.jpg";

const images = [Hero9, Hero5, Hero6, Hero7, Hero8];

// Custom object positions for each image to ensure optimal cropping on all devices
const imagePositions = [
  "center",  // for Hero9
  "center",  // for Hero5
  "center",  // for Hero6
  "center",  // for Hero7
  "center",  // for Hero8
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Increased to 5s for better user experience
    
    return () => clearInterval(interval);
  }, []);

  // Go to specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-base-100 overflow-hidden">
      {/* Image Slider */}
      <div className="relative w-full h-screen">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-0" : "opacity-0 z-0"
            }`}
          >
            {/* Responsive image with proper alignment for all screens */}
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <img
                src={img}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover"
                style={{ 
                  objectPosition: imagePositions[index] || "center",
                }}
                loading={index === 0 ? "eager" : "lazy"} // Only first image loads eagerly
              />
            </div>
          </div>
        ))}
        
        {/* Dark overlay for better text contrast - stronger on mobile */}
        <div className="absolute inset-0 bg-black/50 md:bg-black/40 z-0"></div>
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        {/* Main Heading */}
        <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4 sm:mb-6 tracking-wide px-2 leading-tight">
          Luxury Motorcycle Experience
        </h1>
        
        {/* Subheading */}
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-xs xs:max-w-sm sm:max-w-lg md:max-w-2xl mb-6 sm:mb-8 md:mb-12 px-2 leading-relaxed">
          Discover the finest collection of premium motorcycles and accessories
        </p>
        
        {/* CTA Buttons - Hidden on mobile in favor of bottom button */}
        <div className="hidden sm:flex flex-col sm:flex-row gap-4 md:gap-6 mb-8 md:mb-16 w-full max-w-xs sm:max-w-md justify-center">
          <button className="btn btn-primary btn-lg md:btn-xl rounded-full px-6 md:px-8 py-3 text-white font-semibold shadow-lg transform transition-transform hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-white">
            Explore Collection
          </button>
          <button className="btn btn-outline btn-lg md:btn-xl rounded-full px-6 md:px-8 py-3 text-white border-white font-semibold hover:bg-white hover:text-primary transform transition-transform hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-white">
            Book a Test Ride
          </button>
        </div>
      </div>

      {/* Line Indicators + Button */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-12 flex flex-col items-center w-full z-20 px-4">
        {/* Sharp Line Indicators */}
        <div className="flex mb-4 sm:mb-6 space-x-2 sm:space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`cursor-pointer transition-all duration-500 rounded-full ${
                currentIndex === index
                  ? "bg-primary h-2 w-6 sm:w-8 md:w-10"
                  : "bg-white/70 h-2 w-2 sm:w-3"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Explore Button - Only visible on mobile */}
        <button className="btn btn-primary rounded-full text-base sm:hidden shadow-lg px-6 py-2.5 font-medium">
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Home;