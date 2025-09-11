import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ import Link

export default function AllBikes() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bikes");
        if (!res.ok) throw new Error("Failed to fetch bikes");
        const data = await res.json();
        setBikes(data);
      } catch (error) {
        console.error("Error fetching bikes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this bike?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/bikes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete bike");
      setBikes((prev) => prev.filter((bike) => bike._id !== id));
    } catch (error) {
      console.error("Error deleting bike:", error);
    }
  };

  return (
    <div data-theme="forest" className="min-h-screen bg-base-200 p-6">
      <div className="hero rounded-xl shadow-xl mb-6">
        <div className="hero-content text-center text-white">
          <div>
            <h2 className="text-3xl font-bold">📋 All Bikes</h2>
            <p className="opacity-80">Manage all bike records here</p>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl p-6 overflow-x-auto">
        {loading ? (
          <div className="text-center py-6">⏳ Loading bikes...</div>
        ) : (
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
                  <tr key={bike._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="w-16 h-12 mask mask-squircle overflow-hidden">
                        <img
                          src={bike.image}
                          alt={bike.name}
                          className="object-contain"
                          onError={(e) => (e.currentTarget.src = "/fallback-bike.png")}
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
                      {/* ✅ Navigate to edit page */}
                      <Link
                        to={`/admin/edit-bike/${bike._id}`}
                        className="btn btn-sm btn-outline btn-primary"
                      >
                        ✏️ Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-outline btn-error"
                        onClick={() => handleDelete(bike._id)}
                      >
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
        )}
      </div>
    </div>
  );
}
