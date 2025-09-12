import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero5 from "../../assets/Hero5.jpg";
import Hero6 from "../../assets/Hero6.jpg";
import Hero7 from "../../assets/Hero7.jpg";
import Hero8 from "../../assets/Hero8.jpg";
import Hero9 from "../../assets/Hero9.jpg";

// Imported portrait images for mobile 
import Heromob1 from "../../assets/Heromob1.jpg";
import Heromob2 from "../../assets/Heromob2.jpg";
import Heromob3 from "../../assets/Heromob3.jpg";
import Heromob4 from "../../assets/Heromob4.jpg";
import Heromob5 from "../../assets/Heromob5.jpg";

// Landscape images for desktop/tablet
const desktopImages = [Hero9, Hero5, Hero6, Hero7, Hero8];

// Portrait images for mobile devices
const mobileImages = [Heromob1, Heromob2, Heromob3, Heromob4, Heromob5];

// Custom object positions for each image 
const desktopImagePositions = [
  "center",  
  "center",  
  "center",  
  "center",  
  "center",  
];

// Custom positions for mobile images if needed
const mobileImagePositions = [
  "center", 
  "center", 
  "center", 
  "center", 
  "center", 
];

const Home = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Reset index when switching between mobile and desktop to prevent issues
      if (mobile !== isMobile) {
        setCurrentIndex(0);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (isMobile ? mobileImages.length : desktopImages.length));
    }, 5000); // 5 seconds per slide
    
    return () => clearInterval(interval);
  }, [isMobile]);

  // Go to specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Get current images and positions based on device
  const currentImages = isMobile ? mobileImages : desktopImages;
  const currentPositions = isMobile ? mobileImagePositions : desktopImagePositions;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-base-100 overflow-hidden">
      {/* Image Slider */}
      <div className="relative w-full h-screen">
        {currentImages.map((img, index) => (
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
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
                style={{ 
                  objectPosition: currentPositions[index] || "center",
                }}
                loading={index === 0 ? "eager" : "lazy"} 
              />
            </div>
          </div>
        ))}
        
        {/* Dark overlay for better text contrast - stronger on mobile */}
        <div className="absolute inset-0 bg-black/50 md:bg-black/40 z-0"></div>
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl font-bold text-[#1fb854] mb-2 sm:mb-3 tracking-wide leading-tight drop-shadow-lg">
          MOTOVEX
        </h1>
        
        {/* Subtitle */}
        <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-semibold text-white/90 mb-4 sm:mb-6 tracking-wider uppercase">
          Luxury Motorcycle Experience
        </h2>
        
        {/* Subheading */}
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-xs xs:max-w-sm sm:max-w-lg md:max-w-2xl mb-6 sm:mb-8 md:mb-12 px-2 leading-relaxed">
          Discover the finest collection of premium motorcycles and accessories
        </p>
        
        {/* CTA Buttons - Hidden on mobile in favor of bottom button */}
        <div className="hidden sm:flex flex-col sm:flex-row gap-4 md:gap-6 mb-8 md:mb-16 w-full max-w-xs sm:max-w-md justify-center">
          <button
          onClick={() => navigate("/explore")} 
          className="btn btn-primary btn-lg md:btn-xl rounded-full px-6 md:px-8 py-3 text-white font-semibold shadow-lg transform transition-transform hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-white">
            Explore Collection
          </button>
          <button
           onClick={() => navigate("/about")} 
           className="btn btn-outline btn-lg md:btn-xl rounded-full px-6 md:px-8 py-3 text-white border-white font-semibold hover:bg-white hover:text-primary transform transition-transform hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-white">
            About us
          </button>
        </div>
      </div>

      {/* Line Indicators + Button */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-12 flex flex-col items-center w-full z-20 px-4">
        {/* Sharp Line Indicators */}
        <div className="flex mb-4 sm:mb-6 space-x-2 sm:space-x-3">
          {currentImages.map((_, index) => (
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
        <button 
        onClick={() => navigate("/explore")}
        className="btn btn-primary rounded-full text-base sm:hidden shadow-lg px-6 py-2.5 font-medium">
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Home;