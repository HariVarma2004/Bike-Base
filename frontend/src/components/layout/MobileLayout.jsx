// Updated MobileLayout.jsx to accept bike prop
import { useState } from "react";
import BikeVariant from "../ui/BikeVariant";
import StatCard from "../ui/StatCard";

const MobileLayout = ({ bike }) => {
  const [activeVariant, setActiveVariant] = useState(0);

  return (
    <>
      <div className="block md:hidden">
        {/* Hero Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neutral via-base-content to-neutral-content leading-none mb-6">
            {bike.brand}
          </h1>

          {/* Mobile Bike Image */}
          <div className="relative mx-auto w-64 sm:w-72 h-40 sm:h-48 mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-base-200 rounded-2xl h-full flex items-center justify-center border border-base-300 shadow-2xl overflow-hidden">
              <img
                src={bike.image}
                alt={`${bike.brand} ${bike.name}`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Mobile Bike Variants */}
          <div className="flex justify-center space-x-3 mb-8">
            {bike.colorOptions.map((variant, index) => (
              <BikeVariant
                key={index}
                color={variant}
                active={activeVariant === index}
                onClick={() => setActiveVariant(index)}
              />
            ))}
          </div>
        </div>

        {/* Mobile Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <StatCard value={bike.milage} unit="KM" label="Range" icon="⚡" />
          <StatCard value={bike.topSpeed} unit="KM/H" label="Speed" icon="🏍" />
          <StatCard value={bike.year} unit="YEAR" label="Model" icon="📅" />
        </div>

        {/* Mobile Product Info */}
        <div className="bg-base-200/70 backdrop-blur-sm border border-base-300 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-3 text-primary">{bike.brand} {bike.name}</h2>
          <p className="text-base-content/80 leading-relaxed text-sm mb-4">
            {bike.description.substring(0, 100)}...
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs mb-4">
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
              <div className="text-base-content/70">Fuel</div>
              <div className="font-semibold">{bike.fuelType}</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-primary">${bike.price}</div>
            <button className="btn btn-primary btn-sm rounded-xl">Buy Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileLayout;