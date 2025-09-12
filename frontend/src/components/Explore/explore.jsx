import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Brand logos
const brands = [
  { id: 1, name: "Yamaha", logo: "https://i.postimg.cc/brGbrp5m/yamaha-logo.png" },
  { id: 2, name: "Kawasaki", logo: "https://i.postimg.cc/8Ctrb7Qy/kawasaki.png" },
  { id: 3, name: "Royal Enfield", logo: "https://i.postimg.cc/tgXxPhfZ/Royal-Enfield-logo.png" },
  { id: 4, name: "Suzuki", logo: "https://i.postimg.cc/CxpDMys4/Suzuki-logo.png" },
  { id: 5, name: "KTM", logo: "https://i.postimg.cc/qRv2f8xV/ktm.png" },
  { id: 6, name: "Bajaj", logo: "https://i.postimg.cc/wMPXQ7JK/bajaj-logo.png" },
  { id: 7, name: "TVS", logo: "https://i.postimg.cc/XJ1dnpsZ/TVS-Motor-Logo.png" },
  { id: 8, name: "Hero", logo: "https://i.postimg.cc/ryYNkYHh/Hero-logo.png" },
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
        <p className="badge badge-outline mt-2 text-primary">₹{price}</p>
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
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bikes from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/bikes") 
      .then((data) => {
        setBikes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bikes:", err);
        setLoading(false);
      });
  }, []);

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

        {/* Loading / No bikes */}
        {loading ? (
          <p className="text-center text-lg">Loading bikes...</p>
        ) : bikes.length === 0 ? (
          <p className="text-center text-lg">No bikes available.</p>
        ) : (
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {bikes.map((bike) => (
              <BikeCard
                key={bike._id}  
                id={bike._id}
                name={bike.name}
                price={bike.price}
                image={bike.image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
