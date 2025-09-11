import React from "react";
import { useNavigate } from "react-router-dom";


// Sample bike data (replace with API later)
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
  {
    id: 4,
    name: "Royal Enfield Hunter 350",
    price: "₹1,50,000",
    image:
      "https://imgd.aeplcdn.com/370x208/n/cw/ec/123859/hunter-350-right-side-view-2.png",
  },
  {
    id: 5,
    name: "Royal Enfield Hunter 350",
    price: "₹1,50,000",
    image:
      "https://imgd.aeplcdn.com/370x208/n/cw/ec/123859/hunter-350-right-side-view-2.png",
  },
  {
    id: 6,
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

// Brand Card Component
const BrandCard = ({ name, logo }) => (
  <div className="flex flex-col items-center group cursor-pointer">
    <div className="p-4 rounded-2xl bg-base-200 shadow-md flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 group-hover:shadow-xl transition duration-300">
      <img
        src={logo}
        alt={name}
        className="h-10 sm:h-14 object-contain group-hover:scale-110 transition-transform"
      />
    </div>
    <p className="text-xs sm:text-sm mt-2 text-base-content font-medium text-center group-hover:text-primary">
      {name}
    </p>
  </div>
);

// Bike Card Component
const BikeCard = ({ id, name, price, image }) => {
  const navigate = useNavigate();
  return (
    <div className="card bg-base-200 shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-2 duration-300">
      <figure className="p-6 bg-base-100 flex justify-center">
        <img src={image} alt={name} className="w-full h-48 object-contain" />
      </figure>
      <div className="card-body items-center text-center">
        <h3 className="card-title text-base-content">{name}</h3>
        <p className="badge badge-outline mt-2 text-primary">{price}</p>
        <div className="card-actions mt-4">
          <button
            onClick={() => navigate(`/explore/bikespecs/${id}`)}
            className="btn btn-primary btn-sm sm:btn-md rounded-full"
          >
            Explore Details
          </button>
        </div>
      </div>
    </div>
  );
};


// Explore Page
const Explore = () => {
  return (
    <div data-theme="forest">
      <div className="min-h-screen bg-base-100 py-14 px-6">
        {/* Page Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14 text-primary">
          🚀 Explore Our Bikes
        </h2>

        {/* Brand Logos */}
        <div className="flex flex-wrap justify-center gap-10 mb-20">
          {brands.map((brand) => (
            <BrandCard key={brand.id} name={brand.name} logo={brand.logo} />
          ))}
        </div>

        {/* Bike Cards */}
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {bikes.map((bike) => (
            <BikeCard
              key={bike.id}
              id={bike.id}
              name={bike.name}
              price={bike.price}
              image={bike.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
