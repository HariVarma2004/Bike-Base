// components/admin/EditBike.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditBike() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch bike details
  useEffect(() => {
    const fetchBike = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/bikes/${id}`);
        if (!res.ok) throw new Error("Failed to fetch bike");
        const data = await res.json();
        setBike(data);
      } catch (error) {
        console.error("Error fetching bike:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBike();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setBike((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "colorOptions"
          ? value.split(",").map((c) => c.trim()) // split by commas
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  // Handle update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/bikes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bike),
      });
      if (!res.ok) throw new Error("Failed to update bike");
      alert("✅ Bike updated successfully!");
      navigate("/admin/all-bikes");
    } catch (error) {
      console.error("Error updating bike:", error);
    }
  };

  if (loading) return <div className="text-center py-6">⏳ Loading...</div>;
  if (!bike) return <div className="text-center py-6">🚫 Bike not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">✏️ Edit Bike</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Basic Info */}
        <label className="form-control">
          <span className="label-text">Brand</span>
          <input name="brand" value={bike.brand || ""} onChange={handleChange} className="input input-bordered w-full" />
        </label>
        <label className="form-control">
          <span className="label-text">Name</span>
          <input name="name" value={bike.name || ""} onChange={handleChange} className="input input-bordered w-full" />
        </label>
        <label className="form-control">
          <span className="label-text">Model</span>
          <input name="model" value={bike.model || ""} onChange={handleChange} className="input input-bordered w-full" />
        </label>
        <label className="form-control">
          <span className="label-text">Year</span>
          <input type="number" name="year" value={bike.year || ""} onChange={handleChange} className="input input-bordered w-full" />
        </label>

        {/* Pricing & Specs */}
        <label className="form-control">
          <span className="label-text">Price</span>
          <input type="number" name="price" value={bike.price || ""} onChange={handleChange} className="input input-bordered w-full" />
        </label>
        <label className="form-control">
          <span className="label-text">Image URL</span>
          <input name="image" value={bike.image || ""} onChange={handleChange} className="input input-bordered w-full" />
        </label>
        <label className="form-control">
          <span className="label-text">Mileage (km/l)</span>
          <input type="number" name="milage" value={bike.milage || ""} onChange={handleChange} className="input input-bordered w-full" />
        </label>
        <label className="form-control">
          <span className="label-text">Engine Capacity (cc)</span>
          <input type="number" name="engineCapacity" value={bike.engineCapacity || ""} onChange={handleChange} className="input input-bordered w-full" />
        </label>

        <label className="form-control">
          <span className="label-text">Top Speed (km/h)</span>
          <input type="number" name="topSpeed" value={bike.topSpeed || ""} onChange={handleChange} className="input input-bordered w-full" />
        </label>
        <label className="form-control">
          <span className="label-text">Power (hp)</span>
          <input type="number" name="power" value={bike.power || ""} onChange={handleChange} className="input input-bordered w-full" />
        </label>
        <label className="form-control">
          <span className="label-text">Torque (Nm)</span>
          <input type="number" name="torque" value={bike.torque || ""} onChange={handleChange} className="input input-bordered w-full" />
        </label>

        {/* Features */}
        <label className="form-control">
          <span className="label-text">Fuel Type</span>
          <input name="fuelType" value={bike.fuelType || ""} onChange={handleChange} className="input input-bordered w-full" />
        </label>
        <label className="form-control">
          <span className="label-text">Transmission</span>
          <input name="transmission" value={bike.transmission || ""} onChange={handleChange} className="input input-bordered w-full" />
        </label>
        <label className="form-control">
          <span className="label-text">Brakes</span>
          <input name="brakes" value={bike.brakes || ""} onChange={handleChange} className="input input-bordered w-full" />
        </label>
        <label className="form-control">
          <span className="label-text">Tires</span>
          <input name="tires" value={bike.tires || ""} onChange={handleChange} className="input input-bordered w-full" />
        </label>
        <label className="form-control">
          <span className="label-text">Suspension</span>
          <input name="suspension" value={bike.suspension || ""} onChange={handleChange} className="input input-bordered w-full" />
        </label>

        {/* Dimensions */}
        <label className="form-control">
          <span className="label-text">Weight (kg)</span>
          <input type="number" name="weight" value={bike.weight || ""} onChange={handleChange} className="input input-bordered w-full" />
        </label>
        <label className="form-control">
          <span className="label-text">Seat Height (mm)</span>
          <input type="number" name="seatHeight" value={bike.seatHeight || ""} onChange={handleChange} className="input input-bordered w-full" />
        </label>
        <label className="form-control">
          <span className="label-text">Fuel Capacity (L)</span>
          <input type="number" name="fuelCapacity" value={bike.fuelCapacity || ""} onChange={handleChange} className="input input-bordered w-full" />
        </label>

        {/* Color Options */}
        <label className="form-control col-span-2">
          <span className="label-text">Color Options (comma separated)</span>
          <input
            name="colorOptions"
            value={bike.colorOptions?.join(", ") || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </label>

        {/* Description */}
        <label className="form-control col-span-2">
          <span className="label-text">Description</span>
          <textarea
            name="description"
            value={bike.description || ""}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
          />
        </label>

        {/* Availability */}
        <label className="flex items-center gap-2 col-span-2">
          <input type="checkbox" name="available" checked={bike.available || false} onChange={handleChange} className="checkbox" />
          <span className="label-text">Available</span>
        </label>

        <button type="submit" className="btn btn-primary w-full col-span-2 mt-4">
          💾 Save Changes
        </button>
      </form>
    </div>
  );
}
