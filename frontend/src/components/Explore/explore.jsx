import React from "react";

// Sample bike data (replace with real data or API later)
const bikes = [
  {
    id: 1,
    name: "KTM Duke 390",
    price: "₹2,97,000",
    image: "https://imgd.aeplcdn.com/370x208/n/cw/ec/39067/duke-390-right-side-view-2.png",
  },
  {
    id: 2,
    name: "Yamaha R15 V4",
    price: "₹1,82,000",
    image: "https://imgd.aeplcdn.com/370x208/n/cw/ec/108311/r15-v4-right-side-view-2.png",
  },
  {
    id: 3,
    name: "Royal Enfield Hunter 350",
    price: "₹1,50,000",
    image: "https://imgd.aeplcdn.com/370x208/n/cw/ec/123859/hunter-350-right-side-view-2.png",
  },
];

const Explore = () => {
  return (
    <div className="min-h-screen bg-base-100 py-12 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary">
        Explore Our Bikes
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {bikes.map((bike) => (
          <div
            key={bike.id}
            className="card bg-base-200 shadow-xl hover:shadow-2xl transition-transform hover:scale-105"
          >
            <figure>
              <img
                src={bike.image}
                alt={bike.name}
                className="w-full h-56 object-contain p-4"
              />
            </figure>
            <div className="card-body text-center">
              <h3 className="card-title text-lg md:text-xl">{bike.name}</h3>
              <p className="text-gray-600 font-semibold">{bike.price}</p>
              <div className="card-actions justify-center mt-4">
                <button className="btn btn-primary btn-sm rounded-full">
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
