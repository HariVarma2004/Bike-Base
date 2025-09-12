import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BikeSpecs = () => {
  const { id } = useParams();
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBike() {
      try {
        const res = await fetch(`http://localhost:5000/api/bikes/${id}`);
        if (!res.ok) throw new Error("Failed to fetch bike data");
        const data = await res.json();
        setBike(data);
      } catch (error) {
        console.error("Error fetching bike:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBike();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!bike) return <div className="text-center py-20">Bike not found</div>;

  return (
    <div className="max-w-full mx-auto">
      {/* Hero Image */}
      <div className="relative w-full h-96 sm:h-[500px] bg-gradient-to-br from-base-200 to-base-300">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={bike.image}
            alt={`${bike.brand} ${bike.name}`}
            className="w-full max-w-4xl h-full object-contain"
            onError={(e) => {
              e.currentTarget.src = "/fallback-bike.png";
            }}
          />
        </div>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-xl font-bold text-base-content bg-base-100/80 px-4 py-2 rounded-lg">
            {bike.brand} {bike.name}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-gradient-to-r from-primary to-secondary text-primary-content px-6 py-2 rounded-full mb-6">
            <span className="font-semibold">{bike.year} MODEL</span>
            {bike.available && (
              <span className="ml-2 bg-base-100 text-primary text-sm px-3 py-1 rounded-full">
                IN STOCK
              </span>
            )}
          </div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-primary">{bike.brand}</span>{" "}
            <span className="text-primary">{bike.name}</span>
          </h1>
          <p className="text-lg text-base-content/80 max-w-4xl mx-auto leading-relaxed">
            {bike.description}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <SpecCard value={bike.engineCapacity} unit="CC" label="Displacement" />
              <SpecCard value={bike.power} unit="HP" label="Power" />
              <SpecCard value={bike.torque} unit="Nm" label="Torque" />
              <SpecCard value={bike.topSpeed} unit="km/h" label="Top Speed" />
            </div>

            <div className="bg-gradient-to-r from-primary to-secondary text-primary-content rounded-3xl p-6 mb-8 shadow-xl">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold mb-2">
                  ₹ {bike.price.toLocaleString("en-IN")}
                </div>
                <p className="text-primary-content/80 text-lg">Starting price</p>
              </div>
              <div className="space-y-4">
                <button className="w-full bg-base-100 text-primary font-bold py-4 rounded-xl hover:bg-base-200 transition">
                  Check Availability
                </button>
                <button className="w-full border-2 border-base-100 text-base-100 font-bold py-4 rounded-xl hover:bg-base-100/10 transition">
                  Schedule Test Ride
                </button>
                <button className="w-full border border-base-100/50 text-base-100/90 font-semibold py-3 rounded-xl hover:text-base-100 transition">
                  Download Brochure
                </button>
              </div>
            </div>

            {/* Colors */}
            {bike.colorOptions && bike.colorOptions.length > 0 && (
              <div className="bg-base-100 rounded-3xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Available Colors</h3>
                <div className="flex justify-center gap-6 flex-wrap">
                  {bike.colorOptions.map((color, idx) => (
                    <ColorOption key={idx} color={color} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right */}
          <div>
            <div className="bg-base-100 rounded-3xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 border-b pb-3">
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
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 bg-base-200 rounded-3xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Why Choose {bike.brand} {bike.name}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature icon="🚀" title="Powerful Performance" description="Exceptional acceleration and speed" />
            <Feature icon="⚡" title="Advanced Technology" description="Cutting-edge features & engineering" />
            <Feature icon="🛡️" title="Premium Build Quality" description="Durable & reliable construction" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Small components
const SpecCard = ({ value, unit, label }) => (
  <div className="bg-base-100 rounded-2xl p-5 text-center shadow-lg">
    <div className="text-3xl font-bold text-primary mb-2">{value}</div>
    <div className="text-sm text-base-content/60">{unit}</div>
    <div className="text-xs text-base-content/50 mt-1">{label}</div>
  </div>
);

const ColorOption = ({ color }) => (
  <div className="text-center">
    <div
      className="w-12 h-12 rounded-full border-2 border-base-300 mx-auto mb-2 shadow-md"
      style={{ backgroundColor: color }}
    />
    <span className="text-sm text-base-content/70">{color}</span>
  </div>
);

const SpecCategory = ({ title, specs }) => (
  <div>
    <h3 className="text-lg font-semibold mb-4 text-primary">{title}</h3>
    <div className="space-y-3">
      {specs.map((spec, idx) => (
        <div key={idx} className="flex justify-between border-b pb-2 last:border-none">
          <span className="text-base-content/70">{spec.label}</span>
          <span className="font-semibold">{spec.value}</span>
        </div>
      ))}
    </div>
  </div>
);

const Feature = ({ icon, title, description }) => (
  <div className="bg-base-100 rounded-2xl p-6 shadow-lg">
    <div className="text-3xl mb-4">{icon}</div>
    <h4 className="text-xl font-semibold mb-2">{title}</h4>
    <p className="text-base-content/70">{description}</p>
  </div>
);

export default BikeSpecs;
