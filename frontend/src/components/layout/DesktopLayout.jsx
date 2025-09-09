import { useState } from "react";
import BikeVariant from "../ui/BikeVariant";
import StatCard from "../ui/StatCard";

import Duke390 from "../../assets/duke390.webp";

const DesktopLayout = () => {
  const bikeVariants = [
    { color: "#3B82F6", name: "Blue" },
    { color: "#EF4444", name: "Red" },
    { color: "#10B981", name: "Green" },
  ];
  const [activeVariant, setActiveVariant] = useState(0);

  return (
    <>
      {/* Desktop Layout - Only show on screens md and larger */}
      <div className="hidden md:flex items-center justify-between">
        {/* Left Side - Stats */}
        <div className="flex flex-col space-y-6">
          <StatCard value="420" unit="MILEAGE" label="Range per charge" icon="⚡" />
          <StatCard value="310" unit="KM/H" label="Top Speed" icon="🏍" />
          <StatCard value="2024" unit="YEAR" label="Latest Model" icon="📅" />
        </div>

        {/* Center - Hero Title */}
        <div className="text-center flex-1 mx-12">
          <h1 className="text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neutral via-base-content to-neutral-content leading-none mb-8">
            MOTOVEX
          </h1>

          {/* Desktop Bike Image */}
          <div className="relative mx-auto w-96 lg:w-[32rem] h-64 lg:h-[22rem] mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-base-200 rounded-3xl h-full flex items-center justify-center border border-base-300 shadow-2xl overflow-hidden">
              <img
                src={Duke390}
                alt="Motovex Bike"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Desktop Bike Variants */}
          <div className="flex justify-center space-x-4">
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

        {/* Right Side - Product Info */}
        <div className="w-80">
          <div className="bg-base-200/70 backdrop-blur-sm border border-base-300 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">Motovex H2R</h2>
            <p className="text-base-content/80 leading-relaxed">
              The Motovex H2R is a futuristic electric superbike featuring a sleek aerodynamic
              body and cutting-edge LED lighting. Perfect for high-performance riding, it’s made
              for speed lovers and tech enthusiasts.
            </p>

            <div className="mt-6 pt-6 border-t border-base-300">
              <div className="grid grid-cols-2 gap-4 text-sm">
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
                  <div className="text-base-content/70">Charge Time</div>
                  <div className="font-semibold">4 hours</div>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 btn btn-primary rounded-xl">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopLayout;
