import React from "react";

// Sample bike data (replace with real data or API later)
const bikes = [
  {
    id: 1,
    name: "KTM Duke 390",
    price: "₹2,97,000",
    image:
      "https://imgd.aeplcdn.com/370x208/n/cw/ec/39067/duke-390-right-side-view-2.png",
  },
  {
    id: 2,
    name: "Yamaha R15 V4",
    price: "₹1,82,000",
    image:
      "https://imgd.aeplcdn.com/370x208/n/cw/ec/108311/r15-v4-right-side-view-2.png",
  },
  {
    id: 3,
    name: "Royal Enfield Hunter 350",
    price: "₹1,50,000",
    image:
      "https://imgd.aeplcdn.com/370x208/n/cw/ec/123859/hunter-350-right-side-view-2.png",
  },
];

// Brand logos
const brands = [
  {
    id: 1,
    name: "Yamaha",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Yamaha_logo.svg",
  },
  {
    id: 2,
    name: "Kawasaki",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/72/Kawasaki_logo.svg",
  },
  {
    id: 3,
    name: "Royal Enfield",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/13/Royal_Enfield_logo.png",
  },
  {
    id: 4,
    name: "Suzuki",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Suzuki_logo_2.svg",
  },
  {
    id: 5,
    name: "KTM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/KTM-Logo.svg",
  },
  {
    id: 6,
    name: "Harley Davidson",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/Harley-Davidson_logo.svg",
  },
  {
    id: 7,
    name: "TVS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f2/TVS_Motor_Company_logo.svg",
  },
  {
    id: 8,
    name: "Triumph",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/Triumph_Motorcycles_Logo.svg",
  },
];

const Explore = () => {
  return (
    <div className="min-h-screen bg-base-100 py-12 px-6">
      {/* Page Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-primary">
        Explore Our Bikes
      </h2>

      {/* Brand Logos - Centered with proper alignment */}
      <div className="flex justify-center mb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 justify-items-center">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex flex-col items-center transition-transform hover:scale-110"
            >
              <div className="p-4 rounded-xl bg-base-200 shadow-md flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-10 sm:h-14 object-contain"
                />
              </div>
              <p className="text-xs sm:text-sm mt-2 text-gray-600 font-medium text-center">
                {brand.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bike Cards */}
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {bikes.map((bike) => (
          <div
            key={bike.id}
            className="card bg-base-200 shadow-xl hover:shadow-2xl transition-transform hover:scale-105"
          >
            <figure className="px-6 pt-6">
              <img
                src={bike.image}
                alt={bike.name}
                className="w-full h-52 sm:h-56 object-contain"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h3 className="card-title text-lg md:text-xl">{bike.name}</h3>
              <p className="badge badge-outline mt-2 text-sm md:text-base">
                {bike.price}
              </p>
              <div className="card-actions mt-4">
                <button className="btn btn-primary btn-sm sm:btn-md rounded-full">
                  Explore Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
