import React, { useState, useEffect } from "react";

const images = [
  "https://via.placeholder.com/1200x600/FF5733/FFFFFF?text=Slide+1",
  "https://via.placeholder.com/1200x600/33C1FF/FFFFFF?text=Slide+2",
  "https://via.placeholder.com/1200x600/75FF33/FFFFFF?text=Slide+3",
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gray-900 overflow-hidden">
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

      {/* Active Line Indicator + Button */}
      <div className="absolute bottom-12 flex flex-col items-center w-full">
        {/* Line Indicator ABOVE the button */}
        <div className="flex mb-4 space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1 w-8 cursor-pointer transition-all ${
                currentIndex === index ? "bg-blue-600 w-12" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>

        {/* Button */}
        <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition">
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Home;
