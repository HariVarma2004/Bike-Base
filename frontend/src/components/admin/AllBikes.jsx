import React, { useEffect, useState } from "react";

export default function AllBikes() {
  const [bikes, setBikes] = useState([]);

  // For now mock data (later replace with API call)
  useEffect(() => {
    const mockBikes = [
      {
        id: 1,
        brand: "KTM",
        name: "Duke 390",
        model: "2023",
        price: 297000,
        image:
          "https://imgd.aeplcdn.com/370x208/n/cw/ec/39067/duke-390-right-side-view-2.png",
        available: true,
      },
      {
        id: 2,
        brand: "Yamaha",
        name: "R15 V4",
        model: "2023",
        price: 182000,
        image:
          "https://imgd.aeplcdn.com/370x208/n/cw/ec/108311/r15-v4-right-side-view-2.png",
        available: false,
      },
    ];
    setBikes(mockBikes);
  }, []);

  return (
    <div data-theme="forest" className="min-h-screen bg-base-200 p-6">
      {/* Header */}
      <div className="hero rounded-xl shadow-xl mb-6">
        <div className="hero-content text-center text-white">
          <div>
            <h2 className="text-3xl font-bold">📋 All Bikes</h2>
            <p className="opacity-80">Manage all bike records here</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card bg-base-100 shadow-xl p-6 overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="text-sm text-gray-500">
              <th>#</th>
              <th>Image</th>
              <th>Brand</th>
              <th>Name</th>
              <th>Model</th>
              <th>Price</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bikes.length > 0 ? (
              bikes.map((bike, index) => (
                <tr key={bike.id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="w-16 h-12 mask mask-squircle overflow-hidden">
                      <img
                        src={bike.image}
                        alt={bike.name}
                        className="object-contain"
                      />
                    </div>
                  </td>
                  <td>{bike.brand}</td>
                  <td>{bike.name}</td>
                  <td>{bike.model}</td>
                  <td>₹{bike.price.toLocaleString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        bike.available ? "badge-success" : "badge-error"
                      }`}
                    >
                      {bike.available ? "Available" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="text-right space-x-2">
                    <button className="btn btn-sm btn-outline btn-primary">
                      ✏️ Edit
                    </button>
                    <button className="btn btn-sm btn-outline btn-error">
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-6">
                  🚫 No bikes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
