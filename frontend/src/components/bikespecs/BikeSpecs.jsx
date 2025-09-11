// components/bikespecs/BikeSpecs.jsx
import React from 'react';

const BikeSpecs = ({ bike }) => {
  return (
    <div className="max-w-full mx-auto">
      {/* Full-Width Hero Section with Image */}
      <div className="relative w-full h-96 sm:h-[500px] bg-gradient-to-br from-base-200 to-base-300">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={bike.image}
            alt={`${bike.brand} ${bike.name}`}
            className="w-full max-w-4xl h-full object-contain"
            onError={(e) => { e.currentTarget.src = "/fallback-bike.png"; }}
          />

          <div id="image-fallback" className="hidden absolute inset-0 bg-base-100 items-center justify-center">
            <span className="text-2xl text-base-content/60">Bike Image Not Available</span>
          </div>
        </div>

        {/* Overlay Content */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-xl font-bold text-base-content bg-base-100/80 backdrop-blur-sm px-4 py-2 rounded-lg">
            {bike.brand} {bike.name}
          </p>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-gradient-to-r from-primary to-secondary text-primary-content px-6 py-2 rounded-full mb-6">
            <span className="font-semibold">{bike.year} MODEL</span>
            {bike.available && (
              <span className="ml-2 bg-base-100 text-primary text-sm px-3 py-1 rounded-full">
                IN STOCK
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-primary">{bike.brand}</span>{' '}
            <span className="text-neutral">{bike.name}</span>
          </h1>
          <p className="text-lg md:text-xl text-base-content/80 max-w-4xl mx-auto leading-relaxed">
            {bike.description}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Key Specs & Actions */}
          <div>
            {/* Key Specifications Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <SpecCard value={bike.engineCapacity} unit="CC" label="Displacement" />
              <SpecCard value={bike.power} unit="HP" label="Power" />
              <SpecCard value={bike.torque} unit="Nm" label="Torque" />
              <SpecCard value={bike.topSpeed} unit="km/h" label="Top Speed" />
            </div>

            {/* Pricing & Actions Card */}
            <div className="bg-gradient-to-r from-primary to-secondary text-primary-content rounded-3xl p-6 mb-8 shadow-xl">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold mb-2">${bike.price}</div>
                <p className="text-primary-content/80 text-lg">Starting price</p>
              </div>
              <div className="space-y-4">
                <button className="w-full bg-base-100 text-primary hover:bg-base-200 font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105">
                  Check Availability
                </button>
                <button className="w-full border-2 border-base-100 text-base-100 hover:bg-base-100/10 font-bold py-4 rounded-xl transition-all duration-300">
                  Schedule Test Ride
                </button>
                <button className="w-full border border-base-100/50 text-base-100/90 hover:text-base-100 hover:border-base-100 font-semibold py-3 rounded-xl transition-all duration-300">
                  Download Brochure
                </button>
              </div>
            </div>

            {/* Color Options */}
            <div className="bg-base-100 rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-base-content">
                Available Colors
              </h3>
              <div className="flex justify-center gap-6">
                {['#FF6600', '#000000', '#FFFFFF', '#EF4444'].map((color, index) => (
                  <ColorOption key={index} color={color} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Specifications */}
          <div>
            <div className="bg-base-100 rounded-3xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-base-content border-b border-base-300 pb-3">
                Technical Specifications
              </h2>

              <div className="space-y-6">
                <SpecCategory
                  title="Performance"
                  specs={[
                    { label: "Displacement", value: `${bike.engineCapacity} cc` },
                    { label: "Max Power", value: `${bike.power} HP` },
                    { label: "Max Torque", value: `${bike.torque} Nm` },
                    { label: "Top Speed", value: `${bike.topSpeed} km/h` },
                    { label: "Mileage", value: `${bike.milage} kmpl` },
                    { label: "Transmission", value: bike.transmission },
                  ]}
                />

                <SpecCategory
                  title="Dimensions"
                  specs={[
                    { label: "Kerb Weight", value: `${bike.weight} kg` },
                    { label: "Seat Height", value: `${bike.seatHeight} mm` },
                    { label: "Fuel Capacity", value: `${bike.fuelCapacity} L` },
                    { label: "Fuel Type", value: bike.fuelType },
                  ]}
                />

                <SpecCategory
                  title="Chassis & Brakes"
                  specs={[
                    { label: "Braking System", value: bike.brakes },
                    { label: "Suspension", value: bike.suspension },
                    { label: "Tire Type", value: bike.tires },
                    { label: "ABS", value: "Dual Channel" },
                  ]}
                />

                <SpecCategory
                  title="Additional Information"
                  specs={[
                    { label: "Model Year", value: bike.year },
                    { label: "Availability", value: bike.available ? "In Stock" : "Out of Stock" },
                    { label: "Warranty", value: "2 Years" },
                    { label: "Service Interval", value: "5000 km" },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features Highlight Section */}
        <div className="mt-12 bg-base-200 rounded-3xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-8 text-base-content">Why Choose {bike.brand} {bike.name}?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature icon="🚀" title="Powerful Performance" description="Exceptional acceleration and top-speed capabilities" />
            <Feature icon="⚡" title="Advanced Technology" description="Cutting-edge features and modern engineering" />
            <Feature icon="🛡️" title="Premium Build Quality" description="Durable components and reliable construction" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components (keep the same as before)
const SpecCard = ({ value, unit, label }) => (
  <div className="bg-base-100 rounded-2xl p-5 text-center shadow-lg">
    <div className="text-3xl font-bold text-primary mb-2">{value}</div>
    <div className="text-sm text-base-content/60">{unit}</div>
    <div className="text-xs text-base-content/50 mt-1">{label}</div>
  </div>
);

const ColorOption = ({ color }) => {
  const colorName = color === '#FF6600' ? 'Orange' :
    color === '#000000' ? 'Black' :
      color === '#FFFFFF' ? 'White' : 'Red';

  return (
    <div className="text-center">
      <div
        className="w-12 h-12 rounded-full border-2 border-base-300 mx-auto mb-2 shadow-md"
        style={{ backgroundColor: color }}
      ></div>
      <span className="text-sm text-base-content/70">{colorName}</span>
    </div>
  );
};

const SpecCategory = ({ title, specs }) => (
  <div>
    <h3 className="text-lg font-semibold mb-4 text-primary">{title}</h3>
    <div className="space-y-3">
      {specs.map((spec, index) => (
        <div key={index} className="flex justify-between items-center py-2 border-b border-base-300 last:border-b-0">
          <span className="text-base-content/70">{spec.label}</span>
          <span className="font-semibold text-base-content">{spec.value}</span>
        </div>
      ))}
    </div>
  </div>
);

const Feature = ({ icon, title, description }) => (
  <div className="bg-base-100 rounded-2xl p-6 shadow-lg">
    <div className="text-3xl mb-4">{icon}</div>
    <h4 className="text-xl font-semibold mb-2 text-base-content">{title}</h4>
    <p className="text-base-content/70">{description}</p>
  </div>
);

export default BikeSpecs;