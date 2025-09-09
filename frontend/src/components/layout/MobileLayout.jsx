import { useState } from "react";
import BikeVariant from "../ui/BikeVariant";
import StatCard from "../ui/StatCard";

const MobileLayout = () => {
  const bikeVariants = [
    { color: "#3B82F6", name: "Blue" },
    { color: "#EF4444", name: "Red" },
    { color: "#10B981", name: "Green" },
  ];
  const [activeVariant, setActiveVariant] = useState(0);

  return (
    <>
      {/* Mobile Layout - Only show on screens smaller than md */}
      <div className="block md:hidden">
        {/* Hero Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neutral via-base-content to-neutral-content leading-none mb-6">
            MOTOVEX
          </h1>

          {/* Mobile Bike Image */}
          <div className="relative mx-auto w-64 sm:w-72 h-40 sm:h-48 mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-base-200 rounded-2xl h-full flex items-center justify-center border border-base-300 shadow-2xl">
              <div className="text-3xl sm:text-4xl">🏍</div>
            </div>
          </div>

          {/* Mobile Bike Variants */}
          <div className="flex justify-center space-x-3 mb-8">
            {bikeVariants.map((variant, index) => (
              <BikeVariant
                key={index}
                color={variant.color}
                active={activeVariant === index}
                onClick={() => setActiveVariant(index)}
              />
            ))}
          </div>
        </div>

        {/* Mobile Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <StatCard value="420" unit="MILE" label="Range" icon="⚡" />
          <StatCard value="310" unit="KM/H" label="Speed" icon="🏍" />
          <StatCard value="2024" unit="YEAR" label="Model" icon="📅" />
        </div>

        {/* Mobile Product Info */}
        <div className="bg-base-200/70 backdrop-blur-sm border border-base-300 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-3 text-primary">Motovex H2R</h2>
          <p className="text-base-content/80 leading-relaxed text-sm mb-4">
            The Motovex H2R is a futuristic electric superbike featuring a sleek aerodynamic body
            and cutting-edge LED lighting.
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs mb-4">
            <div>
              <div className="text-base-content/70">Battery</div>
              <div className="font-semibold">72V 40Ah</div>
            </div>
            <div>
              <div className="text-base-content/70">Motor</div>
              <div className="font-semibold">8000W</div>
            </div>
            <div>
              <div className="text-base-content/70">Weight</div>
              <div className="font-semibold">180kg</div>
            </div>
            <div>
              <div className="text-base-content/70">Charge</div>
              <div className="font-semibold">4 hours</div>
            </div>
          </div>

          <button className="w-full btn btn-primary rounded-xl">Learn More</button>
        </div>
      </div>
    </>
  );
};

export default MobileLayout;
