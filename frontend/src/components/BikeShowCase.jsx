import { Star } from "lucide-react";
import Duke200 from "../assets/Duke200.webp";
import Duke160 from "../assets/Duke160.avif";
import Duke390 from "../assets/Duke390.webp";
function BikeShowCase() {


  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Section */}
      <main className="flex-1 flex flex-col items-center justify-center relative text-center">
        {/* Left preview */}
        <div className="absolute left-10 flex flex-col items-center">
          <div className="w-28 h-20 border rounded-lg flex items-center justify-center bg-white shadow">
            <img src={Duke200} alt="Bike Red" className="w-20" />
          </div>
          <span className="text-xs mt-2">DUKE 160</span>
        </div>

        {/* Right preview */}
        <div className="absolute right-10 flex flex-col items-center">
          <div className="w-28 h-20 border rounded-lg flex items-center justify-center bg-white shadow">
            <img src={Duke390} alt="Bike Blue" className="w-20" />
          </div>
          <span className="text-xs mt-2">DUKE 390</span>
        </div>

        {/* Main Bike */}
        <img src={Duke200} alt="Bike Black" className="w-[500px] max-w-full" />

        {/* Product Info */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">DUKE 200</h2>

          {/* Rating */}
          <div className="flex justify-center mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="text-yellow-500 fill-yellow-500" />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-6 mt-6 justify-center">
            <button className="px-6 py-2 bg-white shadow rounded-full font-medium hover:bg-gray-100">
              View More
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700">
              Buy Now
            </button>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-10 right-10 text-sm text-gray-700">
          <div className="flex gap-2 mb-2">
            <div className="w-4 h-2 bg-gray-400 rounded"></div>
            <div className="w-4 h-2 bg-gray-400 rounded"></div>
            <div className="w-4 h-2 bg-gray-400 rounded"></div>
            <div className="w-4 h-2 bg-blue-600 rounded"></div>
          </div>
          <p className="font-semibold">WEIGHT: 8.45kg</p>
        </div>
      </main>
    </div>
  );
}

export default BikeShowCase;
