import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Duke200 from "../assets/Duke200.webp";
import Duke160 from "../assets/Duke160.avif";
import Duke390 from "../assets/Duke390.webp";

const bikes = [
  {
    name: "DUKE 160",
    img: Duke160,
    weight: "7.85kg",
  },
  {
    name: "DUKE 200",
    img: Duke200,
    weight: "8.45kg",
  },
  {
    name: "DUKE 390",
    img: Duke390,
    weight: "9.25kg",
  },
];

function BikeShowCase() {
  const [current, setCurrent] = useState(1); // Start with DUKE 200

  const prevBike = () =>
    setCurrent((prev) => (prev === 0 ? bikes.length - 1 : prev - 1));

  const nextBike = () =>
    setCurrent((prev) => (prev === bikes.length - 1 ? 0 : prev + 1));

  const bike = bikes[current];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-200">
      <main className="flex-1 flex flex-col items-center justify-center relative text-center px-4">
        {/* Left Preview */}
        <div className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 flex flex-col items-center">
          <button
            onClick={prevBike}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="w-20 h-16 mt-4 border rounded-lg flex items-center justify-center bg-white shadow">
            <img
              src={bikes[(current - 1 + bikes.length) % bikes.length].img}
              alt="Prev Bike"
              className="w-16"
            />
          </div>
          <span className="text-[10px] mt-1">
            {bikes[(current - 1 + bikes.length) % bikes.length].name}
          </span>
        </div>

        {/* Right Preview */}
        <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center">
          <button
            onClick={nextBike}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>
          <div className="w-20 h-16 mt-4 border rounded-lg flex items-center justify-center bg-white shadow">
            <img
              src={bikes[(current + 1) % bikes.length].img}
              alt="Next Bike"
              className="w-16"
            />
          </div>
          <span className="text-[10px] mt-1">
            {bikes[(current + 1) % bikes.length].name}
          </span>
        </div>

        {/* Main Bike */}
        <img
          src={bike.img}
          alt={bike.name}
          className="w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-3xl transition-all duration-500"
        />

        {/* Product Info */}
        <div className="mt-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
            {bike.name}
          </h2>

          {/* Rating */}
          <div className="flex justify-center mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className="text-yellow-500 fill-yellow-500"
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 justify-center">
            <button className="px-6 py-2 bg-white shadow rounded-full font-medium hover:bg-gray-100">
              View More
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700">
              Buy Now
            </button>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-6 right-4 sm:right-10 text-xs sm:text-sm text-gray-700">
          {/* Progress Dots */}
          <div className="flex gap-2 mb-2 justify-end">
            {bikes.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-1 rounded ${
                  i === current ? "bg-blue-600" : "bg-gray-400"
                }`}
              ></div>
            ))}
          </div>
          <p className="font-semibold">WEIGHT: {bike.weight}</p>
        </div>
      </main>
    </div>
  );
}

export default BikeShowCase;
