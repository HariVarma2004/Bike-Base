import React, { useState, useEffect } from "react";

import Hero5 from "../../assets/Hero5.jpg";
import Hero6 from "../../assets/Hero6.jpg";
import Hero7 from "../../assets/Hero7.jpg";
import Hero8 from "../../assets/Hero8.jpg";
import Hero9 from "../../assets/Hero9.jpg";

const images = [Hero9, Hero5, Hero6, Hero7, Hero8];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-base-100 overflow-hidden">
      {/* Image Slider */}
      <div className="relative w-full h-screen">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Line Indicators + Button */}
      <div className="absolute bottom-12 flex flex-col items-center w-full z-20">
        {/* Sharp Line Indicators */}
        <div className="flex mb-4 space-x-3">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`cursor-pointer transition-all duration-500 ${
                currentIndex === index
                  ? "bg-primary h-2 w-16" // luxury theme → primary color (gold)
                  : "bg-neutral h-1 w-8"  // inactive state
              }`}
            ></div>
          ))}
        </div>

        {/* Explore Button */}
        <button className="btn btn-primary rounded-2xl shadow-lg">
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Home;
