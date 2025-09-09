import React, { useState, useEffect } from "react";

// ✅ Correct imports (check your filenames carefully!)
// import Hero1 from "../../assets/Hero1.jpg";
// import Hero2 from "../../assets/Hero2.webp";
// import Hero3 from "../../assets/Hero3.webp";
// import Hero4 from "../../assets/Hero4.jpg";
import Hero5 from "../../assets/Hero5.jpg";
import Hero6 from "../../assets/Hero6.jpg";
import Hero7 from "../../assets/Hero7.jpg";
import Hero8 from "../../assets/Hero8.jpg";
import Hero9 from "../../assets/Hero9.jpg";

const images = [ Hero9, Hero5, Hero6, Hero7, Hero8 ];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

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

        {/* Prev / Next Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
        >
          
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
        >
          
        </button>
      </div>

      {/* Dots + Button */}
      <div className="absolute bottom-12 flex flex-col items-center w-full">
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

        <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition">
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Home;
