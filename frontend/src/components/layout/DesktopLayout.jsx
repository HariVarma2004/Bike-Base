// Updated DesktopLayout.jsx to accept bike prop
import { useState } from "react";
import BikeVariant from "../ui/BikeVariant";
import StatCard from "../ui/StatCard";

const DesktopLayout = ({ bike }) => {
  const [activeVariant, setActiveVariant] = useState(0);

  return (
    <>
      <div className="hidden md:flex items-center justify-between">
        {/* Left Side - Stats */}
        <div className="flex flex-col space-y-6">
          <StatCard value={bike.milage} unit="KM" label="Range" icon="⚡" />
          <StatCard value={bike.topSpeed} unit="KM/H" label="Top Speed" icon="🏍" />
          <StatCard value={bike.year} unit="YEAR" label="Latest Model" icon="📅" />
        </div>

        {/* Center - Hero Title */}
        <div className="text-center flex-1 mx-12">
          <h1 className="text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neutral via-base-content to-neutral-content leading-none mb-8">
            {bike.brand}
          </h1>

          {/* Desktop Bike Image */}
          <div className="relative mx-auto w-96 lg:w-[32rem] h-64 lg:h-[22rem] mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-base-200 rounded-3xl h-full flex items-center justify-center border border-base-300 shadow-2xl overflow-hidden">
              <img
                src={bike.image}
                alt={`${bike.brand} ${bike.name}`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Desktop Bike Variants */}
          <div className="flex justify-center space-x-4">
            {bike.colorOptions.map((color, index) => (
              <BikeVariant
                key={index}
                color={color}
                active={activeVariant === index}
                onClick={() => setActiveVariant(index)}
              />
            ))}
          </div>
        </div>

        {/* Right Side - Product Info */}
        <div className="w-80">
          <div className="bg-base-200/70 backdrop-blur-sm border border-base-300 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">{bike.brand} {bike.name}</h2>
            <p className="text-base-content/80 leading-relaxed">
              {bike.description.substring(0, 150)}...
            </p>

            <div className="mt-6 pt-6 border-t border-base-300">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-base-content/70">Engine</div>
                  <div className="font-semibold">{bike.engineCapacity}cc</div>
                </div>
                <div>
                  <div className="text-base-content/70">Power</div>
                  <div className="font-semibold">{bike.power} HP</div>
                </div>
                <div>
                  <div className="text-base-content/70">Weight</div>
                  <div className="font-semibold">{bike.weight}kg</div>
                </div>
                <div>
                  <div className="text-base-content/70">Fuel Type</div>
                  <div className="font-semibold">{bike.fuelType}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="text-2xl font-bold text-primary">${bike.price}</div>
              <button className="btn btn-primary rounded-xl">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopLayout;